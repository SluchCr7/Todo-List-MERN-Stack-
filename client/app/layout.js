import "./globals.css";
import { UserContextProvider } from "./Context/UserContext";
import { NoteContextProvider } from "./Context/NoteContext";
import { AlertContextProvider } from "./Context/AlertContext";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata = {
  title: "TaskFlow | Premium Task Management",
  description: "Experience the next evolution of task management. Organized, elegant, and efficient.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#0a0a0f] text-white selection:bg-purple-500/30 selection:text-white">
        <AlertContextProvider>
          <UserContextProvider>
            <NoteContextProvider>
              {children}
            </NoteContextProvider>
          </UserContextProvider>
        </AlertContextProvider>
      </body>
    </html>
  );
}
