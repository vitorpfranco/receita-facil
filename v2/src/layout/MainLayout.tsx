import { Outlet } from "react-router-dom";
import style from "./style.module.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PrescriptionTypeModal from "../components/PrescriptionTypeModal/PrescriptionTypeModal";
import PrescriptionPrint from "../components/PrescriptionPrint";

const MainLayout: React.FC = () => {
  return (
    <>
      <PrescriptionTypeModal />
      <div className={`${style.container} hideOnPrint`}>
        <Sidebar></Sidebar>
        <div className={style.mainContainer}>
          <header className={`${style.header} hideOnPrint`}>
            <Navbar></Navbar>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <PrescriptionPrint></PrescriptionPrint>
    </>
  );
};

export default MainLayout;
