import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Loved: NextPage = () => {
  return (
    <Layout hasTabBar title="관심목록" canGoBack seoTitle={'관심목록'}>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
      <ProductList kind="Fav" />
      </div>
    </Layout>
  );
};

export default Loved;