"use client";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export type CustomTableRecord = {
  id: string | number;
  [key: string]: unknown;
};

type CustomTableProps = {
  columns: ColumnsType<CustomTableRecord>;
  data: CustomTableRecord[];
};

export function CustomTable({ columns, data }: CustomTableProps) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        current: 8,
        pageSize: data.length,
        total: 90,
        showSizeChanger: false,
      }}
      className="custom-table rounded-3xl"
    />
  );
}

