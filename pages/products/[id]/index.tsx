import type {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR, {SWRConfig, unstable_serialize, } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import Spinner from '../../../public/Spinner.gif';
import Image from "next/image";
import {useCallback, useEffect} from "react";
import client from "@libs/server/client";

interface ProductWithUser extends Product {
  user: User;
  _count:{
    records:number
  }
}

export interface ItemDetailResponse  {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked:boolean;
  productId:number;
}

interface ChatroomResponse {
  ok: boolean;
  chatroomId: String;
}

interface ProductResponse{
  ok:boolean;
}

const ItemDetail: NextPage = () => {
  const {user : sessionUser} = useUser()
  const router = useRouter();
  const [deletingProduct,] = useMutation<ProductResponse>(`/api/products/${router.query.id}/delete`);

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
    boundMutate(prev=>prev && {...prev,product:{...prev.product,_count:{records: prev.isLiked ? prev.product._count.records-1 : prev.product._count.records+1}}, isLiked:!prev.isLiked},false) // 비구조화 할당으로 data의 isLiked 값 상태 변경.
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
    if (chatroomData && chatroomData.ok) {
      router.push(`/chats/${chatroomData.chatroomId}`);
    }
  }, [chatroomData, router]);

  const handleEdit = useCallback((itemId:number)=>{
    if(itemId){
      router.push(`/products/${itemId}/edit`)
    }
  },[router])

  const handleDelete = ()=> {
    if(window.confirm("상품을 삭제하시겠습니까?")){
      deletingProduct({})
    }
  }

  if(router.isFallback){
    return (
        <Layout hasTabBar canGoBack title={"Product Loading..."} seoTitle="Product Loading...">
          <Image src={Spinner} alt = "spinner"/>
        </Layout>
    )
  }

  return (
    <Layout hasTabBar canGoBack title={"Product Detail"} seoTitle="Product Detail">
      <div className="px-4  py-4">
        <div className="mb-8">
              <>
                <div className="h-96 bg-slate-300" />
                <div className="flex cursor-pointer py-3 border-t border-b items-center justify-between">
                  <div className="flex space-x-3">
                    <div className="w-12 h-12 rounded-full bg-slate-300"/>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {data?.product?.user?.name}
                      </p>
                      <Link
                          href={sessionUser?.id === data?.product?.user?.id ? `/profile` : `/profile/${data?.product?.user?.id}`}>
                        <a className="text-xs font font-medium text-white">
                          View profile &rarr;
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="w-100">
                      <Button text="수정" onClick={() => handleEdit(Number(router.query.id))}/>
                    </div>
                    <div className="w-100">
                      <Button text="삭제" onClick={() => handleDelete()}/>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h1 className="text-3xl font-bold text-white">
                    {data?.product?.name}
                  </h1>
                  <p className="text-3xl block mt-3 text-white">
                    ${data?.product?.price}
                  </p>
                  <p className="text-base my-6 text-white">
                    {data?.product?.description}
                  </p>
                  {sessionUser?.id === data?.product?.user?.id ? null : (
                      <div className="flex items-center justify-between space-x-3">
                <Button onClick = {onTalkToSellerClick} large text="Talk to seller" />
                <button
                    onClick={onFavClick}
                    className={
                      cls(
                          "p-3 rounded-md flex items-center  hover:bg-blue-500 justify-center",
                          data?.isLiked ? "hover:text-red-500 text-red-400":" hover:text-white text-white"
                      )
                    }
                >
                  {data?.isLiked ? (
                      <>
                      <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6" 
                      viewBox="0 0 24 24" 
                      fill="currentColor">
                        <path 
                        fillRule="evenodd" 
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                        clipRule="evenodd" />
                      </svg>
                      {data?.product?._count?.records}
                      </>
                  ) :(
                      <>
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                        {data?.product?._count?.records}
                      </>
                        )}
                </button>
              </div>)}
            </div></>
        </div>
        <div>
          {data ?  (<>
            <h2 className="text-2xl font-bold text-white">Similar items</h2>
            <div className=" mt-6 grid grid-cols-2 gap-4">
              {data?.relatedProducts.map((product) => (
                  <div key={product.id}>
                    <div className="h-56 w-full mb-4 bg-slate-300" />
                    <div className="text-center">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-white -mb-1">{product.name}</h3>
                      </Link>
                      <span className="text-sm font-medium text-white">
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

const Page : NextPage<ItemDetailResponse> = ({product,relatedProducts,isLiked,productId})=>{
  return (<SWRConfig
      value={{
        fallback: {
          [unstable_serialize(["api", "products", productId])]: {
                ok: true,
              product,
            isLiked,
            relatedProducts,
            productId
            },
        },
      }}>
    <ItemDetail />
  </SWRConfig>)
}

export const getStaticPaths : GetStaticPaths = ()=>{
  return{
    paths:[], // 빌드 시 패스를 안 만들 경우 빈 배열로 둠
    fallback:true
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const productId = ctx?.params?.id
  if (!productId) {
    return {
      props: {},
    };
  }
  const product = await client.product.findUnique({
    where: {
      id: Number(productId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const userId = product?.user?.id
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  const isLiked = Boolean(
      await client.record.findFirst({
        where:{
          productId:product?.id,
          userId:userId,
          kind:'Fav'
        },
        select:{
          id:true
        }
      })
  )
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      isLiked,
      productId
    },
  };
};

export default ItemDetail;
