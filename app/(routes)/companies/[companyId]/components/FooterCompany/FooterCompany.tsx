'use client'

import { FooterCompanyProps } from "./FooterCompany.types"
import { useRouter } from "next/navigation"

import axios from "axios"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"


export function FooterCompany (props: FooterCompanyProps) {
  const { companyId } = props
  const router = useRouter()

  const onDeleteCompany = async () => {
    try {
      axios.delete(`/api/company/${companyId}`)
      toast({
        title: 'Company deleted',
      })
      router.push('/companies')
    } catch {
      toast({
        title: 'Something went wrong',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="flex justify-end mt-5">
      <Button variant={'destructive'} onClick={onDeleteCompany}>
        <Trash className="h-4 w-4 mr-2" />
        Remove Company
      </Button>
    </div>
  )
}