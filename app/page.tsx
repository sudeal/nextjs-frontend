"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, Tabs } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { CustomTable, CustomTableRecord } from "@/components/CustomTable";
import { getLocaleFromCookie } from "@/lib/locale";

type SelectionKey = "workflow-application" | null;

const workflowDataTemplate = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  index: index + 1,
}));

const declarationDataTemplate: Array<CustomTableRecord & { status: "inProgress" | "completed"; tradeType: "import" | "export" }> = [
  { id: 1, declarationName: "form", tradeType: "import", createdAt: "20.12.2025 13:08", creator: "user", status: "inProgress" },
  { id: 2, declarationName: "form", tradeType: "import", createdAt: "20.12.2025 13:08", creator: "user", status: "inProgress" },
  { id: 3, declarationName: "form", tradeType: "export", createdAt: "20.12.2025 13:08", creator: "user", status: "inProgress" },
  { id: 4, declarationName: "form", tradeType: "import", createdAt: "20.12.2025 13:08", creator: "user", status: "completed" },
  { id: 5, declarationName: "form", tradeType: "import", createdAt: "20.12.2025 13:08", creator: "user", status: "inProgress" },
  { id: 6, declarationName: "form", tradeType: "export", createdAt: "20.12.2025 13:08", creator: "user", status: "inProgress" },
  { id: 7, declarationName: "form", tradeType: "export", createdAt: "20.12.2025 13:08", creator: "user", status: "completed" },
];

const responsibleDataTemplate: CustomTableRecord[] = [
  { id: 1, name: "responsible1", role: "operations", mail: "sorumlu1@firma.io" },
  { id: 2, name: "responsible2", role: "finance", mail: "sorumlu2@firma.io" },
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
  const [commonDict, setCommonDict] = useState<Record<string, any> | null>(null);
  const [homeDict, setHomeDict] = useState<Record<string, any> | null>(null);
  const [locale, setLocale] = useState<string>("tr");

  useEffect(() => {
    const currentLocale = getLocaleFromCookie();
    setLocale(currentLocale);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [common, home] = await Promise.all([
          import(`@/locales/${locale}/common.json`).then((m) => m.default),
          import(`@/locales/${locale}/home.json`).then((m) => m.default),
        ]);
        setCommonDict(common);
        setHomeDict(home);
      } catch (error) {
        console.error("Failed to load translations:", error);
        // Fallback to Turkish
        const [common, home] = await Promise.all([
          import(`@/locales/tr/common.json`).then((m) => m.default),
          import(`@/locales/tr/home.json`).then((m) => m.default),
        ]);
        setCommonDict(common);
        setHomeDict(home);
      }
    };
    loadTranslations();
  }, [locale]);

  useEffect(() => {
    const handleLocaleChange = () => {
      const currentLocale = getLocaleFromCookie();
      setLocale(currentLocale);
    };
    window.addEventListener("localechange", handleLocaleChange);
    return () => window.removeEventListener("localechange", handleLocaleChange);
  }, []);

  const getNestedValue = (obj: Record<string, any>, path: string): string => {
    const value = path.split(".").reduce((acc: any, key) => acc?.[key], obj);
    return typeof value === "string" ? value : path;
  };

  const t = useMemo(
    () => (key: string, params?: Record<string, any>) => {
      if (!homeDict) return key;
      let value = getNestedValue(homeDict, key);
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(`{{${k}}}`, String(v));
        });
      }
      return value;
    },
    [homeDict],
  );

  const tCommon = useMemo(
    () => (key: string) => {
      if (!commonDict) return key;
      return getNestedValue(commonDict, key);
    },
    [commonDict],
  );

  useEffect(() => {
    const handler = ((event: CustomEvent<{ type?: string; key?: string }>) => {
      if (event.detail?.type === "workflow" && event.detail.key === "workflow-application") {
        setSelectedPanel("workflow-application");
      } else {
        setSelectedPanel(null);
      }
    }) as EventListener;

    window.addEventListener("header:select", handler);
    return () => window.removeEventListener("header:select", handler);
  }, []);

  const actionButtons = useMemo(
    () => (
      <div className="flex gap-3 text-sm font-semibold">
        <button className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-slate-300 hover:text-sky-600">
          <EditOutlined />
          {tCommon("actions.edit")}
        </button>
        <button className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-rose-600 transition hover:bg-rose-100">
          <DeleteOutlined />
          {tCommon("actions.delete")}
        </button>
      </div>
    ),
    [tCommon],
  );

  const workflowColumns = useMemo(
    () => [
      { title: tCommon("table.id"), dataIndex: "id", key: "id" },
      { title: t("workflow.columns.processName"), dataIndex: "processName", key: "processName" },
      { title: t("workflow.columns.creator"), dataIndex: "creator", key: "creator" },
      { title: t("workflow.columns.createdAt"), dataIndex: "createdAt", key: "createdAt" },
      { title: t("workflow.columns.authorityMail"), dataIndex: "authorityMail", key: "authorityMail" },
      {
        title: tCommon("table.actions"),
        dataIndex: "actions",
        key: "actions",
        render: () => actionButtons,
      },
    ],
    [actionButtons, t, tCommon],
  );

  const declarationColumns = useMemo(
    () => [
      { title: tCommon("table.id"), dataIndex: "id", key: "id" },
      { title: t("declaration.columns.name"), dataIndex: "declarationName", key: "declarationName" },
      { title: t("declaration.columns.tradeType"), dataIndex: "tradeType", key: "tradeType" },
      { title: t("declaration.columns.createdAt"), dataIndex: "createdAt", key: "createdAt" },
      { title: t("declaration.columns.creator"), dataIndex: "creator", key: "creator" },
      {
        title: t("declaration.columns.status"),
        dataIndex: "status",
        key: "status",
        render: (status: "inProgress" | "completed") => {
          const palette: Record<string, string> = {
            inProgress: "bg-amber-100 text-amber-600",
            completed: "bg-lime-100 text-lime-600",
          };
          return (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${palette[status] ?? "bg-slate-100 text-slate-600"}`}>
              {tCommon(`status.${status}`)}
            </span>
          );
        },
      },
      {
        title: tCommon("table.actions"),
        dataIndex: "actions",
        key: "actions",
        render: () => actionButtons,
      },
    ],
    [actionButtons, t, tCommon],
  );

  const responsibleColumns = useMemo(
    () => [
      { title: tCommon("table.id"), dataIndex: "id", key: "id" },
      { title: t("responsible.columns.name"), dataIndex: "name", key: "name" },
      { title: t("responsible.columns.role"), dataIndex: "role", key: "role" },
      { title: t("responsible.columns.mail"), dataIndex: "mail", key: "mail" },
    ],
    [t, tCommon],
  );

  const workflowData = useMemo(
    () =>
      workflowDataTemplate.map((item) => ({
        id: item.id,
        processName: t("workflow.rows.processName", { index: item.index }),
        creator: t("workflow.rows.creator"),
        createdAt: t("workflow.rows.createdAt"),
        authorityMail: "abdurrahman@yetkili.io",
      })),
    [t],
  );

  const declarationData = useMemo(
    () =>
      declarationDataTemplate.map((item) => ({
        ...item,
        declarationName: t("declaration.rows.name"),
        tradeType: t(`declaration.rows.tradeType.${item.tradeType}`),
        creator: t("declaration.rows.creator"),
      })),
    [t],
  );

  const responsibleData = useMemo(
    () =>
      responsibleDataTemplate.map((item) => ({
        ...item,
        name: t(`responsible.rows.${item.name}`),
        role: t(`responsible.rows.${item.role}`),
      })),
    [t],
  );

  const tabItems = useMemo(
    () => [
      {
        key: "tab1",
        label: t("tabs.workflow"),
        children: (
          <TabContent
            title={t("workflow.title")}
            searchPlaceholder={t("workflow.searchPlaceholder")}
            buttonLabel={t("workflow.buttonLabel")}
            columns={workflowColumns}
            data={workflowData}
          />
        ),
      },
      {
        key: "tab2",
        label: t("tabs.declaration"),
        children: (
          <TabContent
            title={t("declaration.title")}
            searchPlaceholder={t("declaration.searchPlaceholder")}
            buttonLabel={t("declaration.buttonLabel")}
            columns={declarationColumns}
            data={declarationData}
          />
        ),
      },
      {
        key: "tab3",
        label: t("tabs.responsible"),
        children: (
          <TabContent
            title={t("responsible.title")}
            searchPlaceholder={t("responsible.searchPlaceholder")}
            buttonLabel={t("responsible.buttonLabel")}
            columns={responsibleColumns}
            data={responsibleData}
          />
        ),
      },
    ],
    [declarationColumns, declarationData, responsibleColumns, responsibleData, t, workflowColumns, workflowData],
  );

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      {selectedPanel === "workflow-application" ? (
        <section className="mx-auto max-w-6xl rounded-3xl bg-white px-6 py-8 shadow-lg">
          <Tabs defaultActiveKey="tab1" items={tabItems} className="custom-tabs" />
        </section>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center text-center text-slate-500">
          {tCommon("messages.selectFromMenu")}
        </div>
      )}
    </main>
  );
}
