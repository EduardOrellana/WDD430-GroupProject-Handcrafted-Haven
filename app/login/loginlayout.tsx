export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    );
  }
  