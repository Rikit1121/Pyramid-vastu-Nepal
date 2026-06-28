import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ivory-text">
            Products
          </h1>
          <p className="mt-2 text-sm text-ivory-text/55">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            in the catalog.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center rounded-btn bg-copper px-6 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper"
        >
          Add Product
        </Link>
      </div>

      {/* List */}
      {products.length === 0 ? (
        <div className="mt-10 rounded-card border border-border-hairline bg-surface px-6 py-16 text-center">
          <p className="font-display text-xl text-ivory-text">No products yet</p>
          <p className="mt-2 text-sm text-ivory-text/55">
            Add your first product to populate the shop.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-card border border-border-hairline">
          {/* Table header (desktop) */}
          <div className="hidden grid-cols-[64px_1fr_140px_120px_140px] gap-4 border-b border-border-hairline bg-surface px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-ivory-text/45 sm:grid">
            <span>Image</span>
            <span>Name</span>
            <span>Price</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          <ul role="list">
            {products.map((product) => (
              <li
                key={product.id}
                className="grid grid-cols-[56px_1fr] items-center gap-4 border-b border-border-hairline bg-surface/40 px-5 py-4 last:border-b-0 sm:grid-cols-[64px_1fr_140px_120px_140px]"
              >
                {/* Image */}
                <div className="h-14 w-14 overflow-hidden rounded-btn border border-border-hairline bg-bg-deep">
                  {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                {/* Name (+ mobile meta) */}
                <div className="min-w-0">
                  <p className="truncate font-medium text-ivory-text">
                    {product.name}
                  </p>
                  <p className="truncate text-xs text-ivory-text/40">
                    /{product.slug}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs sm:hidden">
                    <span className="text-copper">
                      NPR {product.price.toLocaleString()}
                    </span>
                    <span
                      className={
                        product.inStock ? "text-ivory-text/60" : "text-ivory-text/35"
                      }
                    >
                      {product.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                </div>

                {/* Price (desktop) */}
                <span className="hidden text-sm text-copper sm:block">
                  NPR {product.price.toLocaleString()}
                </span>

                {/* Status (desktop) */}
                <span className="hidden sm:block">
                  <span
                    className={[
                      "inline-block rounded-btn px-2.5 py-1 text-[10px] uppercase tracking-[0.15em]",
                      product.inStock
                        ? "bg-copper/15 text-copper"
                        : "bg-bg-deep text-ivory-text/40",
                    ].join(" ")}
                  >
                    {product.inStock ? "In stock" : "Out"}
                  </span>
                </span>

                {/* Actions */}
                <div className="col-span-2 mt-2 flex items-center gap-4 sm:col-span-1 sm:mt-0 sm:justify-end">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-xs font-medium text-ivory-text/70 transition-colors duration-200 hover:text-copper"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton id={product.id} name={product.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
