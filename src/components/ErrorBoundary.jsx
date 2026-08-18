import { Component } from "react";

// Catches render/runtime errors in the routed page tree so a single failing
// component (e.g. a data fetch that throws) degrades to a small fallback panel
// instead of an uncaught throw that blanks the entire app. Keyed by pathname in
// Layout so navigating to another route clears a previously-caught error.
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("[ErrorBoundary] Caught a render error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 px-6 py-24 text-center text-sh-cream">
                        <p className="font-display font-bold uppercase text-[24px] tracking-[0.05em]">
                            Something went wrong
                        </p>
                        <p className="font-body text-sh-muted text-[16px] tracking-[0.05em]">
                            Please refresh the page and try again.
                        </p>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
