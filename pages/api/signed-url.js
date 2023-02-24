import { getS3SignedUrl } from '../../util/aws-s3';

export default async (req, res) => {
  if (req.method !== 'POST') return;

  try {
    const signedUrl = await getS3SignedUrl(req.body.key, req.body.image);
    console.log('🚀 ~ file: s3-signed-url.js:8 ~ signedUrl:', signedUrl);
    res.json({ signedUrl });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};
