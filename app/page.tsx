"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, Tabs } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CustomTable, CustomTableRecord } from "@/components/CustomTable";

type SelectionKey = "workflow-application" | null;

const actionButtons = () => (
  <div className="flex gap-3 text-sm font-semibold">
    <button className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-slate-300 hover:text-sky-600">
      <EditOutlined />
      Düzenle
    </button>
    <button className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-rose-600 transition hover:bg-rose-100">
      <DeleteOutlined />
      Sil
    </button>
  </div>
);

const workflowColumns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Akış Adı", dataIndex: "processName", key: "processName" },
  { title: "Başlatan", dataIndex: "creator", key: "creator" },
  { title: "Başlama Zamanı", dataIndex: "createdAt", key: "createdAt" },
  { title: "İlgili Kişi Maili", dataIndex: "authorityMail", key: "authorityMail" },
  {
    title: "Aksiyonlar",
    dataIndex: "actions",
    key: "actions",
    render: actionButtons,
  },
];

const workflowData: CustomTableRecord[] = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  processName: "Akış 1",
  creator: "İsim Soyisim",
  createdAt: "20.12.2025 13:08",
  authorityMail: "abdurrahman@yetkili.io",
}));

const declarationColumns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "İhracat Form Adı", dataIndex: "declarationName", key: "declarationName" },
  { title: "İşlem Türü", dataIndex: "tradeType", key: "tradeType" },
  { title: "Oluşturulma Tarihi", dataIndex: "createdAt", key: "createdAt" },
  { title: "İşlemi Başlatan", dataIndex: "creator", key: "creator" },
  {
    title: "İşlem Durumu",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const palette: Record<string, string> = {
        "Devam Ediyor": "bg-amber-100 text-amber-600",
        Tamamlandı: "bg-lime-100 text-lime-600",
      };
      return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${palette[status] ?? "bg-slate-100 text-slate-600"}`}>
          {status}
        </span>
      );
    },
  },
  {
    title: "Aksiyonlar",
    dataIndex: "actions",
    key: "actions",
    render: actionButtons,
  },
];

const declarationData: CustomTableRecord[] = [
  { id: 1, declarationName: "Form 1", tradeType: "İthalat", createdAt: "20.12.2025 13:08", creator: "İsim Soyisim", status: "Devam Ediyor" },
  { id: 2, declarationName: "Form 1", tradeType: "İthalat", createdAt: "20.12.2025 13:08", creator: "İsim Soyisim", status: "Devam Ediyor" },
  { id: 3, declarationName: "Form 1", tradeType: "İhracat", createdAt: "20.12.2025 13:08", creator: "İsim Soyisim", status: "Devam Ediyor" },
  { id: 4, declarationName: "Form 1", tradeType: "İthalat", createdAt: "20.12.2025 13:08", creator: "İsim Soyisim", status: "Tamamlandı" },
  { id: 5, declarationName: "Form 1", tradeType: "İthalat", createdAt: "20.12.2025 13:08", creator: "İsim Soyisim", status: "Devam Ediyor" },
  { id: 6, declarationName: "Form 1", tradeType: "İhracat", createdAt: "20.12.2025 13:08", creator: "İsim Soyisim", status: "Tamamlandı" },
  { id: 7, declarationName: "Form 1", tradeType: "İhracat", createdAt: "20.12.2025 13:08", creator: "İsim Soyisim", status: "Tamamlandı" },
];

const responsibleColumns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "İsim", dataIndex: "name", key: "name" },
  { title: "Görev", dataIndex: "role", key: "role" },
  { title: "Mail", dataIndex: "mail", key: "mail" },
];

const responsibleData: CustomTableRecord[] = [
  { id: 1, name: "Sorumlu 1", role: "Operasyon", mail: "sorumlu1@firma.io" },
  { id: 2, name: "Sorumlu 2", role: "Finans", mail: "sorumlu2@firma.io" },
];

type TabContentProps = {
  title: string;
  searchPlaceholder: string;
  buttonLabel: string;
  columns: any[];
  data: CustomTableRecord[];
};

function TabContent({ title, searchPlaceholder, buttonLabel, columns, data }: TabContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-2xl font-semibold text-slate-800">{title}</div>
        <Button type="primary" className="rounded-full bg-sky-500 px-6 py-5 text-base font-semibold shadow-none">
          {buttonLabel}
        </Button>
      </div>
      <Input
        placeholder={searchPlaceholder}
        prefix={<SearchOutlined className="text-slate-400" />}
        size="large"
        className="h-12 rounded-full border-0 bg-slate-100 text-base"
      />
      <div className="rounded-3xl border border-slate-100">
        <CustomTable columns={columns as any} data={data} />
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedPanel, setSelectedPanel] = useState<SelectionKey>(null);

useEffect(() => {
  const handler = ((event: CustomEvent<{ type?: string; key?: string }>) => {
    if (event.detail?.type === "workflow" && event.detail.key === "İşlem Başvurusu") {
      setSelectedPanel("workflow-application");
    } else {
      setSelectedPanel(null);
    }
  }) as EventListener;

  window.addEventListener("header:select", handler);
  return () => window.removeEventListener("header:select", handler);
}, []);

  const tabItems = useMemo(
    () => [
      {
        key: "tab1",
        label: "Tab1",
        children: (
          <TabContent
            title="İşlem Süreçleri"
            searchPlaceholder="İşlem Süreci Ara..."
            buttonLabel="İşlem Süreci Başlat"
            columns={workflowColumns}
            data={workflowData}
          />
        ),
      },
      {
        key: "tab2",
        label: "Tab2",
        children: (
          <TabContent
            title="Geçici İhracat Formu"
            searchPlaceholder="Beyanname Ara..."
            buttonLabel="Yeni Beyanname Oluştur"
            columns={declarationColumns}
            data={declarationData}
          />
        ),
      },
      {
        key: "tab3",
        label: "Tab3",
        children: (
          <TabContent
            title="Sorumlu Kişiler"
            searchPlaceholder="Sorumlu Ara..."
            buttonLabel="Yeni Sorumlu Ekle"
            columns={responsibleColumns}
            data={responsibleData}
          />
        ),
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      {selectedPanel === "workflow-application" ? (
        <section className="mx-auto max-w-6xl rounded-3xl bg-white px-6 py-8 shadow-lg">
          <Tabs defaultActiveKey="tab1" items={tabItems} className="custom-tabs" />
        </section>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center text-center text-slate-500">
          Menüden bir işlem seçerek içeriği görüntüleyin.
        </div>
      )}
    </main>
  );
}
