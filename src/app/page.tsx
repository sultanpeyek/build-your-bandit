import Image from 'next/image';

import Generator from '@/components/Generator';

export default function Home() {
  return (
    <>
      <main className="mx-auto min-h-[calc(100vh-50px)] max-w-screen-md p-4 pb-10">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="" width={81} height={81} />
          <h1 className="text-xl font-bold text-primary lg:text-3xl">Build your Bandit</h1>
        </div>
        <div className="my-10 text-xs lg:text-base">
          Create your one-of-a-kind bandit with this interactive web app. Choose unique pixel art traits such as
          backgrounds, masks, and accessories, then download your custom image with just one click!
        </div>
        <Generator />
        <a
          href="https://github.com/sultanpeyek"
          target="_blank"
          className="absolute right-0 top-0 max-w-full cursor-pointer"
          rel="noreferrer"
        >
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              loading="lazy"
              width="129"
              height="129"
              src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
              alt="Fork me on GitHub"
              data-recalc-dims="1"
            />
          }
        </a>
      </main>
      <footer className="h-[50px] flex-none px-4 text-center">
        Made with love by{' '}
        <a
          href="https://twitter.com/sultanpeyek"
          className="font-bold text-primary hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          @sultanpeyek
        </a>
      </footer>
    </>
  );
}

export const metadata = {
  title: 'Build your Bandit',
  description:
    'Create your one-of-a-kind bandit with this interactive web app. Choose unique pixel art traits such as backgrounds, masks, and accessories, then download your custom image with just one click!',
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
  },
  openGraph: {
    title: 'Build your Bandit',
    description:
      'Create your one-of-a-kind bandit with this interactive web app. Choose unique pixel art traits such as backgrounds, masks, and accessories, then download your custom image with just one click!',
    url: 'https://build-your-bandit.vercel.app/',
    siteName: 'Build your Bandit',
    images: [
      {
        url: 'https://build-your-bandit.vercel.app/images/logo.png',
        width: 81,
        height: 81,
      },
      {
        url: 'https://build-your-bandit.vercel.app/images/banner.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};
