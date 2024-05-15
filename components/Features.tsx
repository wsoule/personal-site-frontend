// import IconAlarm from 'https://deno.land/x/tabler_icons_tsx@0.0.6/tsx/alarm.tsx';
import IconAlarm from '$icons/alarm.tsx';
import IconArmchair from '$icons/armchair.tsx';
import IconChevronRight from '$icons/chevron-right.tsx';
import IconBrandGraphql from '$icons/brand-graphql.tsx';
import { JSX } from 'preact/jsx-runtime';

export type Feature =
  & {
    title: string;
    icon: typeof IconAlarm;
    description: string | JSX.Element;
  }
  & (
    | {
      link: string;
      linkName?: string;
    }
    | {
      link?: never;
      linkName?: never;
    }
  );

export type Experience = {
  title: string;
  employer: string;
  duties: string[];
};

export type FeaturesProps = {
  experience: Experience[] | null;
};

export const Features = (props: FeaturesProps) => {
  // call the deno.kv to get the list of positions
  console.log(props.experience);
  const featureItems: Feature[] = [
    {
      title: 'History',
      icon: IconBrandGraphql,
      description: (
        <>
          <div>
            <p>
              <b>Student Softare Developer</b>
            </p>
            <p>- State of Michigan</p>
          </div>
          <p>- did things.</p>
          <p>
            <b>Software Engineer</b>
          </p>{' '}
          <p>
            - Waggoner Financial
          </p>
        </>
      ),
      link: '/Wyat_Soule.pdf',
      linkName: 'Resume',
    },
    {
      title: 'Goals',
      icon: IconBrandGraphql,
      description: 'My Ultima',
      link: '#',
    },
    {
      title: 'Skills',
      icon: IconArmchair,
      description:
        'Nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, ',
    },
  ];

  return (
    <div class='flex flex-col md:flex-row gap-8 bg-white p-8'>
      {featureItems.map((item) => {
        return (
          <div class='flex-1 space-y-2'>
            <div class='bg-blue-600 flex items-center p-3 align-middle rounded-xl text-white'>
              <item.icon class='w-10 h-10' aria-hidden='true' />
              <p class={'text-3xl font-bold justify-self-center ml-5'}>
                {item.title}
              </p>
            </div>
            <p class='text-xl'>
              {item.description}
            </p>

            {item.link &&
              (
                <a class='block' href={item.link}>
                  <p class='text-blue-600 cursor-pointer hover:underline inline-flex items-center group'>
                    {item.linkName || <>Read More</>}{' '}
                    <IconChevronRight
                      class='inline-block w-5 h-5 transition group-hover:translate-x-0.5'
                      aria-hidden='true'
                    />
                  </p>
                </a>
              )}
          </div>
        );
      })}
    </div>
  );
};
