import { Outlet } from "react-router-dom";
import { Breadcrumb } from "../breadcrumb.component/breadcrum";
import { Header } from "../header.component/header";
import { MainMenue } from "../menu.component/MainMenue";

export const Home = () => {


  return (

    <div>
      <Breadcrumb items={['Home']} />
      <Header />
      <main className="flex flex-1 p-0 gap-3 items-start">
        <MainMenue />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </main>
    </div>


  );
}