import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import Forms from "./forms";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Product } from "@prisma/client";

interface CountWithProduct extends Product{
  _count:{favs:number}
}

type ProductsResponse={
  ok:boolean;
  products:CountWithProduct[]
}

const Home: NextPage = () => {
  const {user,isLoading} = useUser();
  const {data} = useSWR<ProductsResponse>("/api/products")
  return (
    <Layout hasTabBar title="홈">
      <div className="space-y-1 divide-y-[2px]">
        {data?.products?.map((product) => (
          <Item
          key={product.id}
          id={product.id}
          title={product.name}
          price={product.price}
          comments={1}
          hearts={product._count.favs}
        />
        ))}
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

export default Home;
