import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { Summary } from "./Summary";
import '../public/page.css'


export function Page() {
  return(
    <>
    <Header />
    <Summary />
    <Dashboard />
    </>
  )
}