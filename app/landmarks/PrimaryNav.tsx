import { Link } from "remix";
import { GitHubIcon } from "~/primitives/SocialIcons";

export function PrimaryNav(): JSX.Element {
  return <nav className="flex items-baseline mx-auto" data-measure>
    <div className="flex items-baseline">
      <h1><Link to="/" className="font-bold text-inherit">Little Eagle Colors</Link></h1>
      <Link to="/random" className="px-4">Random color</Link>
    </div>

    <div className="mx-auto" />

    <a href="http://github.com/littleeagleio/little-eagle-remix-colors" style={{ color: 'white' }}>
      <GitHubIcon width={32} height={32} />
    </a>
  </nav>
}
