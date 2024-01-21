"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import * as z from "zod";

import { FormOpenState } from "@acme/atoms";
import { MoneyFormUI } from "@acme/ui";
import { AddMoneySchema } from "@acme/validators";

import { apiReact } from "~/trpc/react";

export function MoneyForm() {
  const setFormOpen = useSetRecoilState(FormOpenState);
  // const addNew = await apiServer.transactions.addNew()
  const utils = apiReact.useUtils();
  const addNew = apiReact.transactions.addNew.useMutation({
    onSuccess: (data, variables) => {
      utils.transactions.invalidate();
    },
    onError: (error) => {
      utils.transactions.sessionExists.invalidate();
    },
  });
  const formSchema = AddMoneySchema;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      type: "income",
      amount: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // apiReact.transactions.addnew.usemutation().mutate(values)
    addNew.mutate(values);
    form.reset({ amount: 0 });
    setFormOpen(false);
  }

  return <MoneyFormUI form={form} onSubmit={onSubmit} />;
}
