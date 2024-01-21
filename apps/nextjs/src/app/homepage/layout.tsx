import SlidingSidebar from "node_modules/@acme/ui/src/nav/slidingSidebar";

import { Sidebar } from "@acme/ui";

import { AuthSignout } from "~/_components/auth-signOut";
import { MoneyForm } from "~/_components/nav";
import Checker from "./checker";

export default function HomepageLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#121e2c] font-bold text-white">
      <Checker>
        <div className="hidden w-3/12 sm:block">
          <Sidebar addMoney={<MoneyForm />} />
        </div>

        <div className="dark w-full overflow-scroll">
          <div className="m-8 flex items-center gap-4">
            <div className="sm:hidden">
              <SlidingSidebar>
                <MoneyForm />
              </SlidingSidebar>
            </div>
            <AuthSignout />
          </div>
          {props.children}
        </div>
      </Checker>
    </div>
  );
}
