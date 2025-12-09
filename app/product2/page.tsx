"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Alert, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import useTranslation from "next-translate/useTranslation";

import { CustomTable, type CustomTableRecord } from "@/components/CustomTable";
import { getProductsWithAxios } from "@/core/api";
import { getLocaleFromCookie } from "@/lib/locale";

type ProductRecord = CustomTableRecord & {
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Product2Page() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locale, setLocale] = useState<string>("tr");
  const { t } = useTranslation("product2");
  const { t: tCommon } = useTranslation("common");

  useEffect(() => {
    const currentLocale = getLocaleFromCookie();
    setLocale(currentLocale);
  }, []);

  useEffect(() => {
    const handleLocaleChange = () => {
      const currentLocale = getLocaleFromCookie();
      setLocale(currentLocale);
    };
    window.addEventListener("localechange", handleLocaleChange);
    return () => window.removeEventListener("localechange", handleLocaleChange);
  }, []);

  const columns: ColumnsType<CustomTableRecord> = useMemo(
    () => [
      {
        title: locale === "tr" ? "Ürün" : "Product",
        dataIndex: "title",
        key: "title",
        render: (_, record) => {
          const product = record as ProductRecord;
          return (
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{product.title}</p>
                <p className="text-xs capitalize text-slate-500">{product.category}</p>
              </div>
            </div>
          );
        },
      },
      {
        title: locale === "tr" ? "Fiyat" : "Price",
        dataIndex: "price",
        key: "price",
        width: 140,
        align: "left",
        render: (value) => (
          <span className="font-semibold text-slate-800">${Number(value).toFixed(2)}</span>
        ),
      },
      {
        title: locale === "tr" ? "KDV'li Fiyat" : "Price with VAT",
        dataIndex: "priceWithVAT",
        key: "priceWithVAT",
        width: 160,
        align: "left",
        render: (value) => (
          <span className="font-semibold text-slate-800">${Number(value).toFixed(2)}</span>
        ),
      },
      {
        title: locale === "tr" ? "Puan" : "Score",
        dataIndex: ["rating", "rate"],
        key: "rating",
        width: 180,
        align: "left",
        render: (_, record) => {
          const product = record as ProductRecord;
          return (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">{product.rating.rate.toFixed(1)}</span>
              <span className="text-xs text-slate-500">({product.rating.count})</span>
            </div>
          );
        },
      },
      {
        title: "",
        key: "detail",
        width: 140,
        render: (_, record) => {
          const product = record as ProductRecord;
          return (
            <Link
              href={`/product2/detail/${product.id}`}
              className="text-sm font-semibold text-sky-600 transition hover:text-sky-800"
            >
              {locale === "tr" ? "Detay" : "View"}
            </Link>
          );
        },
      },
    ],
    [locale],
  );

  const tableData = useMemo(
    () =>
      products.map((product) => ({
        ...product,
        key: product.id,
        priceWithVAT: product.price * 1.18,
      })),
    [products],
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const products = await getProductsWithAxios();
      setProducts(products as unknown as ProductRecord[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : tCommon("messages.unknownError"));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [tCommon]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{locale === "tr" ? "Ürün Listesi" : "Product List"}</h1>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-4">
          </div>

          {error && (
            <Alert
              type="error"
              message={tCommon("messages.operationFailed")}
              description={error}
              className="mb-4 rounded-2xl"
            />
          )}

          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <CustomTable columns={columns} data={tableData} />
          )}
        </div>
      </div>
    </div>
  );
}

