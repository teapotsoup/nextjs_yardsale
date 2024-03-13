import Link from "next/link";
import Button from "@components/button";
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";
import { CiMenuKebab } from "react-icons/ci";
import {useCallback, useState} from "react";
import {useRouter } from "next/router";

interface ItemProps {
  title: string;
  id: number;
  price: number;
  hearts: number;
  userId:number;
}

interface ProductResponse{
  ok:boolean;
}

export default function Item({ title, price, hearts, id, userId }: ItemProps) {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

  const [deletingProduct,] = useMutation<ProductResponse>(`/api/products/${id}/delete`);
  const handleDelete = ()=> {
    if(window.confirm("상품을 삭제하시겠습니까?")){
      deletingProduct({})
    }
  }

  const handleEdit = useCallback((itemId:number)=>{
      if(itemId){
          router.push(`/products/${itemId}/edit`)
      }
  },[router])
    const handleIconBtn = useCallback(() => {
        setIsMenuOpen(prevState => !prevState);
    }, []);

  return (
      <div className="flex px-4 pt-5 cursor-pointer justify-between">
          <a>
              <Link href={`/products/${id}`}>
                  <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-400 rounded-md"/>
                      <div className="pt-2 flex flex-col">
                          <h3 className="text-sm font-medium text-white">{title}</h3>
                          <span className="font-medium mt-1 text-white">${price}</span>
                      </div>
                  </div>
              </Link>
          </a>
          <div className="w-10  flex flex-col justify-between items-end relative">
              {
                  user?.id === userId ? (
                          <CiMenuKebab onClick={handleIconBtn} size="24" color="#3b82f6" className="flex items-center space-y-10 "/>

                  ) : <div/>
                          }
              {isMenuOpen && <div
                  className="min-w-[70px] p-1 absolute font-[14px] rounded-lg  bg-white shadow-md flex flex-col gap-2 transition-all duration-300 left-[60px] items-center">
                  <div >
                      <div className="w-100 mb-1">
                          <Button    text="수정" onClick={()=>handleEdit(id)}/>
                      </div>
                      <div className="w-100">
                          <Button text="삭제" onClick={()=>handleDelete}/>

                      </div>
                  </div>
              </div>}

              <div className="flex space-x-0.5 items-center text-sm text-white">
                  <svg
                      className="w-4 h-4"
                      fill={hearts > 0 ? "#EF5350" : "#ADAEB3"}
                      stroke={hearts > 0 ? "#EF5350" : "#ADAEB3"}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                  </svg>
                  <span>{hearts}</span>
              </div>
          </div>
      </div>


  );
}