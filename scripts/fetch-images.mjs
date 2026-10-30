import fs from 'node:fs/promises';
import path from 'node:path';

const IMAGES = [
  {
    name: 'milan.webp',
    url: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=900&q=80&fm=webp',
  },
  {
    name: 'rome.webp',
    url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80&fm=webp',
  },
  {
    name: 'perugia.webp',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80&fm=webp',
  },
  {
    name: 'siena.webp',
    url: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?auto=format&fit=crop&w=900&q=80&fm=webp',
  },
  {
    name: 'urbino.webp',
    url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80&fm=webp',
  },
  {
    name: 'teramo.webp',
    url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=80&fm=webp',
  },
];

const outDir = path.resolve('public/images');
await fs.mkdir(outDir, { recursive: true });

for (const img of IMAGES) {
  const res = await fetch(img.url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${img.name}: ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(path.join(outDir, img.name), buf);
  console.log(`Saved ${img.name} (${buf.length} bytes)`);
}

