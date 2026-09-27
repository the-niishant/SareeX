"use client";

import { useCommerce } from "@/components/CommerceProvider";
import { ArrowUpRight, Camera } from "lucide-react";

const footerLinks = {
  Shop: ["All sarees", "New arrivals", "Wedding & bridal", "Gift cards"],
  Help: ["Contact us", "Size guide", "Shipping & returns", "Care guide"],
  About: ["Our story", "The craft", "Journal", "Visit the atelier"],
};

export function SiteFooter() {
  const { openSizeGuide, notify } = useCommerce();

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-wordmark" aria-hidden="true">AURELIA</div>
      <div className="footer-top" data-silk-group>
        <div className="footer-intro">
          <p className="eyebrow" data-silk-item>A note from the atelier</p>
          <h2 data-silk-item>Letters from a life in silk.</h2>
          <p data-silk-item>New collections, craft stories, and a little beauty for your inbox.</p>
        </div>
        <form
          className="newsletter-form"
          data-silk-item
          onSubmit={(event) => {
            event.preventDefault();
            notify("Newsletter sign-up is not connected yet.");
          }}
        >
          <label htmlFor="newsletter-email">Your email address</label>
          <div className="newsletter-field">
            <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            <button type="submit" aria-label="Subscribe to the AURELIA newsletter">
              <ArrowUpRight aria-hidden="true" size={18} />
            </button>
          </div>
          <p>Newsletter sign-up is being prepared. Your address is not stored yet.</p>
        </form>
      </div>

      <div className="footer-rule" />
      <div className="footer-links">
        <a className="footer-brand" href="#top">AURELIA <span>SAREES</span></a>
        {Object.entries(footerLinks).map(([title, links]) => (
          <nav key={title} aria-label={`${title} links`}>
            <h3>{title}</h3>
            {links.map((link) => link === "Size guide" ? (
              <button className="footer-link-button" key={link} type="button" onClick={openSizeGuide}>
                {link}
              </button>
            ) : (
              <a key={link} href="#arrivals">{link}</a>
            ))}
          </nav>
        ))}
        <div className="footer-connect">
          <h3>Stay in touch</h3>
          <a href="https://www.instagram.com/" aria-label="AURELIA on Instagram"><Camera aria-hidden="true" size={16} /> Instagram</a>
          <a href="https://wa.me/" aria-label="Contact AURELIA on WhatsApp">WhatsApp <ArrowUpRight aria-hidden="true" size={14} /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 AURELIA SAREES</span>
        <span>UPI · Visa · Mastercard · Razorpay</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
