import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Prescription from "../pages/Prescription";
import Library from "../pages/Library";
import Resources from "../pages/Resources";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Prescription />,
      },
      // {
      //   path: "sobre",
      //   element: <About />,
      // },
      {
        path: "biblioteca",
        element: <Library />,
      },
      {
        path: "materiais",
        element: <Resources />,
      },
      {
        path: "*", 
        element: <NotFound />,
      },
    ],
  },
]);
