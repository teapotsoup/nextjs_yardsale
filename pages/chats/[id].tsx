import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {ChatMessage, Chatroom, User, Product } from '@prisma/client';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import {useEffect, useRef} from "react";

interface ChatMessageWithUser extends ChatMessage {
  user: User;
}

interface ChatroomWithChatMessages extends Chatroom {
  chatMessages: ChatMessageWithUser[];
  product : Product
  buyer: User;
  seller: User;
}

interface ChatroomResponse {
  ok: true;
  chatroom: ChatroomWithChatMessages;
}
interface MessageForm {
  message: string;
}


// polling 하고 싶으면 useSWR에 refreshInterval
const ChatDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef(null);
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<ChatroomResponse>(
      router.query.id ? `/api/chats/${router.query.id}` : null,
      { refreshInterval: 1000 }
  );

  const [sendMessage, { loading }] = useMutation(
      `/api/chats/${router.query.id}/messages`
  );

  // useEffect(() => {
  //   const eventSource = new EventSource('/api/sse');
  //   console.log('이벤트 소스 : ', eventSource)
  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log(data); // 필요에 따라 데이터 처리
  //
  //     // mutate(
  //     //     (prev)=> prev && ({
  //     //       ...prev,
  //     //       chatroom:{
  //     //         ...prev.chatroom,
  //     //         chatMessages: []
  //     //       }
  //     //     })
  //     // )
  //     // 예를 들어, 상태를 업데이트하여 다시 렌더링을 트리거할 수 있습니다.
  //   };
  //
  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);


  useEffect(() => {
    messageEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.chatroom]);

  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
        (prev) =>
            prev &&
            ({
              ...prev,
              chatroom: {
                ...prev.chatroom,
                chatMessages: [
                  ...prev.chatroom.chatMessages,
                  {
                    id: Date.now(),
                    message: form.message,
                    user: {
                      ...user,
                    },
                  },
                ],
              },
            } as any),
        false
    );
    sendMessage(form);
  };

  return (
    <Layout canGoBack title={user?.id === data?.chatroom?.buyer?.id ?  data?.chatroom?.seller?.name : data?.chatroom?.buyer?.name} productName={data?.chatroom?.product?.name} seoTitle={'Chatting'}>
      <div ref={chatContainerRef} id="chatCover" className="py-10 pb-16 px-4 space-y-4">
        {data?.chatroom?.chatMessages.map((message) => (
            <Message
                key={message?.id}
                message={message?.message}
                reversed={Number(message.user.id) === Number(user?.id)}
            />
        ))}
        <div ref={messageEndRef}></div>
        <form
            onSubmit={handleSubmit(onValid)}
            className="fixed w-full max-w-2xl justify-center py-2 bg-white  bottom-0"
        >
          <div className="flex relative max-w-md items-center  w-full mx-auto">
            <input
                {...register('message', {required: true})}
                type="text"
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-blue-500 focus:outline-none pr-12 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button
                  className="flex focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center bg-blue-500 rounded-full px-3 hover:bg-blue-600 text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
