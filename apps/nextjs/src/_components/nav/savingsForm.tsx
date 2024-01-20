'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { apiReact } from "~/trpc/react"
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from "recoil"
import { AddSavingsSchema } from "@acme/validators"

import Link from "next/link"
import { Button, DialogClose, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from "@acme/ui"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui"
import { Input } from "@acme/ui"
import { FormOpenState, SavingsFormOpenState } from "@acme/atoms"
import { HexColorPicker } from "react-colorful";
import { useState } from "react"

export function SavingsForm() {

  const [color, setColor] = useState("#aabbcc");
  const router = useRouter()
  const setFormOpen = useSetRecoilState(SavingsFormOpenState)

  const utils = apiReact.useUtils()
  const addNewSavings = apiReact.transactions.addNewSavings.useMutation(
    {
      onSuccess: (data, variables) => {
        utils.transactions.invalidate()
      },
      onError: (error) => {
        router.replace("/login")
      }
    }
  )
  const formSchema = AddSavingsSchema
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      amount: undefined,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // apiReact.transactions.addnew.usemutation().mutate(values)
    addNewSavings.mutate({ ...values, color })
    form.reset({ amount: 0 })
    setFormOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-center ">
        <div className="flex justify-around">
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel >Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Salary">Salary</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage categories in your{" "}
                    <Link href="./categories">categories</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Money</FormLabel>
                  <FormControl>
                    <Input className="" {...field} placeholder="Enter Money" type="number" min={0} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
        <Button type="submit">Submdljit</Button>
      </form>
    </Form >
  )
}
