
import { AuthShowcase } from "~/_components/auth-showcase";
import { AppPage } from "~/_components/nav";


export default async function HomePage() {
  // You don't need to fetch these here, just showing different usages
  // If you don't want the Suspense loading state, you could pass these
  // posts as props as use as initialData in the query.
  return (
    <main className="overflow-scroll w-full dark">

      <div className="flex justify-between m-8">
        <h1 className="text-xl font-bold">Hello Rony!</h1>
        <AuthShowcase />
      </div>
      <AppPage />
    </main >
  );
}
