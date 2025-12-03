import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import router from "./routes/index.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { AuthProvider } from "./provider/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ReduxProvider>
  </StrictMode>
);
