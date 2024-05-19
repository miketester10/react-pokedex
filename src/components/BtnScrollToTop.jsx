import { useState, useEffect } from "react";
import "./BtnScrollToTop.css"; // Assicurati di creare questo file

const BtnScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    if (scrollTop / windowHeight > 0.008) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`scroll-to-top-btn ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <div className="scroll"></div>
    </button>
  );
};

export default BtnScrollToTop;
