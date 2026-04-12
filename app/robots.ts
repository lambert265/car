import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/account/", "/api/"],
      },
    ],
    sitemap: "https://car-sandy-pi.vercel.app/sitemap.xml",
  };
}
