import "./go2-sections.css";

export default function HighContrastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="eb-page--high-contrast">{children}</div>;
}
