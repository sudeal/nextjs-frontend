import { NextResponse } from "next/server";
import { products } from "@/data/products";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

