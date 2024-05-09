const LINKS = [
  {
    title: 'Source',
    href: 'https://github.com/wsoule/personal-site-frontend',
  },
  {
    title: 'License',
    href: 'https://github.com/wsoule/personal-site-frontend/blob/main/LICENSE',
  },
];

export default function Footer() {
  return (
    <footer class='border-t-2 border-gray-200 md:h-16 flex mt-16 justify-center md:mx-16'>
      <div class='flex flex-col sm:flex-row gap-4 justify-between items-center max-w-screen-xl mx-auto w-full sm:px-6 md:px-8 p-4'>
        <div class='text-gray-600 text-center'>
          <span>© {new Date().getFullYear()} Wyat Soule</span>
        </div>

        <div class='flex items-center gap-8'>
          {LINKS.map((link) => (
            <a href={link.href} class='text-gray-600 hover:underline'>
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
