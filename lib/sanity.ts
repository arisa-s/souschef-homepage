import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "10y6s55e",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});