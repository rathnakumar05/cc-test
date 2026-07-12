import * as ff from '@google-cloud/functions-framework';
import { fetchAndParse } from './parser';
import { insertNewVideos } from './db';

ff.http('ingestVideos', async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  try {
    const videos = await fetchAndParse();
    console.log(`Fetched ${videos.length} videos from NBC endpoint`);

    const { newCount, skippedCount } = await insertNewVideos(videos);
    console.log(`Inserted ${newCount} new videos, skipped ${skippedCount} existing`);

    res.status(200).json({
      success: true,
      fetched: videos.length,
      newCount,
      skippedCount,
    });
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message || error.name;
      if ('code' in error) {
        message += ` (${(error as { code: string }).code})`;
      }
    }
    console.error('Ingestion failed:', error);
    res.status(500).json({
      success: false,
      error: message,
    });
  }
});
