import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Create from "./pages/Create";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/edit/:id",
      element: <Edit />
    },
    {
      path: "/create",
      element: <Create />
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
