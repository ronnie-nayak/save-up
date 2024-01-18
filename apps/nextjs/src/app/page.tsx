import { useRouter } from "next/";
import { sessionMine } from "~/_components/authProvider";


export default async function Page() {
  // You don't need to fetch these here, just showing different usages
  // If you don't want the Suspense loading state, you could pass these
  // posts as props as use as initialData in the query.
  console.log("<---------------------------------------------------------------------------->")
  console.log("<---------------------------------------------------------------------------->")
  console.log("<---------------------------------------------------------------------------->")
  console.log(sessionMine)
  // const router = useRouter()
  // if (session) {
  //   router.replace("/homepage")
  // }
  return (
    <main onClick={() => router.push("/login")} className="overflow-scroll w-full dark cursor-pointer">

      <div className="flex justify-between m-8">
        <h1 className="text-xl font-bold">Hello Rony!</h1>
      </div>
    </main >
  );
}
