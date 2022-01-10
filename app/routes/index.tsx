import { useLoaderData, redirect, Link } from "remix";
import type { ActionFunction, LoaderFunction, LinksFunction, MetaFunction } from "remix";
import chroma from 'chroma-js';
import { littleEagleImagesURL } from "@littleeagle/images-node";
import { ColorSwatch } from "~/primitives/ColorSwatch";

export const loader: LoaderFunction = ({ params }) => {
  const hex = '00b4ff';

  const color = chroma(hex);
  const cssColor = color.hex();
  const dark = color.luminance(0, 'lab');
  const light = color.luminance(1, 'lab');
  const opposite = color.luminance() >= 0.5 ? dark : light;
  const srgb = color.rgb();
  const lab = color.lab();

  const ogImageURL = littleEagleImagesURL({
    id: process.env.LITTLE_EAGLE_PROJECT_KEY!,
    secret: process.env.LITTLE_EAGLE_PROJECT_SECRET!
  }, {
    template: 'overlay',
    backgroundColor: cssColor,
    text: [
      { text: 'Little Eagle Colors', size: 16, color: 'white' },
      { text: cssColor, size: 48, color: 'white' }
    ],
  });

  return { cssColor, oppositeHex: opposite.hex(), ogImageURL: ogImageURL.toString(), srgb, lab };
};

export const meta: MetaFunction = ({ data }) => ({
  "og:image": data.ogImageURL
});

export default function Index() {
  return (
    <>
      <main className="pt-8">
        <article className="mx-auto">
          <h1>Little Eagle Colors</h1>
          <div style={{ display: "grid", gridTemplateColumns: 'repeat(auto-fit, 100px)', gap: '1rem' }} className="pt-8 pb-8">
            {/* {chroma.scale(Array.from({ length: 3 }, () => chroma.random())).mode('lch').colors(32).map(hex =>
              <Link to={`/hex/${hex.slice(1)}`}><ColorSwatch key={hex} size={100} fill={hex} /></Link>
            )} */}
            {chroma.scale(['#fafa6e', '#2A4858', '#009fec', '#D53EFF', '#FF6C63', '#00DD00', '#384084', '#B40000', '#004100']).mode('lch').colors(32).map(hex =>
              <Link to={`/hex/${hex.slice(1)}`}><ColorSwatch key={hex} size={100} fill={hex} /></Link>
            )}
          </div>
        </article>
        <article className="mx-auto">
          <h2>There are 16.78 million sRGB colors. We have a page for each one, using Remix’s dynamic routes.</h2>
        </article>
      </main>
    </>
  );
}
