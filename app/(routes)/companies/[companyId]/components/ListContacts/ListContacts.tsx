import { redirect } from "next/navigation"
import { Mail, Phone } from "lucide-react"

import prisma from "@/lib/db"

import { Separator } from "@/components/ui/separator"

import { ListContactsProps } from "./ListContacts.types"
import { auth } from "@clerk/nextjs/server"

export async function ListContacts (props: ListContactsProps) {
  const { company } = props
  const { userId } = auth()

  if (!userId) return redirect("/")

  const contacts = await prisma.contact.findMany({
    where: {
      company: {
        id: company.id
      }
    }
  })

  if (contacts.length === 0) {
    return (
      <p>Actualmente no dispones de ningún contacto.</p>
    )
  }

  return (
    <div>
      <div className="mt-4 mb-2 grid grid-cols-3 p-2 gap-x-3 items-center justify-between px-4 bg-slate-400/20 rounded-lg">
        <p>Name</p>
        <p>Rol</p>
        <p className="text-right">Contact</p>
      </div>
      {contacts.map(contact => (
        <div key={contact.id}>
          <div className="grid grid-cols-3 gap-x-3 items-center justify-between px-4">
            <p>{contact.name}</p>
            <p>{contact.role}</p>
            <div className="flex items-center gap-x-6 justify-end">
              <a href={`tel: ${contact.phone}`} target="_blank">
                <Phone className="w-4 h-4" />
              </a>
              <a href={`mailto: ${contact.email}`}>
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          <Separator className="my-3" />
        </div>
      ))}
    </div>
  )
}