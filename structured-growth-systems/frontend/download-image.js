import fs from 'fs';
import https from 'https';
import path from 'path';

const fileId = '1dhFp9P_ySmBTbfeaazpoWpC8jzSLpEkt';
const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const dest = path.join(publicDir, 'profile.jpg');

https.get(url, (res) => {
  if (res.statusCode === 302 || res.statusCode === 303) {
    https.get(res.headers.location, (redirectRes) => {
      const file = fs.createWriteStream(dest);
      redirectRes.pipe(file);
      file.on('finish', () => {
        file.close();
      });
    });
  } else {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
    });
  }
}).on('error', (err) => {
  console.error('Error downloading file:', err.message);
});
