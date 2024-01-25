import { auth, signIn, signOut } from "@acme/auth";
import { Button, Loading } from "@acme/ui";

export async function AuthShowcase() {
  const session = await auth();

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
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2/6 sm:w-2/6 rounded-3xl bg-white p-8  flex flex-col"
        style={{
          borderRadius: "50px",
          boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
        }}
      >
        {/* {!session ? ( */}
        {/*   <div className="h-full w-full rounded-3xl overflow-hidden"> */}
        {/*     <Loading /> */}
        {/*   </div> */}
        {/* ) : */}
        {(
          <div className="flex flex-col justify-center h-full w-full">
            <div className="flex items-center justify-center gap-2 h-4/6">
              <button
                key="Github"
                className="text-black font-bold py-4 px-4 h-3/4 rounded border border-black w-5/12 flex justify-center items-center sm:text-[1.5vw]"
                formAction={async () => {
                  "use server";
                  await signIn("github", {
                    callbackUrl: "/homepage",
                  });
                }}
              >
                <img src="/login/github.svg" className="h-16" />
                <h2>Github</h2>
              </button>

              <button
                key="Discord"
                className="text-black font-bold py-4 px-4 h-3/4 rounded border border-black w-5/12 flex justify-center items-center sm:text-[1.5vw]"
                formAction={async () => {
                  "use server";
                  await signIn("discord", {
                    callbackUrl: "/homepage",
                  });
                }}
              >
                <img src="/login/discord.png" className="h-16" />
                <h2>Discord</h2>
              </button>
            </div>
            <div className="h-full flex flex-col justify-around items-center">
              <Button
                className="w-3/4 h-[16vw] sm:h-[5vw] sm:text-[1.75vw] font-bold"
                formAction={async () => {
                  "use server";
                  await signIn("credentials", {
                    callbackUrl: "/homepage",
                  });
                }}
              >
                Guest User
              </Button>

              <h2 className=" w-max mx-auto my-5 text-[4vw] sm:text-[1.5vw] font-bold">Kindly wait 5-10 sec for Login to complete</h2>
            </div>
          </div>
        )
        }
      </form >
    </div >
  );
}
