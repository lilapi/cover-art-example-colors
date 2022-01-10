import { useLoaderData, redirect } from "remix";
import type { ActionFunction, LoaderFunction, LinksFunction, MetaFunction } from "remix";
import chroma from 'chroma-js';
import { littleEagleImagesURL } from "@littleeagle/images-node";
import { ColorSwatch } from "~/primitives/ColorSwatch";
import { PrimaryNav } from "~/landmarks/PrimaryNav";

export const loader: LoaderFunction = ({ params }) => {
  const { hex = 'fff' } = params;

  // Redirect to lowercase form
  if (hex.toLowerCase() !== hex) {
    return redirect(`/hex/${hex.toLowerCase()}`);
  }

  // const cssColor = `#${hex}`;
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

export const action: ActionFunction = ({ params }) => {
  return {};
};

export const meta: MetaFunction = ({ data }) => ({
  "og:image": data.ogImageURL
});

// export function links(): ReturnType<LinksFunction> {
//   return [];
// }

export default function HexColor() {
  const { cssColor, oppositeHex, ogImageURL, srgb, lab } = useLoaderData();

  return (
    <>
      <PrimaryNav />
      <main>
        <article className="pt-8 pb-8 mx-auto space-y-4">
          <h1 style={{ textAlign: 'center' }}>Hex Color {cssColor}</h1>
          <div>
            <ColorSwatch size={200} fill={cssColor} text={cssColor} textColor={oppositeHex} />
          </div>
          <dl style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            <div>
              <dt>Lab</dt>
              <dd className="font-mono">L: {lab[0].toFixed(3)}</dd>
              <dd className="font-mono">a: {lab[1].toFixed(3)}</dd>
              <dd className="font-mono">b: {lab[2].toFixed(3)}</dd>
            </div>
            <div>
              <dt>sRGB</dt>
              <dd className="font-mono">r: {srgb[0].toFixed(0)}</dd>
              <dd className="font-mono">g: {srgb[1].toFixed(0)}</dd>
              <dd className="font-mono">b: {srgb[2].toFixed(0)}</dd>
            </div>
          </dl>
          <figure className="text-center space-y-1">
            <img width={600} height={315} src={ogImageURL} className="block mx-auto" />
            <figcaption className="text-sm">Image generated with <a href="https://littleeagle.io/">Little Eagle Images</a></figcaption>
          </figure>
        </article>
      </main>
    </>
  );
}
