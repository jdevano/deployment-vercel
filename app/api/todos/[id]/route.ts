import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// UPDATE
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();

  const updated = await prisma.todo.update({
    where: { id },
    data: {
      done: body.done,
    },
  });

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  const deleted = await prisma.todo.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Deleted", deleted });
}
