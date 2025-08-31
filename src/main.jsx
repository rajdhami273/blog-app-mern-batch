import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// redux store
import { store, persistor } from "./redux-app/store.js";

// routes
import { routes } from "./routes/routes.jsx";

// css
import "./index.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={"Loading..."} persistor={persistor}>
        {routes}
      </PersistGate>
    </Provider>
  </StrictMode>
);
