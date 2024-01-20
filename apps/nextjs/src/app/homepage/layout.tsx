import { Sidebar } from "@acme/ui";
import { AuthSignout } from "~/_components/auth-signOut";
import { MoneyForm } from "~/_components/nav";
import Checker from "./checker";

export default function HomepageLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex text-white bg-[#121e2c] font-bold w-full h-screen">
      <Checker>
        <Sidebar addMoney={<MoneyForm />} />
        <div className="overflow-scroll w-full dark">
          <div className="flex m-8 gap-4 items-center">
            <AuthSignout />
          </div>
          {props.children}
        </div>
      </Checker>
    </div>
  );
}

