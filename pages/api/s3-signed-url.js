export default async (req, res) => {
  if (req.method !== 'GET') return;
  try {
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};
