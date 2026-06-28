import { createProduct } from "@/app/admin/actions";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight text-ivory-text">
        Add Product
      </h1>
      <p className="mt-2 mb-8 text-sm text-ivory-text/55">
        Create a new product. It appears in the shop immediately on save.
      </p>
      <ProductForm mode="new" action={createProduct} />
    </div>
  );
}
