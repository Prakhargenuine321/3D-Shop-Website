import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

// Clipdrop API URL and API key
const CLIPDROP_URL = 'https://clipdrop-api.co/text-to-image/v1';
const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY; // Ensure this is set in your .env file.

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from Clipdrop ROUTES" });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      CLIPDROP_URL,
      {
        prompt: prompt, // The text describing the pattern/design.
        guidance: 7.5,  // Optional: Adjust guidance strength (similar to creativity).
        iterations: 50, // Optional: Number of iterations for generating the image.
        width: 1024,    // Optional: Width of the generated image.
        height: 1024    // Optional: Height of the generated image.
      },
      {
        headers: {
          'x-api-key': process.env.OPENAI_API_KEY.CLIPDROP_API_KEY, // Authenticate using your Clipdrop API key.
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer', // Return the image as binary data.
      }
    );

    // Convert the binary data to a Base64 string.
    const imageBase64 = Buffer.from(response.data).toString('base64');

    res.status(200).json({ photo: `data:image/png;base64,${imageBase64}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
