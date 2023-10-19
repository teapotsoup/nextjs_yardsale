import { ProductWithCount } from "pages";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
    kind: "Fav" | "Sale" | "Purchase";
  }
  
interface Record {
    id: number;
    product: ProductWithCount;
}
  
interface ProductListResponse {
    [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
    const { data } = useSWR<ProductListResponse>(`/api/users/me/records?kind=${kind}`);
    return data ? (
      <>
        {data?.records.map((record) => (
          <Item
            key={record.id}
            id={record.product.id}
            title={record.product.name}
            price={record.product.price}
            hearts={0}
          />
        ))}
      </>
    ) : null;
};
