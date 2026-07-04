import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Who it's for", href: "#who-its-for" },
    { name: "Verification", href: "#ledger" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 h-20 border-b border-border-main flex items-center ${
        scrolled ? "bg-bg-base/90 backdrop-blur-[12px]" : "bg-bg-base"
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="#" aria-label="CredChain home" className="flex items-center">
          <Logo wordmarkSize="md" />
        </a>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[14px] font-sans text-txt-secondary hover:text-txt-primary transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: CTAs + Theme toggle */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => navigate("/login")}
            className="text-[14px] font-sans text-txt-secondary hover:text-txt-primary transition-colors duration-200 cursor-pointer px-2"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/role")}
            className="bg-brand-purple hover:bg-brand-purple-dim text-white rounded-md px-5 py-2.5 font-semibold text-sm transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="text-txt-secondary hover:text-txt-primary focus:outline-none p-1.5 rounded-md cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-bg-base border-b border-border-main px-6 py-6 flex flex-col gap-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[14px] font-sans text-txt-secondary hover:text-txt-primary py-1 border-b border-border-subtle"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="w-full text-center text-[14px] font-sans text-txt-secondary hover:text-txt-primary py-2.5 rounded-md border border-border-main transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/role");
              }}
              className="w-full text-center bg-brand-purple hover:bg-brand-purple-dim text-white rounded-md py-2.5 font-semibold text-sm transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
