import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR, { SWRConfig } from "swr";
import { Product } from "@prisma/client";
import Head from "next/head";
import useUser from "@libs/client/useUser";

export interface ProductWithCount extends Product{
  _count:{favs:number}
}

type ProductsResponse={
  ok:boolean;
  products:ProductWithCount[]
}

const Home: NextPage = () => {
const {user} = useUser();
  const {data} = useSWR<ProductsResponse>("/api/products")
  return (
    <Layout hasTabBar title="홈" seoTitle={'Home'}>
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
                      hearts={product._count?.favs || 0}
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
    console.log("SSR");
    const products = await client?.product.findMany({});
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
        }
    }
}

export default Page;
