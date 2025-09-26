import { defineCollection, z } from "astro:content";
import { notionDatabaseLoader } from "./lib/notionDatabaseLoader.js";

const restaurants = defineCollection({
  loader: notionDatabaseLoader({
    databaseId: "2773998a14fa80efa1e0e9af0969b701",
    slugProperty: "Slug",
  }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    properties: z.object({
      Photo: z.any(),
      Slug: z.any(),
      Description: z.any(),
      Phone: z.any(),
      Category: z.any(),
      URL: z.any(),
      Name: z.any(),
    }),
    url: z.string(),
    created_time: z.string(),
    last_edited_time: z.string(),
  }),
});

export const collections = {
  restaurants,
};
