// api/index.js
const manifest = {
  "id": "cloudflare-livestream-addon",
  "version": "1.0.0",
  "name": "Cloudflare Livestream",
  "description": "Watch a livestream hosted on Cloudflare Stream",
  "resources": ["stream"],
  "types": ["movie"],
  "idPrefixes": ["cloudflare-live-"],
  "catalogs": []
};

const CLOUDFLARE_STREAM_HLS = 'https://videodelivery.net/your-video-id/manifest/video.m3u8';

export default function handler(req, res) {
  const { url } = req;
  
  if (url === '/manifest.json') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(manifest);
  }

  const match = url.match(/^\/stream\/(.+)\/(.+)\.json$/);
  if (match) {
    const [, type, id] = match;
    if (id.startsWith('cloudflare-live-')) {
      return res.status(200).json({
        streams: [{
          title: "Live Stream",
          url: CLOUDFLARE_STREAM_HLS
        }]
      });
    }
  }

  res.status(404).send('Not found');
}
