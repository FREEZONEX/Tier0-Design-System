#!/usr/bin/env node
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, resolve } from 'node:path';

const args = process.argv.slice(2);
const take = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : undefined; };
const projectArg = take('--project');
const port = Number(take('--port') ?? 5050);
if (!projectArg || !Number.isInteger(port)) {
  console.error('Usage: node scripts/start-tier0-intake.mjs --project <project-directory> [--port 5050]');
  process.exit(2);
}

const project = resolve(projectArg);
const intakeRoot = resolve(project, 'intake');
const uploadRoot = resolve(intakeRoot, 'uploads');
const page = readFileSync(resolve(dirname(new URL(import.meta.url).pathname), '../assets/tier0-intake.html'));
mkdirSync(uploadRoot, { recursive: true });

const safeName = (name) => basename(name).replace(/[^\w.()-]+/g, '-').replace(/^[-.]+/, '') || 'upload.bin';
const nextPath = (filename) => {
  const ext = extname(filename); const stem = filename.slice(0, filename.length - ext.length) || 'upload'; let candidate = filename; let n = 1;
  while (true) { try { readFileSync(resolve(uploadRoot, candidate)); candidate = `${stem}-${n++}${ext}`; } catch { return resolve(uploadRoot, candidate); } }
};
const readBody = (req) => new Promise((resolveBody, reject) => { const chunks=[]; let bytes=0; req.on('data', chunk => { bytes += chunk.length; if (bytes > 250 * 1024 * 1024) { reject(new Error('Uploads exceed the 250 MB intake limit.')); req.destroy(); } else chunks.push(chunk); }); req.on('end', () => resolveBody(Buffer.concat(chunks))); req.on('error', reject); });
const parseMultipart = (body, boundary) => {
  const boundaryBuffer = Buffer.from(`--${boundary}`); const fields = {}; const files = []; let start = body.indexOf(boundaryBuffer) + boundaryBuffer.length;
  while (start > boundaryBuffer.length - 1 && start < body.length) {
    if (body.slice(start, start + 2).toString() === '--') break;
    if (body.slice(start, start + 2).toString() === '\r\n') start += 2;
    const end = body.indexOf(boundaryBuffer, start); if (end < 0) break;
    const part = body.slice(start, end - 2); const headerEnd = part.indexOf(Buffer.from('\r\n\r\n')); if (headerEnd >= 0) {
      const header = part.slice(0, headerEnd).toString('utf8'); const value = part.slice(headerEnd + 4); const name = header.match(/name="([^"]+)"/)?.[1]; const filename = header.match(/filename="([^"]*)"/)?.[1]; const mime = header.match(/Content-Type:\s*([^\r\n]+)/i)?.[1] ?? 'application/octet-stream';
      if (name && filename) files.push({ name, filename, mime, value }); else if (name) fields[name] = value.toString('utf8');
    }
    start = end + boundaryBuffer.length;
  }
  return { fields, files };
};
const send = (res, code, payload) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(payload)); };

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(page); return; }
  if (req.method !== 'POST' || req.url !== '/api/intake') { res.writeHead(404); res.end('Not found'); return; }
  try {
    const match = req.headers['content-type']?.match(/multipart\/form-data;\s*boundary=(.+)/i); if (!match) throw new Error('Expected a multipart form submission.');
    const { fields, files } = parseMultipart(await readBody(req), match[1]); const saved = [];
    for (const file of files.filter(item => item.name === 'sourceFiles' && item.filename)) { const path = nextPath(safeName(file.filename)); writeFileSync(path, file.value); saved.push({ originalName: file.filename, storedPath: `intake/uploads/${basename(path)}`, mime: file.mime, bytes: file.value.length }); }
    const bool = (key) => fields[key] === 'true';
    if (!bool('deliverHtml') && !bool('deliverPptx')) throw new Error('Choose at least one delivery format.');
    if (bool('showCoverMetadata') && (!fields.presentationDate || !fields.speakerName?.trim())) {
      throw new Error('Cover metadata needs a presentation date and speaker name.');
    }
    const request = { version: '1.0', createdAt: new Date().toISOString(), delivery: { html: bool('deliverHtml'), pptx: bool('deliverPptx') }, cover: { showMetadata: bool('showCoverMetadata'), date: fields.presentationDate || '', speakerName: fields.speakerName || '', speakerRole: fields.speakerRole || '' }, closing: { includeWebsiteAndQr: bool('includeClosingWebsite') }, narrative: { purpose: fields.purpose || 'sales', audience: fields.audience || '', language: fields.language || 'zh-CN', duration: fields.duration || '10-20', sourceTreatment: fields.sourceTreatment || 'source-faithful', researchPolicy: fields.researchPolicy || 'no', mustKeep: fields.mustKeep || '', sourceNotes: fields.sourceNotes || '' }, brand: { system: 'tier0', customStyleAllowed: false }, uploads: saved };
    const manifest = resolve(intakeRoot, 'request.json'); writeFileSync(manifest, `${JSON.stringify(request, null, 2)}\n`); send(res, 200, { ok: true, manifest: 'intake/request.json', uploads: saved.length });
  } catch (error) { send(res, 400, { ok: false, error: error.message }); }
});
server.listen(port, '127.0.0.1', () => console.log(`Tier0 intake ready: http://127.0.0.1:${port}\nProject: ${project}\nManifest: intake/request.json`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
