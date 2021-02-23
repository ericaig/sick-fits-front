import { useRouter } from "next/dist/client/router";
import Products from "../../components/Products";
import Pagination from "../../components/Pagination";

export default function ProductsPage() {
  const {
    query: { page },
  } = useRouter();
  return (
    <div>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
