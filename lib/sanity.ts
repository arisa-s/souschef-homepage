import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: "10y6s55e",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export const sanityDefaultOptions = {
    next: {
        revalidate: 30,
    },
}

const { projectId, dataset } = sanityClient.config();
export const getImageUrlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;