// src/components/SEO.jsx

export default function SEO({
                                title,
                                description,
                                jsonLd,
                                url,
                                index = true,
                                preloads = [],
                            }) {
    return (
        <>
            <title>{title}</title>

            {description && (
                <meta name="description" content={description} />
            )}

            {url && (
                <link rel="canonical" href={url} />
            )}

            <meta
                name="robots"
                content={index ? "index, follow" : "noindex, nofollow"}
            />

            {preloads.map((preload) => (
                <link
                    key={`${preload.href}-${preload.media ?? "all"}`}
                    rel="preload"
                    as="image"
                    href={preload.href}
                    type={preload.type}
                    media={preload.media}
                    imageSrcSet={preload.imageSrcSet}
                    imageSizes={preload.imageSizes}
                    fetchPriority={preload.fetchPriority ?? "high"}
                />
            ))}

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </>
    );
}