// src/components/OTWidget.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { trackReservationStarted } from "../lib/openaiPixel";

// Context so we can trigger modal from anywhere
const OTContext = createContext();

export function OTProvider({ children }) {
    const [showWidget, setShowWidget] = useState(false);

    const openReservationWidget = () => {
        try {
            trackReservationStarted();
        } catch (error) {
            console.warn("[OpenAI Pixel] Reservation tracking failed:", error);
        }

        setShowWidget(true);
    };

    // rest unchanged...


    useEffect(() => {
        if (showWidget) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src =
                "//www.opentable.ca/widget/reservation/loader?rid=1285960&type=standard&theme=standard&color=8&dark=false&iframe=false&domain=ca&lang=en-CA&newtab=false&ot_source=Restaurant%20website&font=brandonText&ot_logo=subtle&primary_color=F4F1EC&primary_font_color=333333&button_color=D14965&button_font_color=ffffff&logo_pid=67810035&cfe=true";
            script.async = true;

            const container = document.getElementById("opentable-widget");
            if (container) {
                container.innerHTML = ""; // clear previous
                container.appendChild(script);
            }
        }
    }, [showWidget]);

    return (
        <OTContext.Provider value={{ setShowWidget, openReservationWidget }}>
            {children}

            {showWidget && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={() => setShowWidget(false)}
                >
                    {/* Modal frame — intentionally kept light: it wraps the light OpenTable
                        iframe (themed primary_color=F4F1EC), which can't be restyled from CSS.
                        A dark frame around a light widget reads worse (G-12). */}
                    <div
                        className="relative bg-[#F9F6F1] rounded-xl shadow-2xl p-6 w-[60%] md:w-[20%] lg:w-[30%] xl:w-[18%] max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-black text-2xl z-10 hover:text-[#EB4660]"
                            onClick={() => setShowWidget(false)}
                        >
                            ×
                        </button>

                        {/* Scroll-safe container */}
                        <div className="overflow-y-auto pt-6">
                            <div id="opentable-widget" className="w-full flex justify-center"></div>
                        </div>
                    </div>
                </div>
            )}
        </OTContext.Provider>
    );
}

// Custom hook to use in any component
export function useOTWidget() {
    return useContext(OTContext);
}
