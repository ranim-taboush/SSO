import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SSO1",
  description: "the second domain of SSO1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>
        <script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
        {/* npm install @pusher/push-notifications-web */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
