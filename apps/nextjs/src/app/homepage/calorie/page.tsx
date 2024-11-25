"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export default function calories() {
  const [predCalories, setPredCalories] = useState(null);

  // age=eval(input("Enter your age: "))
  // weight= eval(input("Enter your weight(in kgs): "))
  // height= eval(input("Enter your height(in cm): "))
  // duration=eval(input("Enter the duration(in minutes) for you want to predict the calories burned: "))
  // hr=eval(input("Enter your heart rate: "))
  // bt=eval(input("Enter your body temperature(in C): "))
  // g=(input("Enter your gender (m/f): "))
  const CalcCalorieSchema = z.object({
    age: z.coerce.number(),
    weight: z.coerce.number(),
    height: z.coerce.number(),
    duration: z.coerce.number(),
    hr: z.coerce.number(),
    bt: z.coerce.number(),
    g: z.string(),
  });
  const formSchema = CalcCalorieSchema;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      weight: undefined,
      height: undefined,
      duration: undefined,
      hr: undefined,
      bt: undefined,
      g: "m",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // apiReact.transactions.addnew.usemutation().mutate(values)
    // addNew.mutate(values);
    form.reset({
      age: 0,
      weight: 0,
      height: 0,
      duration: 0,
      hr: 0,
      bt: 0,
      g: "m",
    });
    //CORS
    fetch(
      "http://localhost:8001/yaya/" +
        values.age +
        "/" +
        values.weight +
        "/" +
        values.height +
        "/" +
        values.duration +
        "/" +
        values.hr +
        "/" +
        values.bt +
        "/" +
        values.g,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPredCalories(data);
      });
  }
  return (
    <>
      <h1 className="text-center text-3xl">Calories Burned Predictor</h1>
      {predCalories && (
        <h4 className="m-10 text-center text-3xl">
          The predicted calories burned are:
          <br /> {Math.abs(predCalories)} calories
        </h4>
      )}

      <div className="m-10 mx-44 rounded-lg bg-white p-10 text-black">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-8 text-center"
          >
            <div className="flex gap-10">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your age"
                          {...field}
                          type="number"
                          min={0}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your weight(in kgs)"
                          {...field}
                          type="number"
                          min={0}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your height(in cm)"
                          {...field}
                          type="number"
                          min={0}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the duration(in minutes) for you want to predict the calories burned"
                          {...field}
                          type="number"
                          min={0}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heart Rate</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your heart rate"
                          {...field}
                          type="number"
                          min={0}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body Temperature</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your body temperature(in C)"
                          {...field}
                          type="number"
                          min={0}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* gender checkbox */}
            <FormField
              control={form.control}
              name="g"
              render={({ field }) => (
                <FormItem className="mx-36 flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="flex items-center gap-2 text-base">
                      Male{" "}
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    </FormLabel>
                    <FormLabel className="flex items-center gap-2 text-base">
                      Female{" "}
                      <div className="h-4 w-4 rounded-full bg-red-500"></div>
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === "m"}
                      onCheckedChange={() => {
                        field.onChange(field.value === "m" ? "g" : "m");
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
