import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const progress = (scrollTop / height) * 100;

            setScrollProgress(progress);

            if (scrollTop > 250) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                }`}
        >
            <div
                onClick={scrollToTop}
                className="relative flex items-center justify-center h-14 w-14 cursor-pointer rounded-full 
        bg-gradient-to-br from-blue-500 to-blue-700 
        shadow-xl backdrop-blur-md 
        hover:scale-110 hover:shadow-blue-500/40
        transition-all duration-300"
            >
                {/* progress ring */}
                <svg
                    className="absolute inset-0 h-full w-full rotate-[-90deg]"
                    viewBox="0 0 100 100"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="6"
                        stroke="rgba(255,255,255,0.2)"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="6"
                        stroke="white"
                        fill="none"
                        strokeDasharray="282"
                        strokeDashoffset={282 - (scrollProgress / 100) * 282}
                        strokeLinecap="round"
                    />
                </svg>

                {/* icon */}
                <ArrowUp size={22} className="relative text-white" />
            </div>
        </div>
    );
}