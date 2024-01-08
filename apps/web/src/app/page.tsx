'use client'
import { Bills, Chart, Hero, Savings, Stats } from "@acme/ui";



export default async function HomePage() {
  // You don't need to fetch these here, just showing different usages
  // If you don't want the Suspense loading state, you could pass these
  // posts as props as use as initialData in the query.

  return (
    <main className="">
      <h1 className="m-8 text-xl font-bold">Hello Ron!</h1>
      <Hero />
      <Chart />
      <Savings />
      <Bills />
      <Stats />
    </main >
  );
}
