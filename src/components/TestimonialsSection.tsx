import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mira S.",
    detail: "Banarasi silk · Delhi",
    quote: "The colour, the weight, the way it falls. It felt like I had found the saree I had been looking for all along.",
    initials: "MS",
  },
  {
    name: "Naina R.",
    detail: "Kanjivaram silk · Bengaluru",
    quote: "My mother helped me choose it. We both knew the moment we opened the box that it would be part of our family for years.",
    initials: "NR",
  },
  {
    name: "Kavya P.",
    detail: "Chanderi silk · Mumbai",
    quote: "Light enough to wear all evening, and thoughtful in every detail. I received so many questions about the weave.",
    initials: "KP",
  },
];

export function TestimonialsSection() {
  return (
    <section className="testimonials-section section-wrap" aria-labelledby="testimonials-title">
      <div className="testimonial-topline" data-silk-group>
        <div>
          <p className="eyebrow" data-silk-item>Notes from our community</p>
          <h2 id="testimonials-title" data-silk-item>Loved by every silhouette.</h2>
        </div>
        <div className="rating-block" data-silk-item role="group" aria-label="Rated 4.9 out of 5 by more than 500 customers">
          <div className="rating-avatars" aria-hidden="true">
            <span>MS</span><span>NR</span><span>KP</span><span>+</span>
          </div>
          <div className="rating-stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}
          </div>
          <strong>4.9 / 5</strong>
          <span>500+ happy customers</span>
        </div>
      </div>
      <div className="testimonial-grid" data-silk-group>
        {testimonials.map((testimonial) => (
          <article className="testimonial-card" key={testimonial.name} data-silk-item>
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>{testimonial.quote}</blockquote>
            <div className="testimonial-person">
              <span className="avatar" aria-hidden="true">{testimonial.initials}</span>
              <span><strong>{testimonial.name}</strong><small>{testimonial.detail}</small></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
