import {NextPage} from "next";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import Button from "@components/button";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import {useEffect} from "react";
import {Post} from "@prisma/client";
import useSWR from "swr";
import {CommunityPostResponse} from "./index";

type WriteForm ={
    question:string
}

type WriteResponse={
    ok:boolean;
    post:Post
}

const Edit: NextPage = () => {
    const router = useRouter()
    const {register, handleSubmit,setValue} = useForm<WriteForm>()

    const { data,  } = useSWR<CommunityPostResponse>(`/api/posts/${router.query.id}`);
    const [editPost, {loading,data : editPostData}] = useMutation<WriteResponse>(`/api/posts/${router.query.id}/edit`)
    const onValid = (data:WriteForm)=>{
        if(loading) return
        editPost({...data})
    }
    useEffect(()=>{
        if(editPostData && editPostData.ok){
            window.alert('수정됐습니다')
            router.push(`/community/${router.query.id}`)
        }
    },[editPostData,router])
    useEffect(()=>{
        if(data?.post?.question)   setValue('question',data?.post?.question )},[data,setValue])
    return (
        <Layout hasTabBar canGoBack title="Post Edit">
            <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
                <TextArea register={register("question",{required:true, minLength:1} )} required />
                <Button text={loading ? "Loading...":"Edit"} />
            </form>
        </Layout>)
}

export default Edit;