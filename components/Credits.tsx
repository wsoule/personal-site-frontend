import IconBrandGithub from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-github.tsx';
import IconExternalLink from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/external-link.tsx';
export type CreditType = {
  display: string;
  url: string;
};
export const CreditLinks: CreditType[] = [
  {
    display: 'Dino Avatar',
    url: 'https://github.com/hashrock/deno-avatar/tree/main',
  },
  {
    display: 'Fresh Components',
    url: 'https://fresh.deno.dev/components',
  },
];
export const Credits = () => {
  return (
    <>
      <h2 class={'font-bold'}>Credits:</h2>
      <ul class={'list-disc px-8'}>
        {CreditLinks.map((credit) => {
          return (
            <li>
              <a
                class={'hover:text-blue-500 hover:underline flex'}
                href={credit.url}
              >
                {credit.display}
                <IconExternalLink />
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};
