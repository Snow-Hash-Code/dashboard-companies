import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST (req: Request, { params } : { params: { companyId: string } } ) {
  try {
    const { userId } = auth()
    const data = await req.json()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const company = await prisma.company.findUnique({
      where: {
        id: params.companyId
      }
    })

    if (!company) return new NextResponse('Not Found', { status: 404 })

    const event = await prisma.event.create({
      data: {
        companyId: params.companyId,
        ...data
      }
    })

    return NextResponse.json(event)
  } catch {
    console.log('[EVENT]')
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}