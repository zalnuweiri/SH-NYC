// src/pages/ExternalRedirect.jsx
import { useEffect } from "react";

export default function ExternalRedirect({ to, replace = true }) {
    useEffect(() => {
        if (replace) {
            window.location.replace(to); // no history entry
        } else {
            window.location.href = to;   // keep history entry
        }
    }, [to, replace]);

    return null; // nothing to render
}
