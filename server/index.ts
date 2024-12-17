import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { join } from 'path';
import { tmpdir } from 'os';
import { promises as fs } from 'fs';

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/download/:videoId/:format', async (req, res) => {
  try {
    const { videoId, format } = req.params;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Validate video URL
    if (!await ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ message: 'Invalid YouTube video URL' });
    }

    // Get video info
    const info = await ytdl.getInfo(videoUrl);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    
    // Create temporary file paths
    const tempDir = tmpdir();
    const tempInputPath = join(tempDir, `${videoId}_input.mp4`);
    const tempOutputPath = join(tempDir, `${videoId}_output.${format}`);

    // Download audio stream
    const audioStream = ytdl(videoUrl, {
      quality: 'highestaudio',
      filter: 'audioonly'
    });

    // Convert to desired format
    await new Promise((resolve, reject) => {
      ffmpeg(audioStream)
        .toFormat(format)
        .on('end', resolve)
        .on('error', reject)
        .save(tempOutputPath);
    });

    // Set response headers
    res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.${format}"`);
    res.setHeader('Content-Type', `audio/${format}`);

    // Stream the file to the client
    const fileStream = fs.createReadStream(tempOutputPath);
    fileStream.pipe(res);

    // Clean up temp files after streaming
    fileStream.on('end', async () => {
      try {
        await fs.unlink(tempOutputPath);
      } catch (error) {
        console.error('Error cleaning up temp files:', error);
      }
    });

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Failed to process download request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});