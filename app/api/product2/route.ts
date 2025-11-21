import { NextResponse } from "next/server";
import { getProducts } from "@/core/api";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Ürünler alınırken bir hata oluştu." },
      { status: 500 }
    );
  }
}

