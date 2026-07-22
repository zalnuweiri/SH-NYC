import { useState } from "react";
import ContactForm from "../components/ContactForm";

/*Successful, and became main code. Change name if you like but functionality is assured via emailJS. */
export default function FormTest() {
    const [showForm, setShowForm] = useState(false);

    return (
        <section>
            <button
                className="font-['NeueBit'] px-8 py-3 translate-y-[500px] border border-black text-black hover:bg-black hover:text-white"
                onClick={() => setShowForm(true)}
            >
                START PLANNING
            </button>

            {showForm && <ContactForm onClose={() => setShowForm(false)} />}
        </section>
    );
}
