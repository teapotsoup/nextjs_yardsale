import { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

type WriteForm ={
  question:string
}

type WriteResponse={
  ok:boolean;
  post:Post
}

const Write: NextPage = () => {
  const {latitude, longitude} = useCoords();
  const router = useRouter()
  const {register, handleSubmit} = useForm<WriteForm>()
  const [post, {loading,data}] = useMutation<WriteResponse>("/api/posts")
  const onValid = (data:WriteForm)=>{
    if(loading) return // 로딩중일때 반복적으로 post하는 것을 막기 위함
    post({...data, latitude, longitude})
  }
  useEffect(()=>{
    if(data && data.ok){
      router.push(`/community/${data.post.id}`)
    }
  },[data,router])
  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <TextArea register={register("question",{required:true, minLength:1} )} required placeholder="Ask a question!" />
        <Button text={loading ? "Loading...":"Submit"} />
      </form>
    </Layout>
  );
};

export default Write;
