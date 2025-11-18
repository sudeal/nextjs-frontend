'use client';

import { useMemo, useState } from "react";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Select, Typography } from "antd";

const { Title, Text } = Typography;

const languageOptions = [
  { label: "TR - Türkçe", value: "tr" },
  { label: "EN - English", value: "en" },
  { label: "AZ - азербайджанец", value: "az" },
  { label: "RU - Русский", value: "ru" },
];

const passwordRules = [
  { key: "minLength", label: "Minimum 8 karakter", isValid: (value: string) => value.length >= 8 },
  {
    key: "special",
    label: "Minimum 1 özel karakter (%,&,.)",
    isValid: (value: string) => /[%&.]/.test(value),
  },
  {
    key: "uppercase",
    label: "Minimum bir büyük harf",
    isValid: (value: string) => /[A-ZÇĞİÖŞÜ]/.test(value),
  },
];

export default function ProfilePage() {
  const [isAccountSaved, setIsAccountSaved] = useState(false);
  const [passwordForm] = Form.useForm();
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordModal, setPasswordModal] = useState({ open: false, success: true });

  const handleAccountSave = () => {
    setIsAccountSaved(true);
  };

  const passwordStatus = useMemo(() => {
    return passwordRules.reduce<Record<string, boolean>>((acc, rule) => {
      acc[rule.key] = rule.isValid(passwordValue);
      return acc;
    }, {});
  }, [passwordValue]);

  const validateNewPassword = (_: unknown, value?: string) => {
    if (!value) {
      return Promise.reject("Yeni şifreyi gir.");
    }

    const currentPassword = passwordForm.getFieldValue("currentPassword");
    if (currentPassword && value === currentPassword) {
      return Promise.reject("Mevcut şifre ile yeni şifre aynı olamaz. Lütfen farklı bir şifre gir.");
    }

    const hasErrors = passwordRules.some((rule) => !rule.isValid(value));
    if (hasErrors) {
      return Promise.reject("Şifre gereksinimlerini karşılamıyor.");
    }
    return Promise.resolve();
  };

  const validatePasswordConfirm = (_: unknown, value?: string) => {
    if (!value) {
      return Promise.reject("Yeni şifreyi tekrar gir.");
    }
    if (value !== passwordForm.getFieldValue("newPassword")) {
      return Promise.reject("Şifreler eşleşmiyor.");
    }
    return Promise.resolve();
  };

  const handlePasswordSave = () => {
    setPasswordModal({ open: true, success: true });
    passwordForm.resetFields(["currentPassword", "newPassword", "newPasswordConfirm"]);
    setPasswordValue("");
  };

  const handlePasswordSaveFailed = () => {
    setPasswordModal({ open: true, success: false });
  };

  const closePasswordModal = () => {
    setPasswordModal((prev) => ({ ...prev, open: false }));
  };

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="rounded-2xl bg-white px-6 py-4 text-center shadow-sm">
          <Title level={3} className="!m-0">Profil Ayarları</Title>
          <Text type="secondary">Hesap bilgilerini güncelle, güvenliğini koru.</Text>
        </div>

        <Card className="border-none shadow-lg">
          <div className="mb-6">
            <Title level={4} className="!m-0">Hesap Ayarları</Title>
            <Text type="secondary">Hesabına ait temel bilgileri yönet.</Text>
          </div>

          <Form
            layout="vertical"
            requiredMark={false}
            onFinish={handleAccountSave}
            initialValues={{
              email: "isim.soyisim@sirket.io",
              firstName: "Ad",
              lastName: "Soyad",
              language: "tr",
            }}
            className="grid gap-4 md:grid-cols-2"
          >
            <Form.Item label="Email" name="email" className="md:col-span-2">
              <Input disabled size="large" />
            </Form.Item>
            <Form.Item
              label="Ad"
              name="firstName"
              rules={[{ required: true, message: "Lütfen adını gir." }]}
            >
              <Input placeholder="Adı girin" size="large" />
            </Form.Item>
            <Form.Item
              label="Soyad"
              name="lastName"
              rules={[{ required: true, message: "Lütfen soyadını gir." }]}
            >
              <Input placeholder="Soyadı girin" size="large" />
            </Form.Item>
            <Form.Item
              label="Platform Dili"
              name="language"
              className="md:col-span-2"
              rules={[{ required: true, message: "Bir dil seç." }]}
            >
              <Select size="large" options={languageOptions} />
            </Form.Item>
            <div className="md:col-span-2 flex justify-end">
              <Button type="primary" size="large" htmlType="submit" className="rounded-full px-8">
                Değişiklikleri Kaydet
              </Button>
            </div>
          </Form>
        </Card>

        <Card className="border-none shadow-lg">
          <div className="mb-6">
            <Title level={4} className="!m-0">Şifre Ayarları</Title>
            <Text type="secondary">Kişisel verilerini korumak için güçlü bir şifre oluştur.</Text>
          </div>

          <Form
            layout="vertical"
            requiredMark={false}
            form={passwordForm}
            onFinish={handlePasswordSave}
            onFinishFailed={handlePasswordSaveFailed}
            className="grid gap-4 md:grid-cols-2"
          >
            <Form.Item
              label="Mevcut Şifre"
              name="currentPassword"
              rules={[{ required: true, message: "Mevcut şifreyi gir." }]}
            >
              <Input.Password placeholder="Mevcut şifre" size="large" />
            </Form.Item>
            <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
              <Form.Item
                label="Yeni Şifre"
                name="newPassword"
                rules={[{ validator: validateNewPassword }]}
              >
                <Input.Password
                  placeholder="Şifre girin"
                  size="large"
                  onChange={(event) => setPasswordValue(event.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Yeni Şifre Tekrar"
                name="newPasswordConfirm"
                dependencies={["newPassword"]}
                rules={[{ validator: validatePasswordConfirm }]}
              >
                <Input.Password placeholder="Şifre tekrar girin" size="large" />
              </Form.Item>
            </div>

            <div className="md:col-span-2 space-y-2 rounded-xl bg-zinc-50 p-4">
              {passwordRules.map((rule) => {
                const satisfied = passwordStatus[rule.key];
                const Icon = satisfied ? CheckCircleFilled : CloseCircleFilled;
                return (
                  <div
                    key={rule.key}
                    className={`flex items-center gap-3 text-sm font-medium ${
                      satisfied ? "text-zinc-700" : "text-red-500"
                    }`}
                  >
                    <Icon className={satisfied ? "text-blue-500" : "text-red-400"} />
                    {rule.label}
                </div>
                );
              })}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <Button type="primary" size="large" htmlType="submit" className="rounded-full px-8">
                Değişiklikleri Kaydet
              </Button>
            </div>
          </Form>
        </Card>
        <Modal
          open={isAccountSaved}
          title="Başarılı"
          centered
          okText="Tamam"
          cancelText="Kapat"
          onOk={() => setIsAccountSaved(false)}
          onCancel={() => setIsAccountSaved(false)}
        >
          <p>Hesap bilgileriniz başarıyla kaydedildi.</p>
        </Modal>
        <Modal
          open={passwordModal.open}
          title={passwordModal.success ? "Başarılı" : "Hata"}
          centered
          okText="Tamam"
          cancelButtonProps={{ style: { display: "none" } }}
          onOk={closePasswordModal}
          onCancel={closePasswordModal}
        >
          <p>
            {passwordModal.success
              ? "Şifreniz başarıyla güncellendi."
              : "Şifre gereksinimlerini kontrol edip tekrar deneyin."}
          </p>
        </Modal>
      </div>
    </main>
  );
}
