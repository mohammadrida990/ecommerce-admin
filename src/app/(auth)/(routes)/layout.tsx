export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <div className="flex items-center justify-center h-full">{children}</div>;
}
