
import { auth, signIn, signOut } from "@acme/auth";
import { Button } from "@acme/ui";

export async function AuthSignout() {
  const session = await auth();

  if (session)
    return (
      <>
        <form>
          <button className="bg-white rounded-3xl flex gap-2 items-center p-1 font-bold pr-2 "
            formAction={async () => {
              "use server";
              await signOut();
            }}
          >
            <img src={session?.user?.image ?? ""} className="w-10 h-10 rounded-full" />
            <h2 className="text-black">Sign Out</h2>
          </button>
        </form>

        <h1 className="text-[1.25vw] font-bold">Hello {session?.user?.name}!</h1>
      </>
    );

  return (
    <div>Loading</div>
  );
}
