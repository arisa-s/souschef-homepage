import { POSTS_QUERYResult } from '@/sanity.types'

export type BlogPostCard = Pick<POSTS_QUERYResult[number], 'title' | 'image' | 'slug' | 'tags'>
