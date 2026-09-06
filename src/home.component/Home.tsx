import { Outlet } from "react-router-dom";
import { Breadcrumb } from "../breadcrumb.component/breadcrum";
import { Header } from "../header.component/header";
import { MainMenue } from "../menu.component/MainMenue";

export const Home = () => {


  return (

    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <Breadcrumb items={['Home']} />
      <Header />
      <main className="flex min-h-0 min-w-0 flex-1 items-start gap-3 overflow-hidden p-0">
        <MainMenue />
        <div className="h-full min-h-0 min-w-0 flex-1 overflow-x-hidden">
          <div className="grid h-full min-h-0 min-w-full grid-cols-4 gap-3 p-1">
            <div className="min-w-0 overflow-y-auto" />
            <div className="col-span-2 h-full min-h-0 min-w-0 overflow-y-auto">
              <Outlet />
            </div>
            <div className="min-w-0 overflow-y-auto" />
          </div>
        </div>
      </main>
    </div>


  );
}