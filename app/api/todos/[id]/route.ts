import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// UPDATE
export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const body = await req.json();

  const updated = await prisma.todo.update({
    where: { id: Number(id) },
    data: { done: body.done },
  });

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req: Request, { params }: any) {
  const { id } = params;

  await prisma.todo.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
