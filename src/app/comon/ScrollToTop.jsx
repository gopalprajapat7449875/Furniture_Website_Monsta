"use client";

import { useEffect, useState } from "react";
import { FaChevronCircleUp, FaChevronUp } from "react-icons/fa";
import { MdOutlineDoubleArrow } from "react-icons/md";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisible);

        return () => {
            window.removeEventListener("scroll", toggleVisible);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {visible && (
                <button
                    onClick={scrollToTop}
                    className="
                            fixed
                            bottom-10
                            right-8
                            z-50
                            w-12
                            h-12
                            rounded-full
                            bg-[#8B5E3C]
                            text-white
                            shadow-lg
                            hover:scale-110
                            transition-all
                            duration-300
                             animate-pulse
                               "
                >
                    <MdOutlineDoubleArrow className=" transform rotate-[270deg] flex  justify-self-center animate-pulse"  size={25} />
                    
                </button>
            )}
        </>
    );
}