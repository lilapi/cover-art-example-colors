import { redirect } from "remix";
import type { LoaderFunction } from "remix";
import chroma from 'chroma-js';

export const loader: LoaderFunction = ({ params }) => {
  const randomColor = chroma.random();
  const hex = randomColor.hex().slice(1);

  return redirect(`/hex/${hex}`);
};
