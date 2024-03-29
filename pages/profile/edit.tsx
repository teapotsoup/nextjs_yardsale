import { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import useUser from "@libs/client/useUser";
import {useEffect, useState} from "react";
import useMutation from "@libs/client/useMutation";

type EditProfileForm ={
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

type EditProfileResponse ={
  ok:boolean;
  error?:string;
}


const EditProfile: NextPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();

   const {user} = useUser();

   useEffect(()=>{
    if(user?.name)   setValue('name',user?.name )
    if(user?.email)  setValue('email',user?.email)
    if(user?.phone)   setValue('phone',user?.phone )
   },[user,setValue])


   const [editProfile,{data,loading}]=useMutation<EditProfileResponse>(`/api/users/me`); 
   const onValid = async ({ email, phone, name }: EditProfileForm) => {
    if(loading) return;
    if (email === "" && phone === "" && name === "") {
      setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }
    editProfile({email,phone,name})
    window.alert('계정 정보가 수정 됐습니다')
  };

  useEffect(()=>{
    if(data && !data.ok && data.error){
      setError("formErrors", {message:data.error})
    }
  },[data, setError])


  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-white hover:text-gray-700"
          >
            Change
            <input
              {...register('avatar')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
         register={register("name")}
        required={false} 
        label="Name" 
        name="name" 
        type="text"
        />
        <Input
         register={register("email")}
        required={false} 
        label="Email address" 
        name="email" 
        type="email"
        />
        <Input
        register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? "Loading..." :"Update profile" }/>
      </form>
    </Layout>
  );
};

export default EditProfile;
