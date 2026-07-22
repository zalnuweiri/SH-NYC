export function trackReservationStarted() {
    if (typeof window === "undefined") return;

    if (typeof window.oaiq !== "function") {
        console.warn(
            "[OpenAI Pixel] oaiq is not available. Check that the Pixel base script is installed in index.html."
        );
        return;
    }

    window.oaiq("measure", "checkout_started", {
        type: "contents",
    });
}