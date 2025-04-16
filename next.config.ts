import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },

  images: {
    domains: [
      "i.etsystatic.com",
      "m.media-amazon.com",
      "yankeecandle.imgix.net",
      "shop.kitchensforgood.org",
      "www.winterfieldstudios.com",
      "www.papernstitchblog.com",
      "www.windandweather.com",
      "tse3.mm.bing.net",
      "i0.wp.com",
      "www.townsends.us",
      "th.bing.com",
      "www.dolivo.shop",
      "christopherthomsonironworks.com",
      "d2ma7w4w9grdob.cloudfront.net",
      "www.erstwilder.com",
      "cdn1.iconfinder.com",
      "cdn0.iconfinder.com"
      ],
  }
};

export default nextConfig;
