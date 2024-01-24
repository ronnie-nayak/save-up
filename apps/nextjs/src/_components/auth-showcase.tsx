import { auth, signIn, signOut } from "@acme/auth";
import { Button, Loading } from "@acme/ui";

export async function AuthShowcase() {
  const session = await auth();

  if (!session)
    return (
      <div className="relative">
        <div
          className="grid h-screen w-screen place-items-center"
          style={{
            background: "url('/login/preview.png') center no-repeat",
            backgroundSize: "cover",
            filter: "blur(4px)",
          }}
        ></div>
        <form
          className="absolute left-1/2 top-1/2 flex h-2/6 w-11/12 -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-4 rounded-3xl bg-white p-1 py-16 sm:w-2/6 sm:p-8"
          style={{
            borderRadius: "50px",
            boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <button
              key="Github"
              className="loginbutton"
              formAction={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <img src="/login/github.svg" className="h-16" />
              <h2>Github</h2>
            </button>

            <button
              key="Discord"
              className="loginbutton"
              formAction={async () => {
                "use server";
                await signIn("discord");
              }}
            >
              <img src="/login/discord.png" className="h-16" />
              <h2>Discord</h2>
            </button>
          </div>
          <Button
            className="m-auto h-20 w-2/3 text-[7vw] font-bold sm:text-[1.75vw]"
            formAction={async () => {
              "use server";
              await signIn("credentials");
            }}
          >
            Guest User
          </Button>
        </form>
      </div>
    );
}
