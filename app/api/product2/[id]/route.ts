import { NextResponse } from "next/server";
import { getProductById } from "@/core/api";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "Geçersiz ürün ID'si." },
        { status: 400 }
      );
    }

    const product = await getProductById(productId);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Ürün bulunamadı veya alınırken bir hata oluştu." },
      { status: 404 }
    );
  }
}

