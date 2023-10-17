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
const Blog : NextPage<{ posts: Post[] }> = ({posts}) => {
    return (
        <Layout hasTabBar title="Blog" seoTitle="Blog">
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
    // console.log(blogPosts)
    // [{title: 'Welcome Everyone',date: '2022.02.02',category: 'thougths',slug: '01-first-post'}
    // ,{title: 'Meanwhile in fukuoka',date: '2022.02.02',category: 'travel',slug: '02-my-trip-to-fukuoka'}
    // ,{title: 'Working in my company',date: '2022.10.16',category: 'work',slug: '04-working-in-mycompany'}]
    return {
        props: {
            posts:blogPosts.reverse(),
        },
    };
}

export default Blog;