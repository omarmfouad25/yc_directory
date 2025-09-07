import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/Views';
import StartupCard, { StartupCardType } from '@/components/StartupCard';

export const experimental_ppr = true
const Startup = async  ({ params }: { params: { id: string } }) => {
    const id = (await params).id;
    const [post, playlistRes] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editors-choice' })
    ]);
    
    if (!post) return notFound();

    const editorPost = playlistRes?.select ?? [];

    const md = markdownit({
         html: true,
        linkify: true,
        typographer: true
    })
    const parsedContent = md.render(post?.pitch || '');
    // console.log(post)
  return (
    <>
    <section className='pink_container pattern !min-h-[230px]'>
        <p className='tag tag-tri'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className="sub-heading !max-w-5xl"> {post.description}</p>
    </section>
    <section className='section_container'>
        <img src={post.image} alt={post.title} className='w-full h-auto rounded-xl'/>
        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
            <div className='flex-between gap-5'>
                <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                    <Image src={post.author.image} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg'/>
                    <div>
                        <p className='text-20-medium'>{post.author.name}</p>
                        <p className='text-16-medium !text-stone-500'>@{post.author.username}</p>
                     </div>
                </Link>
                <p className='category-tag'>{post.category}</p>
            </div>
            <h3 className='text-30-bold'>Startup Details</h3>
            {parsedContent ? (
               <article className=' max-w-4xl break-all    '
               dangerouslySetInnerHTML={{ __html: parsedContent }}
               />
            ) : (
                <p className='text-stone-950 text-sm font-normal'>No details available</p>
            )}
        </div>
        <hr className='border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto'/>
        
        {editorPost && editorPost.length > 0 && (
            <div className='max-w-4xl mx-auto'>
                <p className='text-30-semibold'>Editors Choice</p>
                <ul className='mt-7 grid sm:grid-cols-2 gap-5'>
                {editorPost.map((post: StartupCardType, i: number) => (
                    <StartupCard key={i} post={post} />
                ))}
                </ul>
            </div>
        )}

        <Suspense fallback={<Skeleton className='bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3'/>}>
        <View id={id} />
        </Suspense>
    </section>
    
    </>
  )
}

export default Startup