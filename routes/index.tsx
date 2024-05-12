import { useSignal } from '@preact/signals';
import Counter from '../islands/Counter.tsx';
import IconExternalLink from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/external-link.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';
import { DbStruct, getCount, kv, setCount } from '../utils/db.ts';
import Features from '../components/Features.tsx';
import Footer from '../components/Footer.tsx';
import { Credits } from '../components/Credits.tsx';
import RepoDisplay from '../components/Hero.tsx';
import { getEnvVar } from '../utils/functions.ts';

export type DataType = {
  kvCount: DbStruct;
  nodes: PinnableItemNode[];
};

export type HomeProps = {
  data: DataType;
  latency: number;
};

export type GithubLanguage = {
  nodes: { name: string; color: string }[];
  totalCount: number;
};

export type PinnableItemNode = {
  __typename: 'Gist' | 'Repository';
  description: string | null;
  name: string;
  language: GithubLanguage;
  url: string;
  homepageUrl: string | null;
};

export type GithubData = {
  data: {
    user: {
      pinnableItems: {
        nodes: PinnableItemNode[];
      };
    };
  };
};

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
    const query = `
query {
  user(login: "wsoule") {
    pinnableItems(first: 100) {
      nodes {
        __typename
        ... on Repository {
          description
          name
          languages(first: 4) {
            nodes {
              name
              color
            }
            totalCount
          }
          url
          homepageUrl
        }
      }
    }
  }
}
 `;
    const githubResponseJson = await fetch('https://api.github.com/graphql', {
      body: JSON.stringify({ query }),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getEnvVar('GITHUB_API_KEY')}`,
      },
    });
    const githubReponseObject: GithubData = await githubResponseJson.json();
    const { nodes: pinnableItemNodes } =
      githubReponseObject.data.user.pinnableItems;

    const data: DataType = {
      kvCount: await getCount() as DbStruct,
      nodes: pinnableItemNodes,
    };

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
export default function Home(props: PageProps<HomeProps>) {
  const { nodes, kvCount } = props.data.data;
  const { count, totCount } = kvCount;
  const latency = props.data.latency;
  const countSignal = useSignal(count ?? 0);
  const totCountSignal = useSignal(totCount ?? 0);
  const getRandomColor = Math.floor(Math.random() * 16777215).toString(16);
  const getRandom = () => Math.floor(Math.random() * nodes.length);
  const arrOfRepos = [];
  const previousUrls = new Set<string>([
    'https://github.com/wsoule/jaden',
    'https://github.com/wsoule/game-list',
    'https://github.com/brass-raven/second-brain',
    'https://github.com/Imagine-Software-Club/tech-interview',
    'https://github.com/shadcn-ui/ui',
    'https://github.com/community/community',
    'https://github.com/DustinMEastway/dotfiles',
    'https://github.com/Imagine-Software-Club/PRJ-VFHN4-VanityBlock',
    'https://github.com/wsoule/kickstart.nvim',
  ]);
  for (let i = 0; i < 3; i++) {
    let randomNode = nodes[getRandom()];
    while (
      previousUrls.has(randomNode.url)
    ) {
      randomNode = nodes[getRandom()];
    }
    previousUrls.add(randomNode.url);
    arrOfRepos.push(randomNode);
  }

  return (
    <>
      <div class='px-4 py-8 bg-[#86efac] mx-auto flex flex-col items-center justify-center'>
        <img
          class='my-6 rounded-full'
          src={`https://deno-avatar.deno.dev/avatar/${getRandomColor}.svg`}
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
          count={countSignal}
          counter={totCountSignal}
          latency={latency}
          siteUrl={getEnvVar('URL')}
        />
      </div>
      <Features />

      <h1 class='px-8 text-4xl inline-block font-bold'>
        Here are some things I have worked on.
      </h1>
      <p class={'px-8 py-1 mb-4 text-gray-400'}>
        Some are deployed while others are just sandboxes. Feel free to explore,
        but keep in mind: some are quite old and probably have some pretty ugly
        code.
      </p>
      <div class={'px-8 mb-4 sm:px-40 grid gap-4 grid-cols-1 sm:grid-cols-2'}>
        <RepoDisplay
          url={'https://github.com/wsoule/game-list'}
          description={'This was my first project that helped me fall in love with programming.'}
          name='game-list'
          deployUrl={null}
        />
        {arrOfRepos.map((repoNode) => {
          return (
            <RepoDisplay
              url={repoNode.url}
              description={repoNode.description}
              name={repoNode.name}
              key={repoNode.url}
              deployUrl={repoNode.homepageUrl}
            />
          );
        })}
      </div>
      <div class={'px-8 inline-flex flex-col'}>
        <Credits />
      </div>
      <Footer />
    </>
  );
}
