import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 bg-light rounded-3 h-100">
        <img
          src="https://plus.unsplash.com/premium_photo-1680404114169-e254afa55a16?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
          alt="logo"
          className="w-100 h-100"
        />
      </div>
      <div className="d-flex flex-column justify-content-center w-50 h-100 p-4">
        <Outlet />
      </div>
    </div>
  );
}
