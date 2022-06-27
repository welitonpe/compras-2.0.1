import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AppContextProvider } from "./Context/Appcontext";
import { MantineProvider, Text } from "@mantine/core";
import { theme } from "./theme";
import AppRouter from "./AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <AppContextProvider>
        <AppRouter />
      </AppContextProvider>
    </MantineProvider>
  </StrictMode>
);
