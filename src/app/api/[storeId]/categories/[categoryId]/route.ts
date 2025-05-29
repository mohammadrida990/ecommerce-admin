import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ categoryId: string; storeId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { storeId } = await params;

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id id is required", { status: 400 });
    }

    const storeUserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeUserId) return new NextResponse("Unauthorized", { status: 403 });

    const { categoryId } = await params;

    const category = await prisma.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log("[CATEGORY_PATCH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ categoryId: string; storeId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, categoryId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 403 });
    }

    const storeUserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeUserId) return new NextResponse("Unauthorized", { status: 403 });

    const category = await prisma.category.deleteMany({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json({
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.log("[CATEGORY_DELETE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;

    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 403 });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
