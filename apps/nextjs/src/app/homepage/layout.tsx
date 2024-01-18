import { Sidebar } from "@acme/ui";
export default function HomepageLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex text-white bg-[#121e2c] font-bold w-full h-screen">
      <Sidebar />
      {props.children}
    </div>
  );
}
