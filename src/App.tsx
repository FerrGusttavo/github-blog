import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { PostPage } from "./pages/post";
import { Page404 } from "./pages/page-404";
import { Layout } from "./layouts/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/post/:id",
    element: (
      <Layout>
        <PostPage />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
