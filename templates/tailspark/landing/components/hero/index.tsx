import { Hero } from "@/types/landing";
import Link from "next/link";

export default ({ hero, count }: { hero: Hero; count?: number }) => {
  return (
    <section className="relative bg-gray-50 py-16">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Find Awesome{" "}
            <span className="text-orange-500">MCP Servers</span> and Clients
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The largest collection of MCP Servers.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Sponsored by{" "}
            <Link href="https://deepsite.site" className="text-orange-500 hover:text-orange-600">
              deepsite.site
            </Link>
          </p>

          {/* <div className="mt-10 flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search with keywords"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};
