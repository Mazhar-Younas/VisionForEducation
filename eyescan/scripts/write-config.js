const fs = require('fs');
const path = require('path');

const apiBase = (process.env.API_BASE_URL || process.env.VITE_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
if (process.env.VERCEL && !apiBase) {
  throw new Error('API_BASE_URL must point to the deployed Railway backend when building on Vercel.');
}
const config = {
  apiBase,
};

const outDir = path.join(__dirname, '..', 'public');
const outFile = path.join(outDir, 'config.js');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  outFile,
  'window.__APP_CONFIG__ = ' + JSON.stringify(config) + ';\n',
  'utf8'
);
console.log('Wrote frontend config to ' + outFile + ' (apiBase=' + JSON.stringify(apiBase) + ')');
