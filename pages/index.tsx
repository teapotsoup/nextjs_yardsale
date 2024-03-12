import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR, { SWRConfig } from "swr";
import { Product } from "@prisma/client";
import Head from "next/head";
import client from "@libs/server/client";

export interface ProductWithCount extends Product{
    _count:{records:number}
}

type ProductsResponse={
    ok:boolean;
    products:ProductWithCount[]
}

const Home: NextPage = () => {
    const {data} = useSWR<ProductsResponse>("/api/products")
    return (
        <Layout hasTabBar title="YARD SALE" seoTitle={'Home'}>
            <Head>
                <title>Home</title>
            </Head>
            <div className="space-y-5 divide-y-[2px]">
                {data
                    ? data?.products?.map((product) => (
                        <Item
                            id={product.id}
                            key={product.id}
                            title={product.name}
                            price={product.price}
                            hearts={product._count?.records || 0}
                        />
                    ))
                    : "Loading..."}
            </div>
            <FloatingButton href="/products/upload">
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </FloatingButton>
        </Layout>
    );
};

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
    // SWRConfig
    // "/api/products" swr이 캐시를 불러올때 사용하는 키.
    // fallback을 통해 캐시 초기값을 설정해줄수 있다.

    // fallback 작성시 기존 백엔드 api에서 데이터를 주는 형태와 똑같이 작성해야한다.
    // export default 하는건 Home이 아닌 page 컴포넌트이다.
    return (
        <SWRConfig
            value={{
                fallback: {
                    "/api/products": {
                        ok: true,
                        products,
                    },
                },
            }}
        >
            <Home />
        </SWRConfig>
    );
};

export async function getServerSideProps(){
    // 이렇게 작성하면 하트 옆에 숫자도 캐싱되어 초기값 0도 안나온다
    const products = await client?.product.findMany({
        include:{
            _count:{
                select:{
                    records:{ where: { kind: 'Fav' } },
                }
            }
        }
    });
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
        }
    }
}

export default Page;