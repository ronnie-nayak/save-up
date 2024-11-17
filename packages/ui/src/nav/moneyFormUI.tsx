"use client";

import Link from "next/link";
import { useRecoilState } from "recoil";

import { CategoriesListState } from "@acme/atoms";
import {
  Button,
  DialogClose,
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

export function MoneyFormUI({ form, onSubmit }: { form: any; onSubmit: any }) {
  const [categories, setCategories] = useRecoilState(CategoriesListState);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-center "
      >
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
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center gap-2 text-base">
                  Income{" "}
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                </FormLabel>
                <FormLabel className="flex items-center gap-2 text-base">
                  Expense{" "}
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                </FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value === "income"}
                  onCheckedChange={() => {
                    field.onChange(
                      field.value === "income" ? "expense" : "income",
                    );
                  }}
                />
              </FormControl>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
