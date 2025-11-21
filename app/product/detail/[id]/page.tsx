import Link from "next/link";
import { notFound } from "next/navigation";

import { products } from "@/data/products";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  const detailRows = [
    { label: "ID", value: product.id.toString() },
    { label: "Başlık", value: product.title },
    { label: "Kategori", value: product.category },
    { label: "Fiyat", value: `$${product.price.toFixed(2)}` },
    { label: "Puan", value: `${product.rating.rate.toFixed(1)}` },
    { label: "Oy Sayısı", value: product.rating.count.toString() },
    { label: "Açıklama", value: product.description },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <Link
          href="/product"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
        >
          ← Tüm Products
        </Link>

        <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Ürün Detayları</h1>
          </div>

          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:w-1/3">
              <div className="flex h-48 w-48 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
              </div>
              <div className="text-center">
                <p className="text-sm uppercase tracking-widest text-slate-400">{product.category}</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">{product.title}</h2>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <table className="w-full text-sm">
                  <tbody>
                    {detailRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-100 last:border-0">
                        <td className="bg-slate-50 px-4 py-3 font-semibold text-slate-600 w-1/3">{row.label}</td>
                        <td className="px-4 py-3 text-slate-800">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

