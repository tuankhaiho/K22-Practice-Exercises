import { useProducts } from "../api/products";

export default function ProductSummary() {
  const { data, isSuccess } = useProducts(); 
  if (!isSuccess) return null;

  return (
    <p className="mb-4 text-sm text-slate-600">
      Tổng số sản phẩm : <strong className="text-slate-900">{data.products.length}</strong> sản phẩm
    </p>
  );
}
