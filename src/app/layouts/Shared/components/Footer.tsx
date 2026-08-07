import { Link } from "react-router-dom";
import "../styles/Footer.css";

const footerNavigation = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/home" },
      { label: "Plans", to: "/home#plans" },
      { label: "Our customers", to: "/home#customers" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Create account", to: "/registration" },
      { label: "Sign in", to: "/login" },
      { label: "Verify email", to: "/verify-email" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer-glow app-footer-glow-left" aria-hidden="true" />
      <div className="app-footer-glow app-footer-glow-right" aria-hidden="true" />

      <div className="app-footer-container">
        <div className="app-footer-main">
          <div className="app-footer-brand">
            <Link className="app-footer-logo" to="/home" aria-label="Subscribly home">
              <span className="app-footer-logo-mark" aria-hidden="true">
                <i className="pi pi-bolt" />
              </span>
              <span>Subscribly</span>
            </Link>
            <p>Simple subscriptions, clear choices, and room for your business to grow.</p>

            <div className="app-footer-promise">
              <i className="pi pi-shield" aria-hidden="true" />
              <span>Secure by design</span>
              <span className="app-footer-dot" aria-hidden="true" />
              <span>Flexible by default</span>
            </div>
          </div>

          <nav className="app-footer-navigation" aria-label="Footer navigation">
            {footerNavigation.map((group) => (
              <div className="app-footer-link-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="app-footer-bottom">
          <p>© {new Date().getFullYear()} Subscribly. All rights reserved.</p>
          <p className="app-footer-made-with">
            Made for growing teams
            <span aria-hidden="true">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
