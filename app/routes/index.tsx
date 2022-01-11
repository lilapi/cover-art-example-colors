import { useLoaderData, redirect, Link } from "remix";
import type { ActionFunction, LoaderFunction, LinksFunction, MetaFunction } from "remix";
import chroma from 'chroma-js';
import { littleEagleImagesURL } from "@littleeagle/images-node";
import { ColorSwatch } from "~/primitives/ColorSwatch";
import { GitHubIcon } from "~/primitives/SocialIcons";

export const loader: LoaderFunction = ({ params }) => {
  const ogImageURL = littleEagleImagesURL({
    id: process.env.LITTLE_EAGLE_PROJECT_KEY!,
    secret: process.env.LITTLE_EAGLE_PROJECT_SECRET!
  }, {
    template: 'overlay',
    backgroundColor: '#5A00D0',
    text: [
      { text: '16.8 million colors = 16.8 million pages', size: 24, color: '#ffe351' },
      { text: 'Dynamic routes with Remix + dynamic images with Little Eagle', size: 42, color: 'white' },
    ],
  });

  return { ogImageURL: ogImageURL.toString() };
};

export const meta: MetaFunction = ({ data }) => ({
  "og:image": data.ogImageURL
});

const swatchSize = 111;

export default function Index() {
  return (
    <>
      <main className="pt-8 pb-8">
        <article className="mx-auto">
          <header className="flex items-baseline">
            <h1>Little Eagle Colors</h1>

            <div className="mx-auto" />

            <a href="http://github.com/littleeagleio/little-eagle-remix-colors" style={{ color: 'white' }}>
              <GitHubIcon width={32} height={32} />
            </a>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, ${swatchSize}px)`, gap: '1rem' }} className="pt-8 pb-8">
            {/* {chroma.scale(Array.from({ length: 3 }, () => chroma.random())).mode('lch').colors(32).map(hex =>
              <Link key={hex} to={`/hex/${hex.slice(1)}`}><ColorSwatch size={100} fill={hex} /></Link>
            )} */}
            {chroma.scale(['#fafa6e', '#2A4858', '#009fec', '#D53EFF', '#FF6C63', '#00DD00', '#384084', '#B40000', '#004100']).mode('lch').colors(32).map(hex =>
              <Link key={hex} to={`/hex/${hex.slice(1)}`}><ColorSwatch size={swatchSize} fill={hex} /></Link>
            )}
          </div>
        </article>
        <article className="mx-auto">
          <h2>There are 16.8 million sRGB colors. We have a page for each one, using Remix’s dynamic routes. And a social image generated for each one, using <a href="https://littleeagle.io">Little Eagle Images</a>.</h2>
        </article>
      </main>
    </>
  );
}
