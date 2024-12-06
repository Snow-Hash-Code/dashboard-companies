'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Toast } from "@/components/ui/toast"
import { Textarea } from '@/components/ui/textarea'

import { UploadButton } from "@/utils/uploadthing"

import { CompanyFormProps } from "./CompanyForm.types"
import { formSchema } from "./CompanyForm.form"
import { toast } from "@/hooks/use-toast"

export function CompanyForm(props: CompanyFormProps) {
  const { company } = props
  const router = useRouter()
  const [photoUploaded, setPhotoUploaded] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name,
      description: company.description,
      country: company.country,
      website: company.website,
      phone: company.phone,
      cif: company.cif,
      profileImage: company.profileImage
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>)  => {
    try {
      await axios.patch(`/api/company/${company.id}`, values)
      toast({title: 'Company updated!', variant: 'default'})
      router.refresh()
    } catch {
      toast({title: 'Something wen wrong!', variant: 'destructive'})
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Company name..." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({field}) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="spain">España</SelectItem>
                    <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                    <SelectItem value="portugal">Portugal</SelectItem>
                    <SelectItem value="grecia">Grecia</SelectItem>
                    <SelectItem value="italia">Italia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({field}) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="www.website.com" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+34 651 12 21 21" type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cif"
            render={({field}) => (
              <FormItem>
                <FormLabel>CIF / NIF</FormLabel>
                <FormControl>
                  <Input placeholder="B-1234567" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={({field}) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <div>
                    {photoUploaded ? (
                      <p className="text-sm">Image uploaded!</p>
                    ): (
                      <UploadButton className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3" {...field} endpoint="profileImage" onClientUploadComplete={(res) => {
                        form.setValue('profileImage', res?.[0].url)
                        setPhotoUploaded(true)
                      }} onUploadError={() => {
                        toast({title: 'Error uploading photo', variant: 'destructive'})
                      }}/>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Company Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Company description..." {...field}  value={form.getValues().description ?? ''}  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Edit Company</Button>
      </form>
    </Form>
  )
}