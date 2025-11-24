import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET all todos
export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(todos);
}

// POST new todo
export async function POST(req: Request) {
  const body = await req.json();

  const todo = await prisma.todo.create({
    data: {
      title: body.title,
    },
  });

  return NextResponse.json(todo);
}
