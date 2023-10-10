import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import products from "pages/api/products";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import Spinner from '../../public/Spinner.gif';
import Image from "next/image";
import {useEffect} from "react";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse  {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked:boolean
};

interface ChatroomResponse {
  ok: boolean;
  chatroomId: String;
}

const ItemDetail: NextPage = () => {
  const {user} = useUser()
  const router = useRouter();
  const { data,mutate:boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  ); // 라우터가 마운트 중일때 undefined가 뜨는 것을 방지
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const [createChatRoom, { data: chatroomData, loading }] =
      useMutation<ChatroomResponse>(
          `/api/chats?productId=${data?.product?.id}&sellerId=${data?.product?.userId}`
      );
  const onFavClick = () => {
    if(!data) return;
    boundMutate(prev=>prev && {...prev, isLiked:!prev.isLiked},false) // 비구조화 할당으로 data의 isLiked 값 상태 변경.
    toggleFav({});
  };
  const onTalkToSellerClick = ()=> {
    if (!data) return;
    if (window.confirm("판매자와 대화 하시겠습니까?")) {
      if(loading) return ;
      createChatRoom({})
    } else {
      alert("취소");
    }
  }
  useEffect(() => {
    console.log('!')
    if (chatroomData && chatroomData.ok) {
      router.push(`/chats/${chatroomData.chatroomId}`);
    }
  }, [chatroomData, router]);

  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          {data ?  ( <><div className="h-96 bg-slate-300" />
            <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {data?.product?.user?.name}
                </p>

                <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                  <a className="text-xs font font-medium text-gray-500">
                    View profile &rarr;
                  </a>
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-bold text-gray-800">
                {data?.product?.name}
              </h1>
              <p className="text-3xl block mt-3 text-gray-900">
                ${data?.product?.price}
              </p>
              <p className="text-base my-6 text-gray-700">
                {data?.product?.description}
              </p>
              <div className="flex items-center justify-between space-x-3">
                <Button onClick = {onTalkToSellerClick} large text="Talk to seller" />
                <button
                    onClick={onFavClick}
                    className={
                      cls(
                          "p-3 rounded-md flex items-center  hover:bg-gray-100 justify-center",
                          data?.isLiked ? "hover:text-red-500 text-red-400":" hover:text-gray-500 text-gray-400"
                      )
                    }
                >
                  {data?.isLiked ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                  ) :(<svg
                      className="h-6 w-6 "
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>)}
                </button>
              </div>
            </div></> ):(<Image src={Spinner}/>) }
        </div>
        <div>
          {data ?  (<>
            <h2 className="text-2xl font-bold text-gray-800">Similar items</h2>
            <div className=" mt-6 grid grid-cols-2 gap-4">
              {data?.relatedProducts.map((product) => (
                  <div key={product.id}>
                    <div className="h-56 w-full mb-4 bg-slate-300" />
                    <div className="text-center">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                      </Link>
                      <span className="text-sm font-medium text-gray-900">
                    {product.price}
                  </span>
                    </div>
                  </div>
              ))}
            </div>
          </>):null}
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
