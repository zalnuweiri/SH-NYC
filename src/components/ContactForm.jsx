// src/components/ContactForm.jsx
import emailjs from "emailjs-com";
import { useState } from "react";
/* need to switch email to NORA@silenth.ca */
export default function ContactForm({ onClose }) {
    const [status, setStatus] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus("Sending...");

        emailjs
            .sendForm(
                "service_ukq7dnl",   // from EmailJS
                "template_d2dzthe",  // from EmailJS
                e.target,
                "ox0Oi8Y1w3KZi0b3P"  // EmailJS public key
            )
            .then(
                () => setStatus("Message sent!"),
                () => setStatus("Something went wrong, try again.")
            );
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
            {/* Modal window */}
            <div className="relative bg-sh-ink p-8 rounded-lg shadow-2xl w-full max-w-lg border border-sh-gold/40">

                {/* Close button (X in top right) */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl font-bold text-sh-cream hover:text-sh-pink focus:outline-none"
                >
                    ×
                </button>

                {/* Title */}
                <h2 className="font-display text-2xl md:text-3xl font-bold text-sh-cream mb-6">
                    Start Planning
                </h2>

                {/* Form */}
                <form onSubmit={sendEmail} className="space-y-4 font-body text-sh-cream">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="w-full bg-sh-black border border-sh-grey-700 text-sh-cream placeholder:text-sh-grey-500 px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-sh-pink"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="w-full bg-sh-black border border-sh-grey-700 text-sh-cream placeholder:text-sh-grey-500 px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-sh-pink"
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="w-full bg-sh-black border border-sh-grey-700 text-sh-cream placeholder:text-sh-grey-500 px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-sh-pink"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        required
                        rows="4"
                        className="w-full bg-sh-black border border-sh-grey-700 text-sh-cream placeholder:text-sh-grey-500 px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-sh-pink"
                    />

                    {/* Hidden timestamp field */}
                    <input
                        type="hidden"
                        name="time"
                        value={new Date().toLocaleString()}
                    />

                    {/* Buttons */}
                    <div className="flex justify-start items-center mt-6">
                        <button
                            type="submit"
                            className="font-body px-8 py-3 bg-sh-pink text-white text-[16px] md:text-[18px] tracking-[0.25em] hover:bg-sh-pink-hover transition font-bold"
                        >
                            SEND
                        </button>
                    </div>
                </form>

                {/* Status message */}
                {status && (
                    <p className="mt-4 text-sm font-body text-sh-cream opacity-70">
                        {status}
                    </p>
                )}
            </div>
        </div>
    );
}
