"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Table,
  Pagination,
  Form,
  Row,
  Col,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

type ProductRecord = {
  id: string;
  code: string;
  checked: boolean;
};

export default function BeyanPage() {
  const [products, setProducts] = useState<ProductRecord[]>([
    { id: "1", code: "07.02.09.0801321", checked: true },
    { id: "2", code: "07.02.09.0801322", checked: true },
    { id: "3", code: "07.02.09.0801323", checked: false },
    { id: "4", code: "07.02.09.0801324", checked: false },
    { id: "5", code: "07.02.09.0801325", checked: false },
    { id: "6", code: "07.02.09.0801326", checked: false },
    { id: "7", code: "07.02.09.0801327", checked: false },
    { id: "8", code: "07.02.09.0801328", checked: false },
    { id: "9", code: "07.02.09.0801329", checked: false },
    { id: "10", code: "07.02.09.0801330", checked: false },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalProducts = 100;

  const productColumns: ColumnsType<ProductRecord> = [
    {
      title: "",
      dataIndex: "checked",
      key: "checked",
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={record.checked}
          onChange={(e) => {
            setProducts(
              products.map((p) =>
                p.id === record.id ? { ...p, checked: e.target.checked } : p
              )
            );
          }}
        />
      ),
    },
    {
      title: "ÜRÜN GTIP",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "İşlemler",
      key: "actions",
      width: 200,
      render: () => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#64748b" }} />}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            style={{ color: "#64748b" }}
          >
            Düzenle
          </Button>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "#dc2626" }} />}
            className="rounded-lg border-0 bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
            style={{ color: "#dc2626", backgroundColor: "#fef2f2" }}
          >
            Sil
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Breadcrumb Navigasyon */}
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/"
            className="text-blue-800 underline hover:text-blue-800"
          >
            ← Geri Dön
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400">Ticaret Süreçleri</span>
          <span className="text-slate-400">&gt;</span>
          <span className="text-slate-400">Şirkete Ait Süreçler</span>
          <span className="text-slate-400">&gt;</span>
          <span className="text-slate-400">Beyannameler</span>
          <span className="text-slate-400">&gt;</span>
          <span className="text-slate-400">Beyanname Detay</span>
        </div>

        {/* Sayfa başlığı */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Özet Beyan
          </h1>
          <Button className="!rounded-full !bg-sky-600 !px-4 !py-2 !text-white hover:!bg-sky-700">
            Değişiklikleri Kaydet
          </Button>
        </div>

        {/* Card 1: Hazırlayan Kişi */}
        <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Hazırlayan Kişi *
              </label>
              <Input
                placeholder="Hazırlayan Kişi"
                className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Kod
              </label>
              <Input
                placeholder="Kod"
                className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Ana Form Alanları */}
        <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
          <Form layout="vertical" initialValues={{ kurye: true }}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Sol Kolon */}
              <div>
                <Row gutter={[0, 16]}>
                  {/* (2) Beyan Sahibi Temsilci No + Gönderen alanları */}
                  <Col span={24}>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <label className="text-sm font-bold text-slate-700 whitespace-nowrap">
                        (2) Beyan Sahibi Temsilci No
                      </label>
                      <Input
                        placeholder="No"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                        style={{ backgroundColor: '#f0f0f0', width: 140 }}
                      />
                    </div>

                    <div className="mt-2 flex flex-col gap-2">
                      <Input
                        placeholder="Gönderen/İhracatçı İsmi"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                      <Input
                        placeholder="Gönderen/İhracatçı Adres"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <Input
                        placeholder="Adres"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                      <Input
                        placeholder="A."
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                      <Input
                        placeholder="Kod"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                      <Input
                        placeholder="A."
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                    </div>
                  </Col>

                  {/* (5–8) Taşıt Bilgileri */}
                  <Col span={24}>
                    <Form.Item
                      label="(5) Taşıtın Adı/Cinsi"
                      name="tasitinAdiCinsi"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <Input
                        placeholder="Taşıtın Adı/Cinsi"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="(6) Taşıtın Kayıtlı Olduğu Ülke"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <Row gutter={12}>
                        <Col span={6}>
                          <Form.Item name="ulkeKod" noStyle>
                            <Input
                              placeholder="Kod"
                              className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={18}>
                          <Form.Item name="ulkeAdi" noStyle>
                            <Input
                              placeholder="Ülke Adı"
                              className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="(7) Taşıyıcı Firma"
                      name="tasiyiciFirma"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <Input
                        placeholder="Firma Adı"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="(8) Taşıtın Plakası / Sefer No"
                      name="plakaSeferNo"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <Input
                        placeholder="Taşıtın Plakası / Sefer No"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="(9) Çıkış Yeri"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <Row gutter={12}>
                        <Col span={6}>
                          <Form.Item name="cikisKod" noStyle>
                            <Input
                              placeholder="Kod"
                              className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={18}>
                          <Form.Item name="cikisUlkeAdi" noStyle>
                            <Input
                              placeholder="Ülke Adı"
                              className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="(11) Çıkış Tarihi"
                      name="cikisTarihi"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <DatePicker
                        placeholder="Çıkış Tarihi"
                        className="h-10 w-full rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                        format="DD.MM.YYYY"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Önceki Beyan No"
                      name="oncekiBeyanNo"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <Input
                        placeholder="Önceki Beyan No"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Grup Taşıma Senet No"
                      name="grupTasimaSenetNo"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <Input
                        placeholder="Grup Taşıma Senet No"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="TIR ATA Karne No"
                      name="tirAtaKarneNo"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <Input
                        placeholder="TIR ATA Karne No"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Taşıtın Referans No"
                      name="tasitinReferansNo"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 8 }}
                    >
                      <Input
                        placeholder="Taşıt Referans No"
                        className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Kurye"
                      name="kurye"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginBottom: 0 }}
                    >
                      <Radio.Group className="flex gap-4">
                        <Radio value={true}>Evet</Radio>
                        <Radio value={false}>Hayır</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Orta Kolon */}
              <Row gutter={[0, 0]}>
                <Col span={24}>
                  <Form.Item
                    label="(1) Beyan Türü"
                    name="beyanTuru"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="EX"
                      className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Beyan Rejimi"
                    name="beyanRejimi"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Select
                      className="w-full beyan-rejimi-select"
                      size="large"
                      placeholder="Beyan Rejimi"
                      options={[]}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="(3) Ek Formlar"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    {/* içerik sonradan eklenecek */}
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="(4) Ek Belge"
                    name="ekBelge"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="Ek Belge"
                      className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="(10) Varış Yeri"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Row gutter={12}>
                      <Col span={6}>
                        <Form.Item name="varisKod" noStyle>
                          <Input
                            placeholder="Kod"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="varisUlkeAdi" noStyle>
                          <Input
                            placeholder="Ülke Adı"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="(12) Varış Tarihi"
                    name="varisTarihi"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <DatePicker
                      placeholder="Varış Tarihi"
                      className="h-10 w-full rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                      format="DD.MM.YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Dorse No"
                    name="dorseNo"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="Dorse No"
                      className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Dorse Uyruğu"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Row gutter={12}>
                      <Col span={6}>
                        <Form.Item name="dorseUyruguKod" noStyle>
                          <Input
                            placeholder="Kod"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="dorseUyruguUlkeIsmi" noStyle>
                          <Input
                            placeholder="Ülke İsmi"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Dorse No 2"
                    name="dorseNo2"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="Dorse No 2"
                      className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Dorse Uyruğu 2"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Row gutter={12}>
                      <Col span={6}>
                        <Form.Item name="dorseUyrugu2Kod" noStyle>
                          <Input
                            placeholder="Kod"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="dorseUyrugu2UlkeIsmi" noStyle>
                          <Input
                            placeholder="Ülke İsmi"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Varış Gümrük İdaresi"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Row gutter={12}>
                      <Col span={6}>
                        <Form.Item name="varisGumrukKod" noStyle>
                          <Input
                            placeholder="Kod"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="varisGumrukUlkeIsmi" noStyle>
                          <Input
                            placeholder="Ülke İsmi"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>

              {/* Sağ Kolon */}
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="A. Gümrük İdaresi"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <div className="flex flex-col gap-4">
                      <Form.Item name="gumrukIdaresiKod" noStyle>
                        <Input
                          placeholder="Kod"
                          className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                        />
                      </Form.Item>
                      <Form.Item name="gumrukIdaresiIsim" noStyle>
                        <Input
                          placeholder="Gümrük İdaresi İsim"
                          className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                        />
                      </Form.Item>
                    </div>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="a) Tescil No"
                    name="tescilNo"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Row gutter={8}>
                      <Col span={18}>
                        <Form.Item name="tescilNo" noStyle>
                          <Input
                            placeholder="Tescil No"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Button className="!rounded-full border border-blue-600 !bg-white px-2 text-xs font-bold !text-blue-600 hover:!bg-blue-50">
                          VB Oluştur
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="VB. Tescil No"
                    name="vbTescilNo"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Input
                      placeholder="VB. Tescil No"
                      className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="K.M. Tescil No"
                    name="kmTescilNo"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Input
                      placeholder="K.M. Tescil No"
                      className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="b) Tescil Tarihi"
                    name="tescilTarihi"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Row gutter={8}>
                      <Col span={18}>
                        <Form.Item name="tescilTarihi" noStyle>
                          <DatePicker
                            placeholder="Tescil Tarihi"
                            className="h-10 w-full rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                            format="DD.MM.YYYY"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Button className="!rounded-full border border-blue-600 !bg-white px-2 text-xs font-semibold !text-blue-600 hover:!bg-blue-50">
                          Tescil Girişi
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="c) Referans No"
                    name="referansNo"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Input
                      placeholder="Referans No"
                      className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Bilge Kodu"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item name="bilgeKodu" noStyle>
                          <Input
                            placeholder="Bilge Kodu"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="kisiIsmi" noStyle>
                          <Input
                            placeholder="Kişi İsmi"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="T. Ağırlık"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item name="tAgirlik" noStyle>
                          <Input
                            placeholder="T. Ağırlık"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="tKapAdedi" noStyle>
                          <Input
                            placeholder="T. Kap Adedi"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Taşıma Şekli"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Row gutter={12}>
                      <Col span={6}>
                        <Form.Item name="tasimaSekliKod" noStyle>
                          <Input
                            placeholder="Kod"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="tasimaAdi" noStyle>
                          <Input
                            placeholder="Taşıma Adı"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Eşyanın Bulunduğu Yer"
                    name="esyaninBulunduguYer"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Input
                      placeholder="Eşyanın Bulunduğu Yer"
                      className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Yüklendiği Liman Yeri"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Row gutter={12}>
                      <Col span={6}>
                        <Form.Item name="yuklendigiLimanKod" noStyle>
                          <Input
                            placeholder="Kod"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="limanAdi" noStyle>
                          <Input
                            placeholder="Liman Adı"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Yüklendiği Ülke Kodu"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Row gutter={12}>
                      <Col span={6}>
                        <Form.Item name="yuklendigiUlkeKod" noStyle>
                          <Input
                            placeholder="Kod"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="yuklendigiUlkeIsmi" noStyle>
                          <Input
                            placeholder="Ülke İsmi"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Boşaltma Liman Yeri"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Row gutter={12}>
                      <Col span={6}>
                        <Form.Item name="bosaltmaLimanKod" noStyle>
                          <Input
                            placeholder="Kod"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="bosaltmaLimanAdi" noStyle>
                          <Input
                            placeholder="Liman Adı"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Boşaltma Ülkesi"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                  >
                    <Row gutter={12}>
                      <Col span={6}>
                        <Form.Item name="bosaltmaUlkeKod" noStyle>
                          <Input
                            placeholder="Kod"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="bosaltmaUlkeIsmi" noStyle>
                          <Input
                            placeholder="Ülke İsmi"
                            className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Yükleme/Boşaltma Yeri"
                    name="yuklemeBosaltmaYeri"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="Yükleme/Boşaltma Yeri"
                      className="h-10 rounded-lg border-slate-200 !bg-[#f0f0f0]"
                style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </div>

        {/* Ürün Listesi Başlık ve Butonlar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <label className="mb-2 block text-xl font-bold text-slate-800">
            Ürün Listesi
          </label>

          <div className="flex gap-2">
            <Button className="!rounded-full border border-blue-600 bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50">
              Toplu Bilgi Tanımla
            </Button>
            <Button
              type="primary"
              className="!rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Yeni Ürün Ekle
            </Button>
          </div>
        </div>

        {/* Card 3: Ürün Listesi Tablosu */}
        <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
          <div className="overflow-x-auto">
            <Table
              columns={productColumns}
              dataSource={products}
              rowKey="id"
              pagination={false}
              className="min-w-full rounded-lg"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Pagination
              current={currentPage}
              total={totalProducts}
              pageSize={pageSize}
              showSizeChanger={false}
              onChange={(page) => setCurrentPage(page)}
              showTotal={(total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total}`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
