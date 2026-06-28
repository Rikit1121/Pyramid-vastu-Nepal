import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { updateProduct } from "@/app/admin/actions";
import ProductForm from "@/components/admin/ProductForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight text-ivory-text">
        Edit Product
      </h1>
      <p className="mt-2 mb-8 text-sm text-ivory-text/55">
        Editing <span className="text-ivory-text/80">{product.name}</span>.
      </p>
      <ProductForm mode="edit" action={updateProduct} product={product} />
    </div>
  );
}
