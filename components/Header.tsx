import LemonIcon from 'https://deno.land/x/tabler_icons_tsx@0.0.6/tsx/lemon-2.tsx';
// import IconBrandTypescript from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-typescript.tsx';

type Props = {
  active: string;
};

type NavMenu = {
  name: string;
  href: string;
};

export default function Header({ active }: Props) {
  const menus: NavMenu[] = [
    { name: 'Home', href: '/' },
    { name: 'Components', href: '/components' },
    { name: 'Docs', href: '/docs' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <div class='bg-white w-full py-6 px-8 flex flex-col md:flex-row gap-4'>
      <div class='flex flex-1'>
        <a class={'flex items-center'} href={'/'}>
          <LemonIcon aria-hidden='true' />
          <div class='text-2xl ml-1 font-bold'>
            Wyat
          </div>
        </a>
      </div>
      <ul class='flex items-center gap-6'>
        {menus.map((menu) => (
          <li>
            <a
              href={menu.href}
              class={'text-gray-500 hover:text-gray-700 py-1 border-gray-500' +
                (menu.href === active ? ' font-bold border-b-2' : '')}
            >
              {menu.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
