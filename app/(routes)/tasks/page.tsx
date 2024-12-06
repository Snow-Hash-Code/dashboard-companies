import { auth } from "@clerk/nextjs/server"

import { redirect } from 'next/navigation'
import prisma from "@/lib/db"
import { Calendar } from "./components/Calendar/Calendar"

export default async function TasksPage() {
  const { userId } = auth()

  if (!userId) redirect('/')

  const companies = await prisma.company.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  console.log(events)

  return (
    <div>
      <Calendar companies={companies} events={events} />
    </div>
  )
}