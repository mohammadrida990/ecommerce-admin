import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ productId: string; storeId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { storeId } = await params;

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

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

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

    const storeUserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeUserId) return new NextResponse("Unauthorized", { status: 403 });

    const { productId } = await params;

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        sizeId,
        colorId,
        categoryId,
        isArchived,
        isFeatured,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("[PRODUCT_PATCH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string; storeId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, productId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Product Id is required", { status: 403 });
    }

    const storeUserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeUserId) return new NextResponse("Unauthorized", { status: 403 });

    const product = await prisma.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log("[PRODUCT_DELETE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;

    if (!productId) {
      return new NextResponse("Product Id is required", { status: 403 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
