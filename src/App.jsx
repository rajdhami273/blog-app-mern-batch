import { Outlet } from "react-router";
// components
import { Button } from "./components/Button";
import { Header } from "./components/Header";

// styles
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="p-4 app-container">
        <Outlet />
      </div>
    </>
  );
}
export default App;
