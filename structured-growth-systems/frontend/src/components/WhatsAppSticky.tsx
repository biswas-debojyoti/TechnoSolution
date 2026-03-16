import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppSticky = () => {
  const phone = "918383997723";
  const message = "Hi, I want to Connect with you";

  const handleClick = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };


  return (
    <button
      onClick={handleClick}
      className="
      fixed 
      right-4 
      bottom-50 
      md:bottom-auto 
      md:top-1/2 
      md:-translate-y-1/2
      bg-green-500 
      hover:bg-green-600 
      text-white 
      p-4 
      rounded-full 
      shadow-lg 
      z-50
      transition
      "
    >
      <FaWhatsapp size={28} />
    </button>
  );
};

export default WhatsAppSticky;