"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Alert, Spin } from "antd";
import useTranslation from "next-translate/useTranslation";

import { getProductByIdWithFetch } from "@/core/api";
import { getLocaleFromCookie } from "@/lib/locale";

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
  const [locale, setLocale] = useState<string>("tr");
  const { t } = useTranslation("productDetail");
  const { t: tCommon } = useTranslation("common");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentLocale = getLocaleFromCookie();
    setLocale(currentLocale);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const productId = Number(id);
        if (Number.isNaN(productId)) {
          throw new Error(tCommon("messages.invalidProductId"));
        }

        const product = await getProductByIdWithFetch(productId);
        setProduct(product);
      } catch (err) {
        setError(err instanceof Error ? err.message : tCommon("messages.unknownError"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, tCommon]);

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
          <Alert type="error" message={tCommon("status.error")} description={error || tCommon("messages.productNotFound")} className="rounded-2xl" />
          <Link href={`/product2`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-900">
            {locale === "tr" ? "Tüm Ürünler" : "All Products"}
          </Link>
        </div>
      </div>
    );
  }

  const priceWithVAT = product.price * 1.18; 

  const detailRows = [
    { label: "ID", value: product.id.toString() },
    { label: locale === "tr" ? "Kategori" : "Category", value: product.category },
    { label: locale === "tr" ? "Fiyat" : "Price", value: `$${product.price.toFixed(2)}` },
    { label: locale === "tr" ? "KDV'li Fiyat" : "Price with VAT", value: `$${priceWithVAT.toFixed(2)}` },
    { label: locale === "tr" ? "Puan" : "Rating", value: `${product.rating.rate.toFixed(1)} (${product.rating.count})` },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link href="/product2" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-900">
          ← {locale === "tr" ? "Geri" : "Back"}
        </Link>

        <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <img src={product.image} alt={product.title} className="h-full max-h-96 w-full object-contain" />
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{product.title}</h1>
                <p className="mt-2 text-lg font-semibold text-sky-600">${product.price.toFixed(2)}</p>
              </div>

              <div className="space-y-2">
                {detailRows.map((row) => (
                  <div key={row.label} className="flex justify-between border-b border-slate-100 py-2">
                    <span className="font-medium text-slate-600">{row.label}</span>
                    <span className="text-slate-800">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <p className="text-slate-700">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

