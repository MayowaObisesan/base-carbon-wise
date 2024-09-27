import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import { App } from "./App";
import { config } from "./wagmi";
import WastewiseProvider from "./context";
// import "./satoshi.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WastewiseProvider>
          <App />
        </WastewiseProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
