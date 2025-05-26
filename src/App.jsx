import { Button } from "@/components/ui/button";
import StatusBadge from "./components/StatusBadge";
import MyCard from "./components/MyCard";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./pages/Details";
import MainLayout from "./layouts/MainLayout";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:id",
          element: <Details />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
