import { type PageProps } from '$fresh/server.ts';
import Header from '@/components/Header.tsx';
import { Partial } from '$fresh/runtime.ts';
export default function App({ Component, route }: PageProps) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Wyat Soule</title>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body f-client-nav>
        <Partial name='body'>
          <Header active={route} />
          <Component />
        </Partial>
      </body>
    </html>
  );
}
