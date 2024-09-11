import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SSO1",
  description: "the second domain of SSO1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://js.pusher.com/8.2.0/pusher.min.js" />
        <Script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js" />
        {/* npm install @pusher/push-notifications-web */}
      </head>
        <body className={inter.className}>
          {children}
          {/* <NextScript /> */}
        </body>
      </html>
  );
}
