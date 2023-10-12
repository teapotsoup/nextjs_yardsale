import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import { unified } from "unified";
import remarkParse from "remark-parse";
import Layout from "@components/layout";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
    return (
        <Layout title={data.title} seoTitle={data.title}>
            <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: post }}
            />
        </Layout>
    );
};

export function getStaticPaths() { // 데이터를 미리 생성하는 페이지를 만들기 위함
    const files = readdirSync("./posts").map((file) => {
        const [name, extension] = file.split(".");
        return { params: { slug: name } };
    });
    return {
        paths: files,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { content,data } = matter.read(`./posts/${ctx.params?.slug}.md`);
    const { value } = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(content);
    return {
        props: {
            data,
            post: value,
        },
    };
};

export default Post;