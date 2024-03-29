import type { NextPage } from "next";
import Layout from "@components/layout";
import Link from "next/link";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import {User,Product, Chatroom, ChatMessage} from "@prisma/client";
import Button from "@components/button";
import axios from "axios";

interface ChatroomWithUsers extends Chatroom {
  buyer: User;
  seller: User;
  product : Product;
  chatMessages: ChatMessage[];
}


type ChatroomResponse = {
  ok:boolean;
  chatrooms: ChatroomWithUsers[];
}


const Chats: NextPage = () => {
  const {user} = useUser();
  const { data,mutate } = useSWR<ChatroomResponse>('/api/chats');

  const handleDeleteBtn = (chatroomId : number)=>{
    if(window.confirm("채팅방을 삭제하시겠습니까?")){
      axios
          .get(`/api/chats/${chatroomId}/delete`)
          .then(() => {
            mutate((data : any) => (
                {
                    ...data,
                    chatrooms:data.chatrooms.filter((chatroom : Chatroom)  => chatroom.id !== chatroomId)
                }
            ), false);
            window.alert("채팅이 삭제됐습니다");
          })
          .catch(err => {
            console.log('에러 : ',err);
          });
    }
  }




  return (
      <Layout hasTabBar title={'Chats'} seoTitle={'Chats'}>
        <div className="py-10 divide-y-[1px] ">
      {data?.chatrooms?.map((chatroom) => (
          <div className="flex px-4 cursor-pointer py-3 items-center space-x-3" key={chatroom.id}>
                <div className="flex justify-between w-full">
                  <Link href={`/chats/${chatroom.id}`} >
                    <a className='flex space-x-5 items-center'>
                      <div className="w-12 h-12 rounded-full bg-slate-300"/>
                      <div>
                        <p className="text-white">{user?.id === chatroom?.buyer?.id ? chatroom?.seller?.name : chatroom?.buyer?.name}</p>
                        <p className="text-sm  text-white">
                          {chatroom?.chatMessages[0]?.message}
                        </p>
                      </div>
                    </a>
                  </Link>
                  <div className="flex justify-between items-center w-64 ">

                      <div className="flex flex-col w-24 items-center justify-center border-white">
                          {user?.id === chatroom?.buyer?.id && (
                              <div className="w-100  rounded-full bg-blue-500 text-white p-1 text-xs border-2 border-white">구매</div>)}
                          {user?.id === chatroom?.seller?.id && (<div className="w-100  rounded-full bg-blue-500 text-white p-1 text-xs border-2 border-white">판매</div>)}
                          <p className="text-white">{chatroom?.product?.name}</p>
                      </div>
                      {user?.id === chatroom?.buyer?.id || user?.id === chatroom?.seller?.id ? (
                          <div className="w-100 text-xs">
                              <Button text="채팅방 삭제" onClick={() => handleDeleteBtn(chatroom.id)}/>
                          </div>) : null
                      }
                  </div>
                </div>
          </div>

      ))}
    </div>
    </Layout>

  );
};

export default Chats;