import { ActionFunction, LoaderFunction, useLoaderData, redirect, json } from "remix";
import type { LinksFunction, MetaFunction } from "remix";
import chroma from 'chroma-js';
import { littleEagleImagesURL } from "@littleeagle/images-node";

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

export const meta: MetaFunction = ({ params, data }) => {

  return {
    "og:image": data.ogImageURL
  };
};

// export function links(): ReturnType<LinksFunction> {
//   return [];
// }

export default function HexColor() {
  const { cssColor, oppositeHex, ogImageURL, srgb, lab } = useLoaderData();

  return (
    <article style={{ lineHeight: "1.4", maxWidth: '44rem', margin: 'auto' }} className="pt-8 pb-8 space-y-4">
      <h1 style={{ textAlign: 'center' }}>Hex Color {cssColor}</h1>
      <div>
        <svg viewBox="0 0 1 1" width={200} height={200} style={{ display: 'block', margin: 'auto', border: '1px solid black', borderRadius: '0.5rem' }}>
          <rect fill={cssColor} width={1} height={1} />
          <text y={0.5} x={0.5} dominantBaseline="middle" textAnchor="middle" fontSize={0.15} letterSpacing={0.003} fontWeight='bold' fill={oppositeHex}>{cssColor}</text>
        </svg>
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
      <img width={600} height={315} src={ogImageURL} className="block mx-auto" />
    </article>
  );
}
