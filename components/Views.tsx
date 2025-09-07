import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server'

const View = async ({ id }: {id: string}) => {
  const {views} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, { id });

  after(async () => {
    await writeClient
    .patch(id)
    .set({ views: views + 1 })
    .commit();
  });
  return (
    <div className='flex justify-end items-center mt-5 fixed bottom-3 right-3'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>
        <p className='font-medium text-[16px] bg-rose-300/30 px-4 py-2 rounded-lg capitalize'>
            <span className='font-stone-950'>
              {`${views} View${views === 1 || views === 0 ? '' : 's'}`}
            </span>
        </p>
    </div>
  )
}

export default View