import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const phoneNumber = "994707103343"; // +994 ilə yazılır
    const message = "Salam, məlumat almaq istəyirəm";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
      fixed bottom-6 right-6 z-50
      flex items-center justify-center
      w-14 h-14
      rounded-full
      bg-green-500 text-white
      shadow-lg
      transition-all duration-300
      hover:scale-110 hover:bg-green-600
      animate-bounce
      "
        >
            <FaWhatsapp size={28} />
        </a>
    );
}