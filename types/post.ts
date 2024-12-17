import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface BlogPostCard {
    title: string;
    image: string | StaticImport;
    slug: string;
    tags?: BlogType[];
}

export enum BlogType {
    HOW_TO = "howTo",
    NEW_FEATURE = "newFeature",
}