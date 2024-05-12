import IconChevronRight from 'https://deno.land/x/tabler_icons_tsx@0.0.6/tsx/chevron-right.tsx';

export type RepoDisplayProps = {
  name: string;
  description: string | null;
  url: string;
  deployUrl: string | null;
};

export default function RepoDisplay(
  { name, description, url, deployUrl }: RepoDisplayProps,
) {
  return (
    <div
      class='w-full flex px-8 py-10 min-h-[14em] justify-center items-center flex-col gap-8 bg-cover bg-center bg-no-repeat bg-gray-100 rounded-xl text-white'
      style='background-image:linear-gradient(rgba(0, 0, 40, 0.8),rgba(0, 0, 40, 0.8));'
    >
      <div class='space-y-4 text-center'>
        <h1 class='text-4xl inline-block font-bold'>{name}</h1>
        {description && (
          <p class='text-xl max-w-lg text-blue-100'>
            {description}
          </p>
        )}
      </div>

      <div class='flex flex-col md:flex-row items-center'>
        {deployUrl && (
          <a
            href={deployUrl}
            class='block mt-4 text-blue-600 cursor-pointer inline-flex items-center group text-blue-800 bg-white px-8 py-2 rounded-md hover:bg-blue-50 font-bold'
          >
            Deployment{' '}
          </a>
        )}
        <a
          href={url}
          class='block mt-4 transition-colors text-blue-400 cursor-pointer inline-flex items-center group px-4 py-2 hover:text-blue-100'
        >
          View Repo{' '}
          <IconChevronRight
            class='inline-block w-5 h-5 transition group-hover:translate-x-0.5'
            aria-hidden='true'
          />
        </a>
      </div>
    </div>
  );
}
