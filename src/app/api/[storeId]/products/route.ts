import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      price,
      sizeId,
      categoryId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = body;
    const { storeId } = await params;

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!sizeId)
      return new NextResponse("Size Id is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("Category Id is required", { status: 400 });
    if (!colorId)
      return new NextResponse("Color Id is required", { status: 400 });
    if (!images || !images.length)
      return new NextResponse("Images is required", { status: 400 });
    if (!price) return new NextResponse("Price is required", { status: 400 });
    if (!storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const storeUserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeUserId) return new NextResponse("Unauthorized", { status: 403 });

    const product = await prisma.product.create({
      data: {
        name,
        price,
        sizeId,
        colorId,
        categoryId,
        isArchived,
        isFeatured,
        storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const products = await prisma.product.findMany({
      where: {
        storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
