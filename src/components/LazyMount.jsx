import { useEffect, useRef, useState } from "react";

export default function LazyMount({
                                      children,
                                      fallback = null,
                                      rootMargin = "600px 0px",
                                  }) {
    const containerRef = useRef(null);
    const [shouldMount, setShouldMount] = useState(false);

    useEffect(() => {
        if (shouldMount) return undefined;

        const element = containerRef.current;

        if (!element) return undefined;

        if (!("IntersectionObserver" in window)) {
            setShouldMount(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldMount(true);
                    observer.disconnect();
                }
            },
            { rootMargin },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [rootMargin, shouldMount]);

    return (
        <div ref={containerRef}>
            {shouldMount ? children : fallback}
        </div>
    );
}