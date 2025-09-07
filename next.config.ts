import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   experimental: {
    ppr: 'incremental',
  },
  // devIndicators:{
  //   appIsrStatus: true,
  //   buildActivity: true,
  //   buildActivityPosition: 'bottom-right'
  // }
 
};

module.exports = {
  images: {

    domains: ['omar-fouad.com','placehold.co','cdn.sanity.io', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'pbs.twimg.com'],
  },
}
export default nextConfig;
