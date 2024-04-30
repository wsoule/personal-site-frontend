import { useSignal } from '@preact/signals';
import Counter from '../islands/Counter.tsx';
import IconExternalLink from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/external-link.tsx';

export default function Home() {
  const count = useSignal(3);
  return (
    <div class='px-4 py-8 mx-auto bg-[#86efac]'>
      <div class='max-w-screen-md mx-auto flex flex-col items-center justify-center'>
        <img
          class='my-6'
          src='/logo.svg'
          width='128'
          height='128'
          alt='the Fresh logo: a sliced lemon dripping with juice'
        />
        <h1 class='text-4xl font-bold'>Wyat Soule</h1>
        <p class='my-4 flex'>
          Built with&nbsp;
          <a
            class={'flex text-blue-500'}
            href={'https://fresh.deno.dev/'}
            target={'_blank'}
          >
            Fresh<IconExternalLink class='w-5 h-5' />
          </a>, by&nbsp;
          <a
            class={'flex text-blue-500'}
            href={'https://deno.com/'}
            target={'_blank'}
          >
            Deno<IconExternalLink class='w-5 h-5' />
          </a>
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}
