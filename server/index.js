import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js'; // This file will handle the Clipdrop API logic now.

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Keep this for handling large image data.

app.use("/api/v1/clipdrop", dalleRoutes); // Change route name to reflect Clipdrop API.

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from Clipdrop API" }); // Update message if necessary.
});

app.listen(8080, () => console.log('Server has started on port 8080'));
