import { NextResponse } from 'next/server'
import { api } from '@/lib/fakeDb'

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const { title, url, price } = await req.json()
  if (!title) return NextResponse.json({ error: 'title krävs' }, { status: 400 })
  return NextResponse.json(api.addItem(id, { title, url, price }), { status: 201 })
}
