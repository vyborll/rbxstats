import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex items-center flex-row bg-darkgray-800 shadow-md py-3 px-6">
      <div>
        <Link href="/">
          <a className="text-2xl font-semibold italic uppercase mr-4">RBXStats</a>
        </Link>
      </div>

      <div className="flex flex-1 items-center space-x-1">
        <Link href="/players">
          <a className="py-2 px-4 hover:bg-darkgray-900 hover:opacity-90 rounded-sm">Players</a>
        </Link>
        <Link href="/deals">
          <a className="py-2 px-4 hover:bg-darkgray-900 hover:opacity-90 rounded-sm">Deals</a>
        </Link>
      </div>
    </div>
  );
}
