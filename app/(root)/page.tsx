import { Button } from "@/components/ui/button";
import SearchForm from "../../components/SearchForm";
import "../globals.css";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}: { searchParams: Promise<{query?: string}> }) {
  const query = ( await searchParams ).query;
  const params = { search: query || null };
  // const posts = await client.fetch(STARTUPS_QUERY)
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  // console.log(JSON.stringify(posts, null, 2));

 const session = await auth();
 
//  console.log(session?.id);

  return (
   <>
   <section className="pink_container pattern">
    <h1 className="heading">Pitch Your Startup <br />Connect with Entrepreneurs</h1>
    <p className="sub-heading !max-w-3xl"> Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>

   <SearchForm query={query ?? ""} />
   
   </section>

   <section className="section_container">
    <p className="text-30-semibold">
      {query ? `Showing results for "${query}"` : "Discover and explore All startups ideas"}
    </p>
    <ul className="mt-7 card-grid">
      {posts && posts.length > 0 ? (
        posts.map((post: StartupCardType, index:number) => (
          <StartupCard key={post?._id} post={post} />
        ))
      ) : (<p>No results found</p>)}
    </ul>

   </section>
   <SanityLive  />
   </>
  );
}
