import { signIn } from "@acme/auth";
import { Button, Loading } from "@acme/ui";

export async function AuthShowcase() {
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
        className="absolute left-1/2 top-1/2 flex h-2/6 -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white  p-8 sm:w-2/6"
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
        {
          <div className="flex h-full w-full flex-col justify-center">
            <div className="flex h-4/6 items-center justify-center gap-2">
              <button
                key="Github"
                className="flex h-3/4 w-5/12 items-center justify-center rounded border border-black px-4 py-4 font-bold text-black sm:text-[1.5vw]"
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
                className="flex h-3/4 w-5/12 items-center justify-center rounded border border-black px-4 py-4 font-bold text-black sm:text-[1.5vw]"
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
            <div className="flex h-full flex-col items-center justify-around">
              <Button
                className="h-[16vw] w-3/4 font-bold sm:h-[5vw] sm:text-[1.75vw]"
                formAction={async () => {
                  "use server";
                  await signIn("credentials", {
                    callbackUrl: "/homepage",
                  });
                }}
              >
                Guest User
              </Button>

              <h2 className=" mx-auto my-5 w-max text-[4vw] font-bold sm:text-[1.5vw]">
                Kindly wait 5-10 sec for Login to complete
              </h2>
            </div>
          </div>
        }
      </form>
    </div>
  );
}
