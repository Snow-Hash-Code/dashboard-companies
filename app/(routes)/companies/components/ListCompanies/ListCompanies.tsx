import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/db"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export async function ListCompanies() {
  const { userId } = auth()

  if(!userId) return redirect('/')

  const companies = await prisma.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  console.log(companies)
  return (
    <DataTable columns={columns} data={companies} />
  )
}