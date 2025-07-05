import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// components
import App from "./App.jsx";

// redux store
import { store } from "./redux-app/store.js";

// routes
import { routes } from "./routes/routes.jsx";

// css
import "./index.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>{routes}</Provider>
  </StrictMode>
);
