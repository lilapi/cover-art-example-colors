import { useLoaderData, redirect } from "remix";
import type { ActionFunction, LoaderFunction, LinksFunction, MetaFunction } from "remix";
import chroma from 'chroma-js';
import { gitHubTemplateURL } from "@littleeagle/images-node";
import { ColorSwatch } from "~/primitives/ColorSwatch";
import { PrimaryNav } from "~/landmarks/PrimaryNav";

function formatRGB(rgb: [number, number, number]) {
  return `rgb(${rgb.join(', ')})`;
}
function formatLab(lab: [number, number, number]) {
  return `lab(${lab.map((n: number, index) => n.toFixed(3) + (index === 0 ? "%" : "")).join(' ')})`;
}

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

  const ogImageURL = gitHubTemplateURL({
    username: 'remix-run',
    backgroundColor: cssColor,
    text: [
      { text: cssColor, size: 48, color: opposite.hex() },
      { text: formatRGB(srgb), size: 24, color: opposite.hex() },
      { text: formatLab(lab), size: 24, color: opposite.hex() },
    ],
    authorName: 'Remix + Little Eagle Images',
    website: 'little-eagle-remix-colors.vercel.app'
  });

  return { cssColor, oppositeHex: opposite.hex(), ogImageURL: ogImageURL.toString(), srgb, lab };
};

export const action: ActionFunction = ({ params }) => {
  return {};
};

export const meta: MetaFunction = ({ data }) => ({
  "og:type": "article",
  "og:title": `Hex Color ${data.cssColor}`,
  "og:description": `${formatRGB(data.srgb)} ${formatLab(data.lab)}`,
  "og:image": data.ogImageURL,
  "twitter:card": "summary_large_image"
});

// export function links(): ReturnType<LinksFunction> {
//   return [];
// }

export default function HexColor() {
  const { cssColor, oppositeHex, ogImageURL, srgb, lab } = useLoaderData();

  return (
    <>
      <header role="banner" className="pt-8">
        <PrimaryNav />
      </header>
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
          <figure className="pt-4 text-center space-y-1">
            <img width={600} height={315} src={ogImageURL} className="block mx-auto" />
            <figcaption className="text-xs">Image generated with <a href="https://littleeagle.io/">Little Eagle Images</a></figcaption>
          </figure>
        </article>
      </main>
    </>
  );
}
