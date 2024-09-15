import './styles/overload-styles.scss';
import StyledComponentsRegistry from '../lib/registry';
import { Barlow } from 'next/font/google';
import globals from "./styles/globals.module.scss";
import Header from '@/components/header';

const barlow = Barlow({
  subsets: ['latin'],
  variable: '--font-barlow',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const colorBackground = globals.colorBackground;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={barlow.variable}>
      <body style={{ backgroundColor: colorBackground }}>
        <StyledComponentsRegistry>
          <div style={{ maxWidth: '100vw', overflow: 'hidden' }}>
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
