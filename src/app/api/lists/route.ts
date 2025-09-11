import { NextResponse } from 'next/server'
import { api } from '@/lib/fakeDb'

export async function GET() { return NextResponse.json(api.listAll()) }
export async function POST(req: Request) {
  const { name } = await req.json()
  if (!name) return NextResponse.json({ error: 'name krävs' }, { status: 400 })
  return NextResponse.json(api.createList(name), { status: 201 })
}
