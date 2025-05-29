import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ colorId: string; storeId: string }> }
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

    const { colorId } = await params;

    if (!colorId)
      return new NextResponse("Color Id is required", { status: 403 });

    const color = await prisma.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json({
      message: "Color updated successfully",
      color,
    });
  } catch (error) {
    console.log("[COLOR_PATCH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ colorId: string; storeId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, colorId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!colorId) {
      return new NextResponse("Color Id is required", { status: 403 });
    }

    const storeUserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeUserId) return new NextResponse("Unauthorized", { status: 403 });

    const color = await prisma.color.deleteMany({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json({
      message: "Color deleted successfully",
      color,
    });
  } catch (error) {
    console.log("[COLOR_DELETE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ colorId: string }> }
) {
  try {
    const { colorId } = await params;

    if (!colorId) {
      return new NextResponse("Color Id is required", { status: 403 });
    }

    const color = await prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json({
      message: "Color deleted successfully",
      color,
    });
  } catch (error) {
    console.log("[COLOR_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
