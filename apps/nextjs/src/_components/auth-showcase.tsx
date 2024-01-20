import { auth, signIn, signOut } from "@acme/auth";
import { Button } from "@acme/ui";

export async function AuthShowcase() {
  const session = await auth();

  if (session)
    return (
      <div>
        Loading
      </div>
    );

  return (

    <div className="relative">
      <div className="h-screen w-screen grid place-items-center" style={{
        background: "url('/login/preview.png') center no-repeat",
        backgroundSize: "cover",
        filter: "blur(4px)",
      }} >
      </div >
      <form className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2/6 w-2/6 rounded-3xl bg-white p-8 flex flex-col gap-4"
        style={{
          borderRadius: "50px",
          boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)"
        }}
      >

        <div className="flex gap-2 justify-center items-center">
          <button
            key="Google"
            className="loginbutton"
            formAction={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <img src="/login/google.svg" className="h-12" />
            <h2>Google</h2>
          </button>

          <button
            key="Github"
            className="loginbutton"
            formAction={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <img src="/login/github.svg" className="h-12" />
            <h2>Github</h2>
          </button>
        </div>
        <Button
          className="text-[1.75vw] font-bold w-2/3 h-1/3 m-auto"
          formAction={async () => {
            "use server";
            await signIn('credentials');
          }}
        >Guest User</Button>
      </form>

    </div >
  );

}
