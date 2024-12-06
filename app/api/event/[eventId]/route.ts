import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE (req: Request, { params } : { params : { eventId: string }}) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const deletedEvent = await prisma.event.delete({
      where: {
        id: params.eventId
      }
    })

    return NextResponse.json(deletedEvent)
  } catch {
    console.log('[EVENT]')
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}