import Image from "next/image";
import Link from "next/link";
import Button from "@components/button";
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";

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


  const [deletingProduct,] = useMutation<ProductResponse>(`/api/products/${id}/delete`);
  const handleDelete = ()=> {
    if(window.confirm("상품을 삭제하시겠습니까?")){
      deletingProduct({})
    }
  }

  return (
    <Link href={`/products/${id}`}>
      <a className="flex px-4 pt-5 cursor-pointer justify-between">
        <div className="flex space-x-4">
        <div className="w-20 h-20 bg-gray-400 rounded-md" />
          <div className="pt-2 flex flex-col">
            <h3 className="text-sm font-medium text-white">{title}</h3>
            <span className="font-medium mt-1 text-white">${price}</span>
            {
              user?.id === userId && (<div className="flex">
                  <Button className="mr-3" text="수정" onClick={() => {
                  }}/>
                  <Button text="삭제" onClick={handleDelete}/>
                </div>)
            }
          </div>
        </div>
        <div className="flex space-x-2 items-end justify-end">
          <div className="flex space-x-0.5 items-center text-sm  text-white">
          <svg
              className="w-4 h-4"
              fill={hearts > 0 ? "#EF5350"  : "#ADAEB3" }
              stroke={hearts > 0 ? "#EF5350"  : "#ADAEB3" } 
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
      </a>
    </Link>
  );
}