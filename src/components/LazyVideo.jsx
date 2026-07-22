import { useEffect, useRef, useState } from "react";

export default function LazyVideo({
                                      src,
                                      poster,
                                      className = "",
                                      style,
                                      ariaLabel,
                                  }) {
    const containerRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const element = containerRef.current;

        if (!element) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "300px 0px",
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0">
            <video
                aria-label={ariaLabel}
                src={shouldLoad ? src : undefined}
                poster={poster}
                autoPlay={shouldLoad}
                loop
                muted
                playsInline
                preload="none"
                className={className}
                style={style}
            />
        </div>
    );
}