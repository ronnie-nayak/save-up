'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AddMoneySchema } from '@acme/validators'

import { apiReact } from "~/trpc/react"
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from "recoil"
import { MoneyFormUI } from "@acme/ui"
import { FormOpenState } from "@acme/atoms"


export function MoneyForm() {
  const router = useRouter()
  const setFormOpen = useSetRecoilState(FormOpenState)
  // const addNew = await apiServer.transactions.addNew()
  const utils = apiReact.useUtils()
  const addNew = apiReact.transactions.addNew.useMutation(
    {
      onSuccess: (data, variables) => {
        utils.transactions.getAll.invalidate()
        utils.transactions.get7monthstats.invalidate()
      },
      onError: (error) => {
        utils.transactions.sessionExists.invalidate()
        // router.replace("/login")
      }
    }
  )
  const formSchema = AddMoneySchema
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      type: "income",
      amount: undefined,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // apiReact.transactions.addnew.usemutation().mutate(values)
    addNew.mutate(values)
    form.reset({ amount: 0 })
    setFormOpen(false)
  }

  return (
    <MoneyFormUI form={form} onSubmit={onSubmit} />
  )
}
