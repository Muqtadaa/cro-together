import { useState } from "react";
import { Link, useLocation } from "react-router";
import blackLogo from "../../assets/logo.png";
import { serif, sans } from "../../lib/typography";

export function Nav() {
  const location = useLocation();
  const path = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Proof", href: "/proof" },
    { label: "Tools", href: "/tools" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-[rgba(0,0,0,0.06)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setMobileOpen(false)}>
          <img src={blackLogo} alt="CRO Together logo" style={{ height: "28px", width: "28px", objectFit: "contain", mixBlendMode: "multiply" }} />
          <span
            className="text-navy"
            style={{ fontFamily: serif, fontWeight: 600, fontSize: "18px" }}
          >
            CRO Together
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = path === link.href || (path.startsWith(link.href) && link.href !== "/");
            return (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link relative pb-0.5 transition-colors"
                style={{
                  fontFamily: sans,
                  fontWeight: 300,
                  fontSize: "14px",
                  color: isActive ? "var(--navy)" : "var(--text-body)",
                  letterSpacing: "0.01em",
                }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-navy" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <Link
          to="/contact"
          className="hidden md:flex items-center px-5 py-2.5 bg-navy text-white transition-opacity hover:opacity-90"
          style={{ fontFamily: sans, fontWeight: 300, fontSize: "14px", letterSpacing: "0.02em" }}
        >
          Contact Me
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <>
              <span className="w-6 h-px bg-navy block rotate-45 translate-y-[5px]" />
              <span className="w-6 h-px bg-navy block -rotate-45" />
            </>
          ) : (
            <>
              <span className="w-6 h-px bg-navy block" />
              <span className="w-6 h-px bg-navy block" />
              <span className="w-6 h-px bg-navy block" />
            </>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-[rgba(0,0,0,0.06)] px-4 sm:px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = path === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: sans,
                  fontWeight: 300,
                  fontSize: "16px",
                  color: isActive ? "var(--navy)" : "var(--text-body)",
                  textDecoration: isActive ? "underline" : "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 text-center py-3 bg-navy text-white"
            style={{ fontFamily: sans, fontWeight: 300, fontSize: "14px" }}
          >
            Contact Me
          </Link>
        </div>
      )}
    </nav>
  );
}