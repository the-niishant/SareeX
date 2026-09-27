export function ZariParticles() {
  return (
    <div className="zari-particles" aria-hidden="true" data-zari-particles>
      {Array.from({ length: 40 }, (_, index) => (
        <span
          className="zari-particle"
          key={index}
          style={{
            left: `${(index * 37 + 11) % 97}%`,
            top: `${(index * 53 + 7) % 95}%`,
          }}
        />
      ))}
    </div>
  );
}
