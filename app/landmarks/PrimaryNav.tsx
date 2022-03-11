import { Link } from "remix";

export function PrimaryNav(): JSX.Element {
  return <nav aria-label="Primary" className="pt-8 pb-8 text-center">
    <Link to="/" className="px-2 font-bold">Little Eagle Colors</Link>
    <Link to="/random" className="px-2 font-bold">Random Color</Link>
  </nav>;
}
