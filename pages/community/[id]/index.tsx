import type { NextPage } from "next";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useRouter } from "next/router";
import useSWR, {MutatorCallback, SWRConfig, unstable_serialize} from "swr";
import { Answer, Post, User } from "@prisma/client";
import Link from "next/link";
import {useForm} from "react-hook-form";
import { useEffect} from "react";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import client from "@libs/server/client";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import Spinner from '../../../public/Spinner.gif';
import Button from "@components/button";
import useUser from "@libs/client/useUser";
import axios from "axios";
interface AnswerWithUser extends Answer{
  user:User;
}

interface PostWithUser extends Post {
  user: User;
  _count: { answers: number; wonderings: number };
  answers: AnswerWithUser[];
}
interface AnswerForm {
  answer: string;
}

export interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  answers:Answer[];
  isWondering: boolean;
  id:any
}
interface AnswerResponse{
  ok:boolean;
  response:Answer;
}



const CommunityPostDetail: NextPage = () => {
  const {user} = useUser()
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const { data   , mutate  } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [wonder, {loading}] = useMutation(`/api/posts/${router.query.id}/wonder`);

  const [sendAnswers, {data:answerData,loading:answerLoading}] = useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answers`);

  const [deletingPosting,] = useMutation<AnswerResponse>(`/api/posts/${router.query.id}/delete`);


  const handleAnswerDelete = (id: number) => {
    axios
        .get(`/api/answers/${id}/delete`)
        .then(res => {
          mutate((data : any) => ({
            ...data,
            post : {
              ...data.post,
              answers: data.post.answers.filter((answer : AnswerWithUser)  => answer.id !== id),
            },
          }), false);
          window.alert("댓글이 삭제됐습니다");
        })
        .catch(err => {
          console.log('에러 : ',err);
        });
  }

  const onWonderClick = () => {
    if (!data) return;
    mutate(
        {
          ...data,
          post: {
            ...data.post,
            _count: {
              ...data.post._count,
              wonderings: data.isWondering
              ? data?.post._count.wonderings - 1
              : data?.post._count.wonderings + 1,
            },
          },
          isWondering: !data.isWondering,
        },
        false
    );
    if(!loading){
      wonder({});
    }
  };

  const onValid = (form:AnswerForm) => {
    if(answerLoading) return 
    sendAnswers(form)
  }

  const handleDelete = ()=>{
    deletingPosting({})
    if(window.confirm("게시글이 삭제됐습니다")){
      router.push("/community")
    }
  }

  const handleEdit = ()=>{
      router.push(`/community/${router.query.id}/edit`)
  }

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset()
      mutate()
    }
  }, [answerData,reset,mutate]);

  if(router.isFallback){ // fallback:true 일경우 빌드 되지 않은 페이지를 빌드 하는 동안 해당 화면을 먼저 보여준다.
    return (
        <Layout canGoBack title={"Product Loading..."} seoTitle="Product Loading...">
          <Image src={Spinner} priority={true} alt = "spinner"/>
        </Layout>
    )
  }


  return (
    <Layout canGoBack title={"Post"} seoTitle={"Post"}>
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span>
        <div className="flex justify-between w-full">
          <div className="flex mb-3 px-4 cursor-pointer pb-3 items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-300"/>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.post?.user?.name}
              </p>
              <Link href={user?.id === data?.post?.user?.id ? '/profile' : `/profile/${data?.post?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          {user?.id === data?.post?.user?.id && (<div className="flex">
            <div className="mr-3">
              <Button onClick={handleDelete} text={'삭제'}/>
            </div>
            <div>
              <Button onClick={handleEdit} text={'수정'}/>
            </div>
          </div>)}
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">Q.</span>
            {data?.post?.question}
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button onClick={onWonderClick} className={cls(
                "flex space-x-2 items-center text-sm",
                data?.isWondering ? "text-teal-600" : ""
            )}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {data?.post?._count?.wonderings}</span>
            </button>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {data?.post?._count?.answers}</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {data?.post?.answers?.map((answer) => (
              <div key={answer.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full"/>
                <div>
                <span className="text-sm block font-medium text-gray-700">
                  {answer.user.name}
                </span>
                  <span className="text-xs text-gray-500 block ">{String(answer?.createdAt)}</span>
                  <p className="text-gray-700 mt-2">
                    {answer.answer}
                  </p>
                </div>

                { Number(answer?.user?.id)  === Number(user?.id) && (<div className="flex">
                  <div className="mr-3">
                    <Button onClick={() => {handleAnswerDelete(answer?.id)}} text={'삭제'}/>
                  </div>
                  <div>
                    <Button onClick={() => {
                    }} text={'수정'}/>
                  </div>
                </div>)}
                { data?.post?.user?.id  === user?.id && answer?.user?.id  !== user?.id && (<div className="flex">
                  <div className="mr-3">
                    <Button onClick={() =>{handleAnswerDelete(answer?.id)}} text={'삭제'}/>
                  </div>
                </div>)}
              </div>
          ))}
        </div>
        <form className="px-4" onSubmit={handleSubmit(onValid)}>
          <TextArea
              name="description"
              placeholder="Answer this question!"
              required
              register={register("answer", {required: true, minLength: 5})}
          />
          <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
            {answerLoading ? "Loading..." : "Reply"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

const Page :NextPage<CommunityPostResponse> = ({id, post,answers , isWondering}) =>{
   return (
      <SWRConfig
          value={{
            fallback: {
              [unstable_serialize(["api", "posts", id])]: {
                ok: true,
                post,
                answers,
                isWondering,
              },
            },
          }}
      >
        <CommunityPostDetail />
      </SWRConfig>
  )
}

export const getStaticPaths : GetStaticPaths = ()=>{
  return{
    paths:[], // 빌드 시 패스를 안 만들 경우 빈 배열로 둠
    fallback:true
    // "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx?.params?.id;
  if (!id) {
    return {
      props: {},
    };
  }
  const post = await client.post.findUnique({
    where:{
      id:Number(id),
    },
    include:{
      user:{
        select:{
          id:true,
          name:true,
          avatar:true
        }
      },
      answers:{
        select:{
          answer:true,
          id:true,
          user:{
            select:{
              id:true,
              name:true,
              avatar:true,
            }
          }
        },
      },
      _count:{
        select:{
          answers:true,
          wonderings:true
        }
      }
    }
  })

  const answers =  await client.answer.findMany({
    where: {
      postId: Number(ctx?.params?.id),
    },
    select:{
      id:true,
      answer:true,
      user:{
        select:{
          id:true,
          name:true,
          avatar:true,
        }
      }
    },
  })

  const isWondering = Boolean(
      await client.wondering.findFirst({
        where: {
          postId: Number(ctx?.params?.id),
          userId: post?.user?.id,
        },
        select: {
          id: true,
        },
      })
  );
  return {
    props:{
      id,
      post : JSON.parse(JSON.stringify(post)),
      answers:answers,
      isWondering:isWondering,
    },
    revalidate:20 // 빌드하고 설정한 시간이 지나면 이 페이지의 html을 다시 빌드한다.
    // 해당 기능(ISR)을 테스트 하기 위해서는 프로젝트를 빌드 한 후 npm rum start로 실행해야한다.
  }
}

export default CommunityPostDetail;
