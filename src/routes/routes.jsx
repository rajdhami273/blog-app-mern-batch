import { BrowserRouter, Routes, Route } from "react-router";

// components
import App from "../App";
import { BlogListing } from "../pages/blog/BlogListing";
import { BlogDetails } from "../pages/blog/BlogDetails";
import { EditCreateBlog } from "../pages/blog/EditCreateBlog";
import { ProtectedRoute } from "./ProtectedRoute";

// auth
import { AuthLayout } from "../pages/auth/AuthLayout";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";

export const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="auth" Component={AuthLayout}>
        <Route index Component={Login} />
        <Route path="login" Component={Login} />
        <Route path="register" Component={Register} />
      </Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      >
        <Route path="/" Component={BlogListing} />
        <Route path="/blog/:blogId" Component={BlogDetails} />
        <Route path="/create" Component={EditCreateBlog} />
        <Route path="/edit/:blogId" Component={EditCreateBlog} />
      </Route>
      <Route path="*" Component={Login} />
    </Routes>
  </BrowserRouter>
);
