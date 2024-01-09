import { BillsUI, GraphUI, HeroUI, SavingsUI, StatsUI } from "@acme/ui";
import { dataGraph } from "../dashboard/data";
export function AppPage() {
  return (
    <div className="dark">
      <HeroUI />
      <GraphUI data={dataGraph} />
      <SavingsUI />
      <BillsUI />
      <StatsUI data={dataGraph} />
    </div>
  );
}
