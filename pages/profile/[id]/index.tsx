import type { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Review,User,Product } from "@prisma/client";
import {useRouter} from "next/router";
import {cls} from "@libs/client/utils";
import Item from "@components/item";

interface receivedReviewsAndProductWithUser extends User{
    receivedReviews:Review[];
    products:Product[]
}

interface ProfileResponse {
    ok:boolean;
    profile: receivedReviewsAndProductWithUser;
}


const Profile: NextPage<ProfileResponse> = () => {
    const router = useRouter();
    const {data} = useSWR<ProfileResponse>(router.query.id ?`/api/users/profiles/${router.query.id}`: null);

    return (
        <Layout canGoBack>
            <div className="py-10 px-4">
                <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-slate-500 rounded-full" />
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{data?.profile?.name}</span>
                        <span className="font-medium text-gray-900">{"가입일자 : " + String(data?.profile?.createdAt).split('T')[0] }</span>
                    </div>
                </div>
                <div className="pt-5">
                    <span className="font-bold text-gray-900">판매 중</span>
                    <hr className="h-px my-2 bg-gray-700 border-0"/>
                </div>

                {data?.profile?.products?.length! > 0 ?
                    (data?.profile?.products?.map((product : any) => (
                        <Item
                            key={product.id}
                            id={product.id}
                            title={product.name}
                            price={product.price}
                            hearts={product.records.length}
                        />
                    )))
                    :<div>판매하는 상품이 없습니다</div>}
                <div className="pt-6">
                    <span className="font-bold text-gray-900">판매자 리뷰</span>
                    <hr className="h-px my-2 bg-gray-700 border-0"/>
                </div>
                {data?.profile?.receivedReviews?.length! > 0 ?
                    (data?.profile?.receivedReviews?.map((review : any) => (
                    <div className="mt-5" key={review.id}>
                    <div className="flex space-x-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-500" />
                    <div>
                    <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                    key={star}
                    className={cls(
                    "h-5 w-5",
                    review.score >= star
                    ? "text-yellow-400"
                    : "text-gray-400"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    ))}
                    </div>
                    </div>
                    </div>
                    <div className="mt-4 text-white text-sm">
                    <p>
                {review.review}
                    </p>
                    </div>
                    </div>
                    )))
                    :<div>리뷰가 없습니다</div>}

            </div>
        </Layout>
    );
};

export default Profile;