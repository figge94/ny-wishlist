import { NextResponse } from 'next/server'
import { api } from '@/lib/fakeDb'

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string; itemId: string }> }) {
  const { id, itemId } = await ctx.params
  const data = await req.json()
  return NextResponse.json(api.updateItem(id, itemId, data))
}
export async function DELETE(_: Request, ctx: { params: Promise<{ id: string; itemId: string }> }) {
  const { id, itemId } = await ctx.params
  api.deleteItem(id, itemId)
  return NextResponse.json({ ok: true })
}
