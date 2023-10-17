import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {ChatMessage, Chatroom, User, Product } from '@prisma/client';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';

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

const ChatDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<ChatroomResponse>(
      router.query.id ? `/api/chats/${router.query.id}` : null,
      // {
      //   refreshInterval: 1000,
      // }
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
      `/api/chats/${router.query.id}/messages`
  );
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
    <Layout hasTabBar canGoBack title={user?.id === data?.chatroom?.buyer?.id ?  data?.chatroom?.seller?.name : data?.chatroom?.buyer?.name} productName={data?.chatroom?.product?.name}>
      <div className="py-10 pb-16 px-4 space-y-4">
        {data?.chatroom?.chatMessages.map((message) => (
            <Message
                key={message?.id}
                message={message?.message}
                reversed={Number(message.user.id) === Number(user?.id)}
            />
        ))}
        <form
            onSubmit={handleSubmit(onValid)}
            className="fixed py-2 bg-white  bottom-0 inset-x-0"
        >
          <div className="flex relative max-w-md items-center  w-full mx-auto">
            <input
                {...register('message', { required: true })}
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
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
