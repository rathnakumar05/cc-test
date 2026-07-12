import axios from 'axios';
import { RawVideoItem, VideoRecord, NBCResponse } from './types';

const NBC_ENDPOINT = 'https://www.nbcnewyork.com/wp-json/nbc/v1/template/home';

/**
 * Strips HTML tags and decodes HTML entities to get plain text.
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
}

/**
 * Parses a single raw video item into our clean VideoRecord format.
 * Returns null if required fields are missing.
 */
function parseVideoItem(item: RawVideoItem): VideoRecord | null {
  const postId = item.post_noid;
  const title = item.title?.trim();
  const rawSummary = item.summary;
  const facebookLink = item.share_links?.facebook || '';
  const twitterLink = item.share_links?.twitter || '';

  if (!postId || !title || !rawSummary) {
    return null;
  }

  return {
    postId,
    title,
    summary: stripHtml(rawSummary),
    facebookLink,
    twitterLink,
  };
}

/**
 * Fetches data from the NBC endpoint and parses homepage_top_videos.
 * Returns an array of cleaned VideoRecord objects.
 */
export async function fetchAndParse(): Promise<VideoRecord[]> {
const response = await axios.get<NBCResponse>(
  `https://api.scraperapi.com/?api_key=${process.env.SCRAPERAPI_KEY}&url=${encodeURIComponent(NBC_ENDPOINT)}`,
  { timeout: 30000 }
);

  const data = response.data;

  if (!data.homepage_top_videos || !Array.isArray(data.homepage_top_videos)) {
    throw new Error('homepage_top_videos not found or not an array in response');
  }

  const videos: VideoRecord[] = [];

  for (const item of data.homepage_top_videos) {
    const parsed = parseVideoItem(item);
    if (parsed) {
      videos.push(parsed);
    }
  }

  return videos;
}
