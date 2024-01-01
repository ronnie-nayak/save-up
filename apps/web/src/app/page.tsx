'use client'
import { Bills, Chart, Hero, Savings, Stats } from "@repo/ui/src";

export default function Page(): JSX.Element {
  return (
    <main className="dark">
      <h1 className="m-8 text-xl font-bold">Hello Ron!</h1>

      <Hero />
      <Chart />
      <Savings />
      <Bills />
      <Stats />
    </main>
  );
}
