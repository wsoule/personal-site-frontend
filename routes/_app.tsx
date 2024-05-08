import { type PageProps } from '$fresh/server.ts';
import Header from '../components/Header.tsx';
import { getEnvVar } from '../utils/functions.ts';
export default function App({ Component, url }: PageProps) {
  const appendedUrl = url.href.replace(getEnvVar('URL'), '/');
  console.log('appended url = ', appendedUrl);
  console.log('url href = ', url.href);
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Wyat Soule</title>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
        <Header active={appendedUrl} />
        <Component />
      </body>
    </html>
  );
}
