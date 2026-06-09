import CustomCursor from "./components/CustomCursor";
import "./globals.css";

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {
          <>
            {children}

            <CustomCursor />
          </>
        }
      </body>
    </html>
  );
}
