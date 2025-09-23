import { NextResponse } from "next/server";
import { api } from "@/lib/";

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const l = api.getList(id);
  return l
    ? NextResponse.json(l)
    : NextResponse.json({ error: "saknas" }, { status: 404 });
}
export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const { name } = await req.json();
  const l = api.renameList(id, name);
  return l
    ? NextResponse.json(l)
    : NextResponse.json({ error: "saknas" }, { status: 404 });
}
export async function DELETE(
  _: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  api.deleteList(id);
  return NextResponse.json({ ok: true });
}
