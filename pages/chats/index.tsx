import type { NextPage } from "next";
import Layout from "@components/layout";
import Link from "next/link";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import {User,Product, Chatroom, ChatMessage} from "@prisma/client";

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
  const { data } = useSWR<ChatroomResponse>('/api/chats');

  return (
    <Layout hasTabBar  >
    <div className="py-10 divide-y-[1px] ">
      {data?.chatrooms?.map((chatroom, i) => (
          <Link href={`/chats/${chatroom.id}`} key={chatroom.id}>
              <a className="flex px-4 cursor-pointer py-3 items-center space-x-3 ">
                <div className="flex justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-slate-300" />
                  <div>
                    <p className="text-gray-700">{user?.id === chatroom?.buyer?.id ?  chatroom?.seller?.name : chatroom?.buyer?.name}</p>
                    <p className="text-sm  text-gray-500">
                      See you tomorrow in the corner at 2pm!
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-700">{chatroom?.product?.name}</p>
                  </div>
                </div>
              </a>
          </Link>
      ))}
    </div>
    </Layout>

  );
};

export default Chats;