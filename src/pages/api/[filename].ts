import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas } from 'canvas';

const gradients: Record<string, string[]> = {
  'A': ['#FF0000', '#FFFF00'],
  'B': ['#FF4500', '#FFD700'],
  'C': ['#00FF00', '#00FFFF'],
  'D': ['#0000FF', '#FF00FF'],
  'E': ['#FF6347', '#40E0D0'],
  'F': ['#FF1493', '#FFD700'],
  'G': ['#ADFF2F', '#7B68EE'],
  'H': ['#DC143C', '#FF7F50'],
  'I': ['#FF8C00', '#FF1493'],
  'J': ['#1E90FF', '#00BFFF'],
  'K': ['#FF4500', '#FFD700'],
  'L': ['#00FF00', '#00CED1'],
  'M': ['#FF69B4', '#FF6347'],
  'N': ['#6A5ACD', '#48D1CC'],
  'O': ['#FF4500', '#DA70D6'],
  'P': ['#32CD32', '#FF6347'],
  'Q': ['#00FFFF', '#FF4500'],
  'R': ['#FF00FF', '#00FF7F'],
  'S': ['#FF1493', '#FF8C00'],
  'T': ['#FF6347', '#1E90FF'],
  'U': ['#00FA9A', '#FF00FF'],
  'V': ['#FFD700', '#DC143C'],
  'W': ['#ADFF2F', '#00BFFF'],
  'X': ['#FF8C00', '#FF00FF'],
  'Y': ['#00FF00', '#FF6347'],
  'Z': ['#FF1493', '#00CED1'],
};


function getLetterAfter(letters: string, offset: number): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let index = alphabet.indexOf(letters);
  if (index === -1) return 'Z'; 
  index = (index + offset) % alphabet.length;
  return alphabet[index];
}

function getGradientForString(str: string) {
  const upperStr = str.toUpperCase();
  const length = upperStr.length;
  const lastLetter = upperStr[upperStr.length - 1];
  
  const nextLetter = getLetterAfter(lastLetter, length);

  return gradients[nextLetter] || ['#FFFFFF', '#000000'];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  if (typeof filename !== 'string') {
    res.status(400).json({ error: 'Filename must be a string' });
    return;
  }

  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    res.status(500).json({ error: 'Failed to create canvas context' });
    return;
  }

  const gradientColors = getGradientForString(filename);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, gradientColors[0]);
  gradient.addColorStop(1, gradientColors[1]);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = 'bold 100px Arial';
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(filename.toUpperCase(), canvas.width / 2, canvas.height / 2);

  res.setHeader('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
}