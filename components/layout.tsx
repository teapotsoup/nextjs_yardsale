import React from "react";
import { cls } from "@libs/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

interface LayoutProps {
  title?: string;
  productName? :string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  seoTitle?:string;
}

export default function Layout({
  title, productName,
  canGoBack,
  hasTabBar,
  children,
  seoTitle,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  const headTitle = `${seoTitle} | Yard Sale`
  return (
    <div>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <div className="bg-blue-500 w-full h-12 max-w-2xl justify-center text-lg py-8 px-10 font-medium  fixed text-white top-0  flex items-center">
        {canGoBack ? (
          <button onClick={onClick} className="absolute left-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              ></path>
            </svg>
          </button>
        ) : null}
    <div className = "grid justify-items-center">
      {title ? (
            <div className={cls(canGoBack ? "mx-auto text-md" : "", "")}>{title}</div>
      ) : null}
      {productName ? (
            <div className={cls(canGoBack ? "mx-auto text-xs" : "", "")}>{productName}</div>
      ) : null}
    </div>
      </div>
      <div className={cls("pt-16", hasTabBar ? "pb-24" : "")}>{children}</div>
      {hasTabBar ? (
          <nav
              className="bg-gray-600 max-w-2xl text-gray-700  fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
            <Link href="/">
              <a
                  className={cls(
                      "flex flex-col items-center space-y-2 ",
                      router.pathname === "/"
                          ? "text-white"
                          : "hover:text-blue-600 transition-colors"
                  )}
              >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
                <span>홈</span>
              </a>
            </Link>
            <Link href="/community">
              <a
                  className={cls(
                      "flex flex-col items-center space-y-2 ",
                      router.pathname === "/community"
                          ? "text-white"
                          : "hover:text-blue-600 transition-colors"
                  )}
              >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  ></path>
                </svg>
                <span>자유 게시판</span>
              </a>
            </Link>
            <Link href="/chats">
              <a
                  className={cls(
                      "flex flex-col items-center space-y-2 ",
                      router.pathname === "/chats"
                          ? "text-white"
                          : "hover:text-blue-600 transition-colors"
                  )}
              >
                <svg
                    className="w-6 h-6"
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
                <span>채팅</span>
              </a>
            </Link>
            <Link href="/streams">
              <a
                  className={cls(
                      "flex flex-col items-center space-y-2 ",
                      router.pathname === "/streams"
                          ? "text-white"
                          : "hover:text-blue-600 transition-colors"
                  )}
              >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>라이브</span>
              </a>
            </Link>
            <Link href="/profile">
              <a
                  className={cls(
                      "flex flex-col items-center space-y-2 ",
                      router.pathname === "/profile"
                          ? "text-white"
                          : "hover:text-blue-600 transition-colors"
                  )}
              >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span>나의 캐럿</span>
              </a>
            </Link>
            <Link href="/blog">
              <a
                  className={cls(
                      "flex flex-col items-center space-y-2 ",
                      router.pathname === "/blog"
                          ? "text-white"
                          : "hover:text-blue-600 transition-colors"
                  )}
              >
                <svg className="w-6 h-6"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M162.4 196c4.8-4.9 6.2-5.1 36.4-5.1 27.2 0 28.1 .1 32.1 2.1 5.8 2.9 8.3 7 8.3 13.6 0 5.9-2.4 10-7.6 13.4-2.8 1.8-4.5 1.9-31.1 2.1-16.4 .1-29.5-.2-31.5-.8-10.3-2.9-14.1-17.7-6.6-25.3zm61.4 94.5c-53.9 0-55.8 .2-60.2 4.1-3.5 3.1-5.7 9.4-5.1 13.9 .7 4.7 4.8 10.1 9.2 12 2.2 1 14.1 1.7 56.3 1.2l47.9-.6 9.2-1.5c9-5.1 10.5-17.4 3.1-24.4-5.3-4.7-5-4.7-60.4-4.7zm223.4 130.1c-3.5 28.4-23 50.4-51.1 57.5-7.2 1.8-9.7 1.9-172.9 1.8-157.8 0-165.9-.1-172-1.8-8.4-2.2-15.6-5.5-22.3-10-5.6-3.8-13.9-11.8-17-16.4-3.8-5.6-8.2-15.3-10-22C.1 423 0 420.3 0 256.3 0 93.2 0 89.7 1.8 82.6 8.1 57.9 27.7 39 53 33.4c7.3-1.6 332.1-1.9 340-.3 21.2 4.3 37.9 17.1 47.6 36.4 7.7 15.3 7-1.5 7.3 180.6 .2 115.8 0 164.5-.7 170.5zm-85.4-185.2c-1.1-5-4.2-9.6-7.7-11.5-1.1-.6-8-1.3-15.5-1.7-12.4-.6-13.8-.8-17.8-3.1-6.2-3.6-7.9-7.6-8-18.3 0-20.4-8.5-39.4-25.3-56.5-12-12.2-25.3-20.5-40.6-25.1-3.6-1.1-11.8-1.5-39.2-1.8-42.9-.5-52.5 .4-67.1 6.2-27 10.7-46.3 33.4-53.4 62.4-1.3 5.4-1.6 14.2-1.9 64.3-.4 62.8 0 72.1 4 84.5 9.7 30.7 37.1 53.4 64.6 58.4 9.2 1.7 122.2 2.1 133.7 .5 20.1-2.7 35.9-10.8 50.7-25.9 10.7-10.9 17.4-22.8 21.8-38.5 3.2-10.9 2.9-88.4 1.7-93.9z"/>
                </svg>
                <span>공지 사항</span>
              </a>
            </Link>

          </nav>
      ) : null}
    </div>
  )
      ;
}
// gonna need to be more specific