import Layout from "@components/layout";
import matter from "gray-matter"
import { readdirSync, readFileSync } from "fs";
import {NextPage} from "next";
import Link from "next/link";

interface Post {
    title: string;
    date: string;
    category: string;
    slug: string;
}
const Index : NextPage<{ posts: Post[] }> = ({posts}) => {
    return (
        <Layout title="Index" seoTitle="post">
            <h1 className="font-semibold text-center text-xl mt-5 mb-10">Latest Posts:</h1>
            {posts.map((post, index) => (
                <div key={index} className="mb-5">
                    <Link href={`/blog/${post.slug}`}>
                        <a>
                            <span className="text-lg text-red-500">{post.title}</span>
                            <div>
                <span>
                  {post.date} / {post.category}
                </span>
                            </div>
                        </a>
                    </Link>
                </div>
            ))}
        </Layout>
    );
}

export async function getStaticProps() { // 페이지에서 html로 바꿔주기 전에 데이터를 넣게 해준다.
    const blogPosts = readdirSync("./posts").map((file) => {
        const content = readFileSync(`./posts/${file}`, "utf-8");
        const [slug, _] = file.split(".");
        return { ...matter(content).data, slug };
    });
    return {
        props: {
            posts:blogPosts.reverse(),
        },
    };
}

export default Index;