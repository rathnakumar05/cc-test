import { Pool } from 'pg';
import { VideoRecord } from './types';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/**
 * Returns post_ids that already exist in the database.
 */
async function getExistingPostIds(postIds: string[]): Promise<Set<string>> {
  if (postIds.length === 0) return new Set();

  const placeholders = postIds.map((_, i) => `$${i + 1}`).join(', ');
  const result = await pool.query(
    `SELECT post_id FROM homepage_top_videos WHERE post_id IN (${placeholders})`,
    postIds,
  );

  return new Set(result.rows.map((row: { post_id: string }) => row.post_id));
}

/**
 * Inserts new videos into the database.
 * Returns the count of newly inserted records.
 */
export async function insertNewVideos(videos: VideoRecord[]): Promise<{ newCount: number; skippedCount: number }> {
  const postIds = videos.map((v) => v.postId).filter(Boolean);
  const existingIds = await getExistingPostIds(postIds);

  const newVideos = videos.filter((v) => !existingIds.has(v.postId));

  for (const video of newVideos) {
    await pool.query(
      `INSERT INTO homepage_top_videos (post_id, title, summary, facebook_link, twitter_link)
       VALUES ($1, $2, $3, $4, $5)`,
      [video.postId, video.title, video.summary, video.facebookLink, video.twitterLink],
    );
  }

  return {
    newCount: newVideos.length,
    skippedCount: videos.length - newVideos.length,
  };
}
