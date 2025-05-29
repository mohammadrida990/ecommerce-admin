import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ sizeId: string; storeId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { storeId } = await params;

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value id is required", { status: 400 });
    }

    const storeUserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeUserId) return new NextResponse("Unauthorized", { status: 403 });

    const { sizeId } = await params;

    if (!sizeId)
      return new NextResponse("Size Id is required", { status: 403 });

    const size = await prisma.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json({
      message: "Size updated successfully",
      size,
    });
  } catch (error) {
    console.log("[SIZE_PATCH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ sizeId: string; storeId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, sizeId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!sizeId) {
      return new NextResponse("Size Id is required", { status: 403 });
    }

    const storeUserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeUserId) return new NextResponse("Unauthorized", { status: 403 });

    const size = await prisma.size.deleteMany({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json({
      message: "Size deleted successfully",
      size,
    });
  } catch (error) {
    console.log("[SIZE_DELETE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sizeId: string }> }
) {
  try {
    const { sizeId } = await params;

    if (!sizeId) {
      return new NextResponse("Size Id is required", { status: 403 });
    }

    const size = await prisma.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json({
      message: "Size deleted successfully",
      size,
    });
  } catch (error) {
    console.log("[SIZE_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
