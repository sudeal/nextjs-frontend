"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import {
  Card,
  Tabs,
  Form,
  Input,
  Select,
  Button,
  Space,
  Radio,
  Flex,
  Tag,
  TimePicker,
  Modal,
  Cascader,
  DatePicker,
  Rate,
  Carousel,
  Collapse,
  Tooltip,
  theme,
  Drawer,
  Transfer,
  message,
} from "antd";
import type { RadioChangeEvent, TimePickerProps, CascaderProps, GetProp, DatePickerProps, SelectProps, CollapseProps, InputRef, DrawerProps, TransferProps } from "antd";
import type { Dayjs } from "dayjs";
import {
  AndroidOutlined,
  AppleOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  DownOutlined,
  PlusOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined, 
} from "@ant-design/icons";
import { getLocaleFromCookie } from "@/lib/locale";
import i18nConfig from "@/i18n";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

interface Option {
  value: string;
  label: string;
  children?: Option[];
  disabled?: boolean;
}

const cascaderOptions: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];

const tagOptions: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  tagOptions.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const handleTagSelectChange = (value: string[]) => {
  console.log("Selected tags:", value);
};

type TagRender = SelectProps["tagRender"];

const colorOptions: SelectProps["options"] = [
  { value: "gold" },
  { value: "lime" },
  { value: "green" },
  { value: "cyan" },
];

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={value as string}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const carouselStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const onCarouselChange = (currentSlide: number) => {
  console.log("Current slide:", currentSlide);
};

const collapseText = `
Test 1
`;
const collapseText2 = `
Test 2
`;
const collapseText3 = `
Test 3
`;

const collapseItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{collapseText}</p>,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{collapseText2}</p>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{collapseText3}</p>,
  },
];

const tagInputStyle: CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `Content ${i + 1}`,
  description: `Description ${i + 1}`,
}));

const initialTargetKeys = mockData
  .filter((item) => Number(item.key) > 10)
  .map((item) => item.key);







export default function ContactPage() {
  const [locale, setLocale] = useState<string>(i18nConfig.defaultLocale);
  const [commonDict, setCommonDict] = useState<Record<string, any> | null>(null);

  const [form] = Form.useForm();

  
  const [radioValue, setRadioValue] = useState(1);
  const onRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  
  const onTimeChange: TimePickerProps["onChange"] = (time, timeString) => {
    console.log("Selected time:", timeString);
  };

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOk = () => {
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        break;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        break;
      case "other":
        form.setFieldsValue({ note: "Hi there 252!" });
        break;
      default:
    }
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    console.log("Radio selected:", radioValue);
    
    setIsModalOpen(true);
  };

  const onReset = () => {
    form.resetFields();
    setRadioValue(1);
  };

  const onCascaderChange: CascaderProps<Option>['onChange'] = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const filter = (inputValue: string, path: DefaultOptionType[]): boolean =>
    path.some((option) => (option.label as string).toLowerCase().includes(inputValue.toLowerCase()));

  const onDatePickerChange = (date: Dayjs[] | null, dateString: string | string[]) => {
    console.log(date, dateString);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    const currentLocale = getLocaleFromCookie();
    setLocale(currentLocale);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const common = await import(`@/locales/${locale}/common.json`).then(
          (m) => m.default,
        );
        setCommonDict(common);
      } catch (error) {
        console.error("Failed to load translations:", error);
        const common = await import(`@/locales/tr/common.json`).then(
          (m) => m.default,
        );
        setCommonDict(common);
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
    () => (key: string) => {
      if (!commonDict) return key;
      return getNestedValue(commonDict, key);
    },
    [commonDict],
  );

  const MAX_COUNT = 3;

  const [deneme5Value, setDeneme5Value] = useState<string[]>([]);

  const deneme5Suffix = (
    <>
      <span>
        {deneme5Value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );


  const { token } = theme.useToken();


  const [tags, setTags] = useState<string[]>(["Unremovable", "Tag 2", "Tag 3"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef | null>(null);
  const editInputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    if (editInputIndex !== -1) {
      editInputRef.current?.focus();
    }
  }, [editInputValue, editInputIndex]);

  const handleTagClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showTagInput = () => {
    setInputVisible(true);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTagInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditTagInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagPlusStyle: CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>();

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onPlacementChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

    // 🔹 Transfer state'leri
    const [targetKeys, setTargetKeys] = useState<string[]>(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [loadingRight, setLoadingRight] = useState<boolean>(false);
    const [loadingLeft, setLoadingLeft] = useState<boolean>(false);
  
    // Listeler arası aktarma
    const handleTransferChange: TransferProps["onChange"] = (
      newTargetKeys,
      direction,
      moveKeys,
    ) => {
      setTargetKeys(newTargetKeys as string[]);
  
      if (direction === "right") {
        setLoadingRight(true);
        setTimeout(() => {
          setLoadingRight(false);
          message.success(`Successfully added ${moveKeys.length} items to the right`);
        }, 1000);
      } else {
        setLoadingLeft(true);
        setTimeout(() => {
          setLoadingLeft(false);
          message.success(`Successfully added ${moveKeys.length} items to the left`);
        }, 1000);
      }
    };
  
    // Seçim değişimi
    const handleTransferSelectChange: TransferProps["onSelectChange"] = (
      sourceSelectedKeys,
      targetSelectedKeys,
    ) => {
      setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys] as string[]);
    };
  
    // Sağ buton disabled mi?
    const rightButtonDisabled =
      selectedKeys.length === 0 ||
      selectedKeys.every((key) => targetKeys.includes(key));
  
    // Sol buton disabled mi?
    const leftButtonDisabled =
      selectedKeys.length === 0 ||
      selectedKeys.every((key) => !targetKeys.includes(key));
  
    const handleRightButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      console.log("Right button clicked", event);
    };
  
    const handleLeftButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      console.log("Left button clicked", event);
    };
  




  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-10">
      <div className="w-full max-w-3xl">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
         
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Tab 1",
                icon: <AppleOutlined />,
                children: (
                  <>
                        <div className="mt-4">
                      <Flex gap="small" wrap align="center">
                        <Tag icon={<TwitterOutlined />} color="#55acee">
                          Twitter
                        </Tag>
                        <Tag icon={<YoutubeOutlined />} color="#cd201f">
                          Youtube
                        </Tag>
                        <Tag icon={<FacebookOutlined />} color="#3b5999">
                          Facebook
                        </Tag>
                        <Tag icon={<LinkedinOutlined />} color="#0e76a8">
                          LinkedIn
                        </Tag>
                      </Flex>
                    </div>

                    
                    <div className="mt-6">
                      <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        style={{ maxWidth: 600, margin: "0 auto" }}
                      >
                       
                        <Form.Item
                          name="note"
                          label="Note"
                          rules={[{ required: true }]}
                          style={{ marginBottom: 24 }}
                        >
                          <Input />
                        </Form.Item>

                        
                        <Form.Item
                          name="gender"
                          label="Gender"
                          rules={[{ required: true }]}
                          style={{ marginBottom: 24 }}
                        >
                          <Select
                            allowClear
                            placeholder="Select a option and change input text above"
                            onChange={onGenderChange}
                            options={[
                              { label: "male", value: "male" },
                              { label: "female", value: "female" },
                              { label: "other", value: "other" },
                            ]}
                          />
                        </Form.Item>

                        
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) =>
                            prevValues.gender !== currentValues.gender
                          }
                        >
                          {({ getFieldValue }) =>
                            getFieldValue("gender") === "other" ? (
                              <Form.Item
                                name="customizeGender"
                                label="Customize Gender"
                                rules={[{ required: true }]}
                                style={{ marginBottom: 24 }}
                              >
                                <Input />
                              </Form.Item>
                            ) : null
                          }
                        </Form.Item>

                        
                        <Form.Item
                          label="Choices"
                          style={{ marginBottom: 24 }}
                        >
                          <div className="flex flex-col gap-2">
                            <Radio.Group
                              onChange={onRadioChange}
                              value={radioValue}
                              options={[
                                { value: 1, label: "Option A" },
                                { value: 2, label: "Option B" },
                                { value: 3, label: "Option C" },
                                {
                                  value: 4,
                                  label: (
                                    <>
                                      More...
                                      {radioValue === 4 && (
                                        <Input
                                          variant="filled"
                                          placeholder="please input"
                                          style={{ width: 120, marginInlineStart: 12 }}
                                        />
                                      )}
                                    </>
                                  ),
                                },
                              ]}
                            />
                          </div>
                        </Form.Item>

                      
                        <Form.Item
                          label="Select Time"
                          style={{ marginBottom: 24 }}
                        >
                          <TimePicker
                            onChange={onTimeChange}
                            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                          />
                        </Form.Item>

                        
                        <Form.Item
                          {...tailLayout}
                          style={{ marginBottom: 24 }}
                        >
                          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Space>
                              <Button type="primary" htmlType="submit">
                                Submit
                              </Button>
                              <Button htmlType="button" onClick={onReset}>
                                Reset
                              </Button>
                            </Space>
                          </div>
                        </Form.Item>
                      </Form>
                    </div>
                  </>
                ),
              },
              {
                key: "2",
                label: "Tab 2",
                icon: <AndroidOutlined />,
                children: (
                  
                  <div className="mt-6" style={{ maxWidth: 600, margin: "0 auto" }}>

                  <div style={{ marginBottom: 24 }}>
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              display: "block",
                              marginBottom: 8,
                            }}
                          >
                            Değerlendirme
                          </label>

                          <Rate />
                        </div>


                        
                    
                        <div style={{ marginBottom: 16 }}>
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              display: "block",
                              marginBottom: 8,
                            }}
                          >
                            Etiketler
                          </label>

                          <Flex gap="small" align="center" wrap>
                            {tags.map<React.ReactNode>((tag, index) => {
                              if (editInputIndex === index) {
                                return (
                                  <Input
                                    ref={editInputRef}
                                    key={tag}
                                    size="small"
                                    style={tagInputStyle}
                                    value={editInputValue}
                                    onChange={handleEditTagInputChange}
                                    onBlur={handleEditTagInputConfirm}
                                    onPressEnter={handleEditTagInputConfirm}
                                  />
                                );
                              }

                              const isLongTag = tag.length > 20;
                              const tagElem = (
                                <Tag
                                  key={tag}
                                  closable={index !== 0}
                                  style={{ userSelect: "none" }}
                                  onClose={() => handleTagClose(tag)}
                                >
                                  <span
                                    onDoubleClick={(e) => {
                                      if (index !== 0) {
                                        setEditInputIndex(index);
                                        setEditInputValue(tag);
                                        e.preventDefault();
                                      }
                                    }}
                                  >
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                  </span>
                                </Tag>
                              );

                              return isLongTag ? (
                                <Tooltip title={tag} key={tag}>
                                  {tagElem}
                                </Tooltip>
                              ) : (
                                tagElem
                              );
                            })}

                            {inputVisible ? (
                              <Input
                                ref={inputRef}
                                type="text"
                                size="small"
                                style={tagInputStyle}
                                value={inputValue}
                                onChange={handleTagInputChange}
                                onBlur={handleTagInputConfirm}
                                onPressEnter={handleTagInputConfirm}
                              />
                            ) : (
                              <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showTagInput}>
                                New Tag
                              </Tag>
                            )}
                          </Flex>
                        </div>

                        <div
                            style={{
                              display: "flex",
                              gap: 16,
                              marginBottom: 16,
                              flexWrap: "wrap",
                            }}
                          >
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 14,
                             fontWeight: 500,
                             display: "block",
                             marginBottom: 8 }}>
                        Deneme1
                      </label>
                      <Cascader
                        options={cascaderOptions}
                        onChange={onCascaderChange}
                        placeholder="Please select"
                        showSearch={{ filter }}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 14, fontWeight: 500, display: "block", marginBottom: 8 }}>
                        Deneme2
                      </label>
                      <DatePicker
                        multiple
                        onChange={onDatePickerChange}
                        maxTagCount="responsive"
                        style={{ width: "100%" }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      Deneme 3
                    </label>

                    <Select
                      mode="tags"
                      style={{ width: "100%" }}
                      placeholder="Tags Mode"
                      options={tagOptions}
                      onChange={handleTagSelectChange}
                    />
                  </div>
                  </div>

                  
                  
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        Deneme 4
                      </label>

                      <Select
                        mode="multiple"
                        tagRender={tagRender}
                        style={{ width: "100%" }}
                        options={colorOptions}
                      />
                    </div>

                  
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        Deneme 5
                      </label>

                      <Select
                        mode="multiple"
                        maxCount={MAX_COUNT}
                        value={deneme5Value}
                        style={{ width: "100%" }}
                        onChange={setDeneme5Value}
                        suffixIcon={deneme5Suffix}
                        placeholder="Please select"
                        options={[
                          { value: "Ava Swift", label: "Ava Swift" },
                          { value: "Cole Reed", label: "Cole Reed" },
                          { value: "Mia Blake", label: "Mia Blake" },
                          { value: "Jake Stone", label: "Jake Stone" },
                          { value: "Lily Lane", label: "Lily Lane" },
                          { value: "Ryan Chase", label: "Ryan Chase" },
                          { value: "Zoe Fox", label: "Zoe Fox" },
                          { value: "Alex Grey", label: "Alex Grey" },
                          { value: "Elle Blair", label: "Elle Blair" },
                        ]}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                  <Collapse accordion items={collapseItems} />
                </div>

                 
          <div style={{ marginBottom: 24 }}>
            <Space style={{ marginBottom: 16 }}>
              <Radio.Group value={placement} onChange={onPlacementChange}>
                <Radio value="top">top</Radio>
                <Radio value="right">right</Radio>
                <Radio value="bottom">bottom</Radio>
                <Radio value="left">left</Radio>
              </Radio.Group>

              <Button type="primary" onClick={showDrawer}>
                Open Drawer
              </Button>
            </Space>

            <Drawer
              title="Drawer with extra actions"
              placement={placement}
              width={500}
              onClose={onDrawerClose}
              open={drawerOpen}
              extra={
                <Space>
                  <Button onClick={onDrawerClose}>Cancel</Button>
                  <Button type="primary" onClick={onDrawerClose}>
                    OK
                  </Button>
                </Space>
              }
            >
              <p>Content 1...</p>
              <p>Content 2...</p>
              <p>Content 3...</p>
            </Drawer>
          </div>

          <div style={{ marginBottom: 24 }}>
                    <label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      Deneme 6
                    </label>

                    <Transfer
                      dataSource={mockData}
                      targetKeys={targetKeys}
                      selectedKeys={selectedKeys}
                      onChange={handleTransferChange}
                      onSelectChange={handleTransferSelectChange}
                      render={(item) => item.title}
                      listStyle={{ width: 220, height: 260 }}
                    />
                    
                  </div>


                  </div>
                ),
              },
            ]}
          />

          
          <Modal
            title="Başarılı"
            open={isModalOpen}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okText="Tamam"
            cancelText="Kapat"
          >
            <p>Formunuz başarıyla gönderildi.</p>
            <p>İlginiz için teşekkür ederiz.</p>
            <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
          </Modal>
        </Card>
      </div>
    </div>
    
  );
}
