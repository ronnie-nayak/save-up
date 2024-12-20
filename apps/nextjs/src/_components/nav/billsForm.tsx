"use client";

import type * as z from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";

import { BillsFormOpenState, CategoriesListState } from "@acme/atoms";
import {
  Button,
  Calendar,
  cn,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@acme/ui";
import { AddBillsSchema } from "@acme/validators";

import { apiReact } from "~/trpc/react";

export function BillsForm() {
  const setFormOpen = useSetRecoilState(BillsFormOpenState);

  const [categories, setCategories] = useRecoilState(CategoriesListState);
  // const addNew = await apiServer.transactions.addNew()
  const utils = apiReact.useUtils();
  const addNewBills = apiReact.transactions.addNewBills.useMutation({
    onSuccess: (data, variables) => {
      utils.transactions.invalidate();
    },
    onError: (error) => {
      utils.transactions.sessionExists.invalidate();
    },
  });
  const formSchema = AddBillsSchema;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      amount: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // apiReact.transactions.addnew.usemutation().mutate(values)
    addNewBills.mutate(values);
    form.reset({ amount: 0 });
    try {
      fetch("/api/ses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          category: values.category,
          amount: values.amount,
          dueAt: values.dueAt,
        }),
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.ok) {
            console.log("mail sent");
          } else {
            console.log("not sent ???");
          }
        });
    } catch (error) {
      console.error(error);
    }

    setFormOpen(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-center "
      >
        <div className="flex justify-around">
          <div className="flex w-1/2 flex-col gap-6">
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
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Money</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      {...field}
                      placeholder="Enter Money"
                      type="number"
                      value={field.value}
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="dueAt"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      field.value.toDateString()
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date < new Date() || date > new Date("2100-01-01")
                  }
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
