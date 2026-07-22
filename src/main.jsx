import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { OTProvider } from "./components/OTwidget.jsx";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* OTProvider mounted ONCE here (de-dup; previously also in App.jsx — G-4.4) */}
        <OTProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </OTProvider>
    </StrictMode>
);
