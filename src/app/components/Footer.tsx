import { Link } from "react-router";
import blackLogo from "../../assets/logo.png";
import { serif, sans } from "../../lib/typography";

export function Footer() {
  return (
    <footer className="bg-tan border-t border-[rgba(0,0,0,0.06)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src={blackLogo} alt="CRO Together logo" style={{ height: "24px", width: "24px", objectFit: "contain", mixBlendMode: "multiply" }} />
              <span
                className="text-navy"
                style={{ fontFamily: serif, fontWeight: 600, fontSize: "18px" }}
              >
                CRO Together
              </span>
            </div>
            <p
              className="text-slate leading-relaxed"
              style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px" }}
            >
              A boutique consultancy dedicated to the science of digital growth through experimentation and research.
            </p>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-4">
            <span
              className="text-navy uppercase tracking-widest"
              style={{ fontFamily: sans, fontWeight: 300, fontSize: "11px", letterSpacing: "1.2px" }}
            >
              Platform
            </span>
            <div className="flex flex-col gap-3">
              {[
                { label: "Services", href: "/services" },
                { label: "Proof", href: "/proof" },
                { label: "About", href: "/about" },
                { label: "Tools", href: "/tools" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="hover:text-text-dark transition-colors"
                  style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", color: "var(--slate)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal & Social */}
          <div className="flex flex-col gap-4">
            <span
              className="text-navy uppercase"
              style={{ fontFamily: sans, fontWeight: 300, fontSize: "11px", letterSpacing: "1.2px" }}
            >
              Legal &amp; Social
            </span>
            <div className="flex flex-col gap-3">
              <Link
                to="/privacy"
                className="hover:text-text-dark transition-colors"
                style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", color: "var(--slate)" }}
              >
                Privacy Policy
              </Link>
              <a
                href="https://www.linkedin.com/in/muqtadaa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-dark transition-colors"
                style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", color: "var(--slate)" }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(0,0,0,0.08)] flex flex-col items-center gap-2">
          <p
            className="text-text-muted text-center"
            style={{ fontFamily: sans, fontWeight: 200, fontSize: "13px" }}
          >
            © 2026 CRO Together. All rights reserved.
          </p>
          <p
            className="text-[rgba(67,97,124,0.45)] text-center"
            style={{ fontFamily: sans, fontWeight: 200, fontSize: "11px" }}
          >
            Icons made from{" "}
            <a
              href="https://www.onlinewebfonts.com/icon"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate transition-colors"
            >
              svg icons
            </a>{" "}
            licensed by{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate transition-colors"
            >
              CC BY 4.0
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
