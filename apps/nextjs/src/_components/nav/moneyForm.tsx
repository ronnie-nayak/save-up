"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AddMoneySchema } from "@acme/validators"

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
import { apiReact } from "~/trpc/react"
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from "recoil"
import { formOpenState } from "@acme/atoms"

const formSchema = AddMoneySchema

export function MoneyForm() {
  const router = useRouter()
  const setFormOpen = useSetRecoilState(formOpenState)
  const addNew = apiReact.transactions.addNew.useMutation(
    {
      onError: (error) => {
        router.push("/login")
      }
    }
  )
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      type: "income",
      amount: undefined,
      bankAccount: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // apiReact.transactions.addnew.usemutation().mutate(values)
    console.log(values)
    addNew.mutate(values)
    form.reset({ amount: 0 })
    setFormOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-center">
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
            <FormItem className="text-gray-500">
              <FormLabel className="text-black">Category</FormLabel>
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
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base flex items-center gap-2">
                  Income <div className="h-4 w-4 rounded-full bg-green-500"></div>
                </FormLabel>
                <FormLabel className="text-base flex items-center gap-2">
                  Expense <div className="h-4 w-4 rounded-full bg-red-500"></div>
                </FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value === "income"}
                  onCheckedChange={() => { field.onChange(field.value === "income" ? "expense" : "income") }}
                />
              </FormControl>
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
                <Input className="text-gray-500" {...field} placeholder="Enter Money" type="number" value={field.value} min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankAccount"
          render={({ field }) => (
            <FormItem >
              <FormLabel >Bank Account</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="text-gray-500">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a account to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="HDFC">HDFC</SelectItem>
                  <SelectItem value="ICICI">ICICI</SelectItem>
                  <SelectItem value="Bank of India">Bank of India</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage accounts in your{" "}
                <Link href="./categories">categories</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form >
  )
}
