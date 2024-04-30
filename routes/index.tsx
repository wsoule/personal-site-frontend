import { useSignal } from '@preact/signals';
import Counter from '../islands/Counter.tsx';
import IconExternalLink from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/external-link.tsx';
import { Handlers } from '$fresh/server.ts';
import { getCount, kv, setCount } from '../utils/db.ts';
import { useEffect } from 'preact/hooks';

export const handler: Handlers = {
  GET: async (req, ctx) => {
    const accept = req.headers.get('accept');
    // const url = new URL(req.url);

    if (accept === 'text/event-stream') {
      const stream = kv.watch([['count']]).getReader();
      const body = new ReadableStream({
        async start(controller) {
          console.log(
            `opened stream for counter, remote ${
              JSON.stringify(ctx.remoteAddr)
            }`,
          );
          while (true) {
            try {
              if ((await stream.read()).done) {
                return;
              }
              const data = await getCount();
              const chunk = `data: ${JSON.stringify(data)}\n\n`;
              controller.enqueue(new TextEncoder().encode(chunk));
            } catch (e) {
              console.error(`Error refreshing count.`);
            }
          }
        },
        cancel() {
          stream.cancel();
          console.log(
            `Closed stream for counter, remote ${
              JSON.stringify(ctx.remoteAddr)
            }`,
          );
        },
      });
      return new Response(body, {
        headers: {
          'content-type': 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
      });
    }

    const startTime = Date.now();
    const data = await getCount();
    const endTime = Date.now();
    const res = await ctx.render({ data, latency: endTime - startTime });
    res.headers.set('x-count-load-time', '' + (endTime - startTime));
    return res;
  },
  POST: async (req, ctx) => {
    const body = await req.json();
    await setCount(body.add === true);
    return Response.json({ ok: true }, {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
export default function Home(
  { data: { data, latency } }: {
    data: { data: number | null; latency: number };
  },
) {
  const count = useSignal(data ?? 0);

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
        <Counter
          counter={count}
          latency={latency}
        />
      </div>
    </div>
  );
}
