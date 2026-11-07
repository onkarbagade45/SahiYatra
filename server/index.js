import crypto from 'crypto';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  hubs,
  quickPills,
  dhabaMenu,
  festivalDemandData,
  driverPartnerQueue,
  activeJourneySeed
} from './data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 5000;
const AUTH_SECRET = process.env.SAHIYATRA_AUTH_SECRET || crypto.randomBytes(32).toString('hex');
const ALLOWED_ORIGINS = (process.env.SAHIYATRA_ALLOWED_ORIGINS || 'http://localhost:5000,http://127.0.0.1:5000,http://localhost:5173').split(',');

const sessions = new Map();
const journeys = new Map([['demo', structuredClone(activeJourneySeed)]]);
let bookings = [];
let festivalStats = structuredClone(festivalDemandData);
let driverQueue = structuredClone(driverPartnerQueue);
let dhabaOrders = [];
const requestCounts = new Map();

function randomId(prefix) {
  return `${prefix}-${crypto.randomBytes(8).toString('hex')}`;
}

function signSession(sessionId) {
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(sessionId).digest('base64url');
  return `${sessionId}.${signature}`;
}

function verifyToken(token) {
  if (!token || !token.includes('.')) return null;
  const [sessionId, signature] = token.split('.');
  if (!sessionId || !signature) return null;
  const expected = crypto.createHmac('sha256', AUTH_SECRET).update(sessionId).digest('base64url');
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  return sessions.get(sessionId) || null;
}

function parseCookies(req) {
  const cookies = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const [name, ...value] = part.trim().split('=');
    if (name) cookies[name] = decodeURIComponent(value.join('='));
  }
  return cookies;
}

function authenticate(req) {
  const authorization = req.headers.authorization || '';
  const bearer = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const cookieToken = parseCookies(req).sahiyatra_session;
  return verifyToken(bearer || cookieToken);
}

function requireRole(req, res, roles) {
  const user = authenticate(req);
  if (!user || !roles.includes(user.role)) {
    sendJSON(res, 403, { error: 'Forbidden' });
    return null;
  }
  return user;
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
    'Strict-Transport-Security': 'max-age=31536000'
  });
  res.end(JSON.stringify(data));
}

function cleanText(value, max = 120) {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>"'`]/g, '').trim().slice(0, max);
}

function readBody(req, res, limit = 64 * 1024) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > limit) {
        sendJSON(res, 413, { error: 'Request body too large' });
        req.destroy();
      }
    });
    req.on('end', () => {
      if (req.destroyed) return resolve(null);
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        sendJSON(res, 400, { error: 'Invalid JSON' });
        resolve(null);
      }
    });
  });
}

function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  return !origin || ALLOWED_ORIGINS.includes(origin);
}

function applyRateLimit(req, res) {
  const key = `${req.socket.remoteAddress}:${req.url}`;
  const now = Date.now();
  const entry = requestCounts.get(key);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  entry.count += 1;
  if (entry.count > 120) {
    sendJSON(res, 429, { error: 'Too many requests' });
    return false;
  }
  return true;
}

function assembleRoutes(origin, destination, date, passengers = 1) {
  const pCount = Math.min(8, Math.max(1, Number.parseInt(passengers, 10) || 1));
  const safeOrigin = cleanText(origin, 160) || 'Ashok Chowk, Solapur';
  const safeDestination = cleanText(destination, 160) || 'Hinjawadi IT Park Phase 1, Pune';
  const safeDate = /^\d{4}-\d{2}-\d{2}$/.test(String(date || '')) ? date : new Date().toISOString().slice(0, 10);

  const planDefinitions = [
    ['plan-cheapest', 'Cheapest', 'किफायतशीर पर्याय', 'Best Value', 420, '5h 40m'],
    ['plan-fastest', 'Fastest', 'जलद कनेक्टेड पर्याय', 'Recommended', 610, '4h 30m'],
    ['plan-comfort', 'Comfort', 'आरामदायी वातानुकूलित पर्याय', 'Premium Comfort', 780, '4h 50m']
  ];

  const plans = planDefinitions.map(([planId, name, nameMr, badge, farePerPerson, totalDuration]) => ({
    planId,
    name,
    nameMr,
    totalDuration,
    totalFarePerPerson: farePerPerson,
    totalFare: farePerPerson * pCount,
    badge,
    zeroSurgeGuaranteed: true,
    legs: [
      { mode: 'Auto', from: safeOrigin, to: 'Solapur Old S.T. Stand', fare: (planId === 'plan-cheapest' ? 50 : planId === 'plan-fastest' ? 60 : 70) * pCount, otp: '4821' },
      { mode: planId === 'plan-comfort' ? 'AC Sleeper' : 'Bus', from: 'Solapur Old S.T. Stand', to: 'Swargate S.T. Stand, Pune', fare: (farePerPerson - (planId === 'plan-cheapest' ? 110 : planId === 'plan-fastest' ? 140 : 160)) * pCount },
      { mode: 'Auto', from: 'Swargate S.T. Stand', to: safeDestination, fare: (planId === 'plan-cheapest' ? 60 : planId === 'plan-fastest' ? 80 : 90) * pCount }
    ]
  }));

  return {
    origin: safeOrigin,
    destination: safeDestination,
    travelDate: safeDate,
    passengers: pCount,
    policy: 'No surge pricing. Late fee: ₹50 only if cancelled within 1 hour of departure',
    plans
  };
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  if (!isAllowedOrigin(req)) {
    return sendJSON(res, 403, { error: 'Origin not allowed' });
  }
  if (!applyRateLimit(req, res)) return;
  res.setHeader = res.setHeader.bind(res);

  const corsHeaders = {
    'Access-Control-Allow-Origin': req.headers.origin && ALLOWED_ORIGINS.includes(req.headers.origin) ? req.headers.origin : 'null',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
  res.writeHead = ((original) => function (status, headers = {}) {
    return original.call(this, status, { ...corsHeaders, ...headers });
  })(res.writeHead);

  if (method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (pathname === '/api/auth/demo-login' && method === 'POST') {
    const payload = await readBody(req, res);
    if (!payload) return;
    const role = ['customer', 'driver', 'operator'].includes(payload.role) ? payload.role : 'customer';
    const sessionId = crypto.randomBytes(24).toString('hex');
    sessions.set(sessionId, { id: randomId('user'), role, createdAt: Date.now() });
    res.setHeader('Set-Cookie', `sahiyatra_session=${signSession(sessionId)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=3600${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
    return sendJSON(res, 200, { role, token: signSession(sessionId) });
  }

  if (pathname === '/api/auth/logout' && method === 'POST') {
    const token = authenticate(req) ? (req.headers.authorization || '').replace('Bearer ', '') || parseCookies(req).sahiyatra_session : '';
    const sessionId = token.split('.')[0];
    sessions.delete(sessionId);
    res.setHeader('Set-Cookie', 'sahiyatra_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
    return sendJSON(res, 200, { success: true });
  }

  if (pathname === '/api/hubs' && method === 'GET') {
    return sendJSON(res, 200, { hubs, quickPills });
  }

  if (pathname === '/api/search' && method === 'POST') {
    const payload = await readBody(req, res);
    if (!payload) return;
    return sendJSON(res, 200, assembleRoutes(payload.origin, payload.destination, payload.date, payload.passengers));
  }

  if (pathname === '/api/bookings' && method === 'POST') {
    const user = requireRole(req, res, ['customer']);
    if (!user) return;
    const payload = await readBody(req, res);
    if (!payload) return;
    const planId = cleanText(payload.planId, 40);
    const passengerCount = Math.min(8, Math.max(1, Number.parseInt(payload.passengerCount, 10) || 1));
    const search = assembleRoutes(payload.origin, payload.destination, payload.travelDate, passengerCount);
    const plan = search.plans.find(item => item.planId === planId) || search.plans[1];
    const booking = {
      tripId: randomId('TRIP-MH'),
      bookingRef: randomId('SY').toUpperCase(),
      ownerId: user.id,
      passengerCount,
      travelDate: search.travelDate,
      origin: search.origin,
      destination: search.destination,
      totalFare: plan.totalFare,
      planType: plan.name,
      policy: search.policy,
      teenSafeRide: payload.teenSafeRide === true,
      teenPin: payload.teenSafeRide === true ? crypto.randomInt(1000, 10000).toString() : null,
      legs: plan.legs,
      status: 'Confirmed'
    };
    bookings.push(booking);
    journeys.set(booking.tripId, structuredClone(booking));
    return sendJSON(res, 201, { success: true, booking });
  }

  const journeyMatch = pathname.match(/^\/api\/journey\/([^/]+)$/);
  if (journeyMatch && method === 'GET') {
    const user = requireRole(req, res, ['customer', 'driver', 'operator']);
    if (!user) return;
    const tripId = journeyMatch[1];
    const journey = journeys.get(tripId);
    if (!journey || (user.role === 'customer' && journey.ownerId !== user.id)) {
      return sendJSON(res, 404, { error: 'Journey not found' });
    }
    return sendJSON(res, 200, journey);
  }

  if (pathname.startsWith('/api/journey/') && pathname.endsWith('/delay-sim') && method === 'POST') {
    const user = requireRole(req, res, ['operator']);
    if (!user) return;
    const tripId = pathname.split('/')[3];
    const journey = journeys.get(tripId);
    if (!journey) return sendJSON(res, 404, { error: 'Journey not found' });
    const payload = await readBody(req, res);
    if (!payload) return;
    const delay = Math.min(180, Math.max(0, Number.parseInt(payload.delayMins, 10) || 0));
    journey.delayMins = delay;
    journey.delayStatus = delay > 0 ? 'Intelligent Buffer Active' : 'On Time';
    return sendJSON(res, 200, { success: true, journey });
  }

  if (pathname.startsWith('/api/journey/') && pathname.endsWith('/sos') && method === 'POST') {
    const user = requireRole(req, res, ['customer']);
    if (!user) return;
    const tripId = pathname.split('/')[3];
    const journey = journeys.get(tripId);
    if (!journey || journey.ownerId !== user.id) return sendJSON(res, 404, { error: 'Journey not found' });
    const payload = await readBody(req, res);
    if (!payload) return;
    const lat = Number(payload.latitude);
    const lng = Number(payload.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      return sendJSON(res, 400, { error: 'Valid latitude and longitude are required' });
    }
    journey.sos = { initiatedAt: new Date().toISOString(), status: 'Emergency request recorded - Dial 112 directly' };
    return sendJSON(res, 202, {
      accepted: true,
      guidance: 'Call 112 for immediate police or medical emergency. Your location was not shared with external services by this demo backend.',
      emergencyNumber: '112'
    });
  }

  if (pathname === '/api/dhaba/menu' && method === 'GET') {
    return sendJSON(res, 200, { dhabaName: 'Hotel Jagdamba Highway Dhaba', hygieneRating: '4.5★ Audited', menu: dhabaMenu });
  }

  if (pathname === '/api/dhaba/order' && method === 'POST') {
    const user = requireRole(req, res, ['customer']);
    if (!user) return;
    const payload = await readBody(req, res);
    if (!payload || !Array.isArray(payload.items)) return sendJSON(res, 400, { error: 'items must be an array' });
    const quantities = new Map(payload.items.map(item => [cleanText(item.id, 40), Math.min(10, Math.max(0, Number.parseInt(item.quantity, 10) || 0))]));
    let totalAmount = 0;
    const verifiedItems = [];
    for (const item of dhabaMenu) {
      const quantity = quantities.get(item.id) || 0;
      if (quantity > 0) {
        totalAmount += item.price * quantity;
        verifiedItems.push({ id: item.id, quantity, price: item.price });
      }
    }
    if (!verifiedItems.length) return sendJSON(res, 400, { error: 'At least one valid item is required' });
    const order = { orderToken: randomId('DH').toUpperCase(), ownerId: user.id, items: verifiedItems, totalAmount, status: 'Received' };
    dhabaOrders.push(order);
    return sendJSON(res, 201, { success: true, order });
  }

  if (pathname === '/api/festival-demand' && method === 'GET') {
    const user = requireRole(req, res, ['operator']);
    if (!user) return;
    return sendJSON(res, 200, { festival: 'Diwali Week Demand', analytics: festivalStats, standbyBusesAvailable: 12 });
  }

  if (pathname === '/api/festival-demand/deploy-standby' && method === 'POST') {
    const user = requireRole(req, res, ['operator']);
    if (!user) return;
    festivalStats = festivalStats.map(item => ({ ...item, standbyDeployed: item.standbyDeployed + 2 }));
    return sendJSON(res, 200, { success: true, analytics: festivalStats });
  }

  if (pathname === '/api/driver/queue' && method === 'GET') {
    const user = requireRole(req, res, ['driver']);
    if (!user) return;
    const queue = driverQueue.map(({ otp, customer, parentVerified, policeLinked, ...ride }) => ({ ...ride, customer: 'Verified Passenger' }));
    return sendJSON(res, 200, { queue });
  }

  if (pathname === '/api/driver/respond' && method === 'POST') {
    const user = requireRole(req, res, ['driver']);
    if (!user) return;
    const payload = await readBody(req, res);
    if (!payload) return;
    const rideId = cleanText(payload.rideId, 80);
    const action = cleanText(payload.action, 20).toUpperCase();
    if (!['ACCEPT', 'DECLINE'].includes(action)) return sendJSON(res, 400, { error: 'Invalid action' });
    driverQueue = driverQueue.filter(ride => ride.rideId !== rideId);
    return sendJSON(res, 200, { success: true, rideId, action });
  }

  const publicRoot = path.resolve(__dirname, '../public');
  let filePath = path.resolve(publicRoot, pathname === '/' ? 'index.html' : pathname.slice(1));
  if (filePath !== publicRoot && !filePath.startsWith(publicRoot + path.sep)) {
    filePath = path.join(publicRoot, 'index.html');
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, '../public/index.html');
  }
  fs.readFile(filePath, (err, content) => {
    if (err) return sendJSON(res, 500, { error: 'Server error' });
    const ext = path.extname(filePath).toLowerCase();
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)'
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`SahiYatra secure demo server listening on http://localhost:${PORT}`);
});
