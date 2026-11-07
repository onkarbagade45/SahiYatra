import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const PORT = Number(process.env.PORT) || 5000;
const root = process.cwd();

function json(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'"
  });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 64 * 1024) reject(new Error('Request too large'));
    });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { reject(new Error('Invalid JSON')); }
    });
  });
}

function plans(origin = 'Ashok Chowk, Solapur', destination = 'Hinjawadi IT Park Phase 1, Pune', passengers = 1) {
  const count = Math.min(8, Math.max(1, Number(passengers) || 1));
  return [
    { planId: 'cheapest', name: 'Cheapest', totalDuration: '5h 40m', totalFarePerPerson: 420, totalFare: 420 * count, badge: 'Best Value', legs: [{ mode: 'Auto', fare: 50 * count }, { mode: 'Bus', fare: 310 * count }, { mode: 'Auto', fare: 60 * count }] },
    { planId: 'fastest', name: 'Fastest', totalDuration: '4h 30m', totalFarePerPerson: 610, totalFare: 610 * count, badge: 'Recommended', legs: [{ mode: 'Auto', fare: 60 * count }, { mode: 'Express Bus', fare: 470 * count }, { mode: 'Auto', fare: 80 * count }] },
    { planId: 'comfort', name: 'Comfort', totalDuration: '4h 50m', totalFarePerPerson: 780, totalFare: 780 * count, badge: 'Premium Comfort', legs: [{ mode: 'Auto', fare: 70 * count }, { mode: 'AC Sleeper', fare: 620 * count }, { mode: 'Auto', fare: 90 * count }] }
  ];
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' });
    return res.end();
  }

  if (url.pathname === '/api/hubs' && req.method === 'GET') {
    return json(res, 200, { hubs: ['Solapur ST Stand', 'Pune Railway Station', 'Siddheshwar Temple', 'Ruby Hall Hospital'], quickPills: ['ST Stand', 'Railway Station', 'Temple', 'Hospital'] });
  }
  if (url.pathname === '/api/search' && req.method === 'POST') {
    try {
      const body = await readJson(req);
      return json(res, 200, { origin: body.origin || 'Ashok Chowk, Solapur', destination: body.destination || 'Hinjawadi IT Park Phase 1, Pune', travelDate: body.date || new Date().toISOString().slice(0, 10), passengers: body.passengers || 1, policy: 'No surge pricing. Late fee: ₹50 only if cancelled within 1 hour of departure', plans: plans(body.origin, body.destination, body.passengers) });
    } catch (error) { return json(res, 400, { error: error.message }); }
  }
  if (url.pathname === '/api/bookings' && req.method === 'POST') {
    try {
      const body = await readJson(req);
      const plan = plans()[body.planId === 'cheapest' ? 0 : body.planId === 'comfort' ? 2 : 1];
      return json(res, 201, { success: true, booking: { bookingRef: `SY-${Date.now().toString().slice(-6)}`, status: 'Confirmed', totalFare: plan.totalFarePerPerson, policy: 'No surge pricing. Late fee: ₹50 only if cancelled within 1 hour of departure', planType: plan.name } });
    } catch { return json(res, 400, { error: 'Invalid booking' }); }
  }

  if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'Not found' });

  const requested = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  const filePath = path.resolve(root, requested);
  if (filePath !== root && !filePath.startsWith(root + path.sep)) return json(res, 403, { error: 'Forbidden' });
  fs.readFile(filePath, (error, content) => {
    if (error || fs.statSync(filePath, { throwIfNoEntry: false })?.isDirectory()) {
      return fs.readFile(path.join(root, 'index.html'), (_err, fallback) => {
        if (_err) return json(res, 404, { error: 'App not found' });
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fallback);
      });
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': ext === '.html' ? 'text/html; charset=utf-8' : ext === '.js' ? 'text/javascript' : ext === '.css' ? 'text/css' : 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY' });
    res.end(content);
  });
});

server.listen(PORT, '0.0.0.0', () => console.log(`SahiYatra demo listening on port ${PORT}`));
