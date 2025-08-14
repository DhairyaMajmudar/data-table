interface OverlayProps {
  children: React.ReactNode;
  className?: string;
}

export default function Overlay({ children, className }: OverlayProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 opacity-95" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-indigo-500/10 to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
