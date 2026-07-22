// src/components/SpacesCarousel.jsx
import { useState } from "react";

export default function SpacesCarousel({ images }) {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % images.length);

    return (
        <div className="w-full flex flex-col items-center">
            {/* Image (click to go to next) */}
            <div
                className="relative w-full aspect-[15/10] overflow-hidden cursor-pointer"
                onClick={next}
            >
                <img
                    src={images[current]}
                    alt={`Slide ${current + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                />
            </div>

            {/* Pagination dots below image */}
            <div className="mt-4 flex justify-center gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full ${
                            idx === current ? "bg-black" : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
