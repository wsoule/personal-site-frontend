import { useSignal } from '@preact/signals';
import Counter from '../islands/Counter.tsx';
import IconExternalLink from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/external-link.tsx';
import IconBrandGithub from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-github.tsx';
import { Handlers } from '$fresh/server.ts';
import { DbStruct, getCount, kv, setCount } from '../utils/db.ts';
import Features from '../components/Features.tsx';
import Header from '../components/Header.tsx';
import { ServerSentEventStream } from 'https://deno.land/std@0.210.0/http/server_sent_event_stream.ts';

export const handler: Handlers = {
  GET: async (req, ctx) => {
    const accept = req.headers.get('accept');
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
    await setCount(body.add);
    return Response.json({ ok: true }, {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
export default function Home(
  { data: { data, latency } }: {
    data: { data: DbStruct; latency: number };
  },
) {
  const count = useSignal(data.count ?? 0);
  const counter = useSignal(data.totCount ?? 0);
  const getRandom = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <>
      <div class='px-4 py-8 bg-[#86efac] mx-auto flex flex-col items-center justify-center'>
        <img
          class='my-6 rounded-full'
          src={`https://deno-avatar.deno.dev/avatar/${getRandom}.svg`}
          width='128'
          height='128'
          alt='the Fresh logo: a sliced lemon dripping with juice'
        />
        <h1 class='text-4xl font-bold'>Wyat Soule</h1>
        <p class='my-4 flex'>
          Built with&nbsp;
          <a
            href={'https://fresh.deno.dev/'}
            class={'flex hover:text-blue-500 hover:underline'}
            target={'_blank'}
          >
            Fresh<IconExternalLink class='w-5 h-5' />
          </a>, by&nbsp;
          <a
            class={'flex hover:text-blue-500 hover:underline'}
            href={'https://deno.com/'}
            target={'_blank'}
          >
            Deno<IconExternalLink class='w-5 h-5' />
          </a>
        </p>
        <Counter
          count={count}
          counter={counter}
          latency={latency}
        />
      </div>
      <Features />
      <div class={'p-4'}>
        <div class={'px-4 sm:px-20'}>
          <h2 class={'font-bold'}>Credits:</h2>
          <ul class={'list-desc'}>
            <li class={'flex font-semibold'}>
              &#x2022;&nbsp;<a
                class={'flex hover:text-blue-500 hover:underline'}
                href={'https://github.com/hashrock/deno-avatar/tree/main'}
                target={'_blank'}
              >
                Dino Avatar&nbsp;
                <IconBrandGithub class='w-6 h-6' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
