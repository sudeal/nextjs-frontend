import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");

  if (idParam) {
    const id = Number(idParam);
    const product = products.find((item) => item.id === id);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  }

  return NextResponse.json(products);
}

