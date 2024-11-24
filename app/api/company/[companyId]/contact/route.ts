import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { companyId: string } }) {
  try{
    const { userId } = auth()
    const data = await req.json()

    if (!userId) return new NextResponse("Unauthorized", { status: 401 })

    const company = await prisma.company.findUnique({
      where: { 
        id: params.companyId
      }
    })

    if (!company) return new NextResponse("Company not found", { status: 404 })

    const contact = await prisma.contact.create({
      data: {
        companyId: params.companyId,
        ...data
      }
    })

    return NextResponse.json(contact)

  } catch (error) {
    console.log('[CONTACT]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}