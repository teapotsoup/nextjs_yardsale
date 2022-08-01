import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import Forms from "./forms";


const Home: NextPage = () => {
  return (
    <Layout hasTabBar title="홈">
      <div className="space-y-1 divide-y-[2px]">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <Item
          key={i}
          id={i}
          title="iPhone 14"
          price={99}
          comments={1}
          hearts={1}
        />
        ))}
      </div>
      <FloatingButton href="/items/upload">
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
