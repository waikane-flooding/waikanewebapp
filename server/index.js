import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/waikane_stream', (req, res) => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    data.push({
      DateTime: new Date(now - i * 3600000).toISOString(),
      ft: 3 + Math.random() * 2
    });
  }
  res.json(data);
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});