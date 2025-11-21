"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert, Spin } from "antd";
import { useParams } from "next/navigation";
import { getProductByIdWithFetch } from "@/core/api";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Product2DetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const productId = Number(id);
        if (isNaN(productId)) {
          throw new Error("Geçersiz ürün ID'si.");
        }

        const product = await getProductByIdWithFetch(productId);
        setProduct(product);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Alert
            type="error"
            message="Hata"
            description={error || "Ürün bulunamadı."}
            className="rounded-2xl"
          />
          <Link
            href="/product2"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
          >
            ← Tüm Products
          </Link>
        </div>
      </div>
    );
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
          href="/product2"
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
                        <td className="w-1/3 bg-slate-50 px-4 py-3 font-semibold text-slate-600">{row.label}</td>
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

