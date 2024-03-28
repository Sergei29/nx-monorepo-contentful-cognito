import { z } from 'zod';

import type { RichTextContent } from '../../../types';

export const imageSchema = z.object({
  id: z.string().min(1),
  alt: z.string().min(1),
  href: z.string().min(1),
  width: z.number().min(1),
  height: z.number().min(1),
});

export const heroSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  pathname: z.string().min(1),
  text: z.string().min(1),
  image: imageSchema.required(),
});

export const heroSummarySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  pathname: z.string().min(1),
  image: imageSchema.required(),
});

export const bookDatailsSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  subTitle: z.string().min(1),
  about: z.custom<RichTextContent>(),
  image: imageSchema.required(),
});

export const bookSummarySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  image: imageSchema.required(),
});

export const movieDatailsSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subTitle: z.string().min(1),
  genre: z.string().min(1),
  cast: z.string().min(1),
  description: z.custom<RichTextContent>(),
  image: imageSchema.required(),
  videoUrl: z.string().optional().nullable(),
});

export const movieSummarySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subTitle: z.string().min(1),
  image: imageSchema.required(),
});

export const gameDetailsSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subTitle: z.string().min(1),
  genre: z.string().min(1),
  description: z.custom<RichTextContent>(),
  image: imageSchema.required(),
  videoUrl: z.string().optional().nullable(),
});

export const gameSummarySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subTitle: z.string().min(1),
  image: imageSchema.required(),
});
