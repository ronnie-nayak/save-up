
import { AppPage } from "~/_components/nav";


export default async function HomePage() {
  // You don't need to fetch these here, just showing different usages
  // If you don't want the Suspense loading state, you could pass these
  // posts as props as use as initialData in the query.
  return (
    <AppPage />
  );
}
