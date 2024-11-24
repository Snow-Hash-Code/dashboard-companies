import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Header } from "./components/Header"
import { CompanyInformation } from "./components/CompanyInformation"
import { FooterCompany } from "./components/FooterCompany"


export default async function CompanyIdPage({ params } : { params: { companyId: string}}) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const company = await   prisma.company.findUnique({
    where: {
      id: params.companyId,
      userId
    }
  })

  if (!company) return redirect('/')

  return (
    <div>
      <Header />
      <CompanyInformation company={company} />
      <FooterCompany companyId={company.id} />
    </div>
  )
}