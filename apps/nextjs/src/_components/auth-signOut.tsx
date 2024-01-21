import { auth, signIn, signOut } from "@acme/auth";
import { Button, Loading } from "@acme/ui";

export async function AuthSignout() {
  const session = await auth();

  if (session)
    return (
      <>
        <form>
          <button
            className="flex items-center gap-2 rounded-3xl bg-white p-1 pr-2 font-bold "
            formAction={async () => {
              "use server";
              await signOut();
            }}
          >
            <img
              src={session?.user?.image ?? "/login/user.svg"}
              className="h-10 w-10 rounded-full"
            />
            <h2 className="text-black">Sign Out</h2>
          </button>
        </form>

        <h1 className="font-bold sm:text-[1.25vw]">
          Hello {session?.user?.name}!
        </h1>
      </>
    );
}
