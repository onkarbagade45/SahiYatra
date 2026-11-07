// Pre-seeded database for SahiYatra (Maharashtra Transit Corridors)

export const hubs = [
  { id: 'sol-stand', name: 'Solapur Old S.T. Stand', city: 'Solapur', marathi: 'सोलापूर जुना एस.टी. स्टँड', type: 'bus_stand' },
  { id: 'sol-stn', name: 'Solapur Railway Station', city: 'Solapur', marathi: 'सोलापूर रेल्वे स्टेशन', type: 'railway' },
  { id: 'sol-siddheshwar', name: 'Siddheshwar Temple, Solapur', city: 'Solapur', marathi: 'सिद्धेश्वर मंदिर, सोलापूर', type: 'temple' },
  { id: 'sol-ashok', name: 'Ashok Chowk, Solapur', city: 'Solapur', marathi: 'अशोक चौक, सोलापूर', type: 'local_hub' },
  { id: 'sol-midc', name: 'Solapur MIDC Chhatrapati Sambhaji Chowk', city: 'Solapur', marathi: 'सोलापूर एमआयडीसी', type: 'industrial' },

  { id: 'pune-swargate', name: 'Swargate S.T. Stand, Pune', city: 'Pune', marathi: 'स्वारगेट एस.टी. स्टँड, पुणे', type: 'bus_stand' },
  { id: 'pune-stn', name: 'Pune Railway Station', city: 'Pune', marathi: 'पुणे रेल्वे स्टेशन', type: 'railway' },
  { id: 'pune-shivajinagar', name: 'Shivajinagar S.T. Stand, Pune', city: 'Pune', marathi: 'शिवाजीनगर एस.टी. स्टँड, पुणे', type: 'bus_stand' },
  { id: 'pune-hinjawadi', name: 'Hinjawadi IT Park Phase 1, Pune', city: 'Pune', marathi: 'हिंजवडी आयटी पार्क, पुणे', type: 'tech_park' },
  { id: 'pune-ruby', name: 'Ruby Hall Clinic (Hospital), Pune', city: 'Pune', marathi: 'रुबी हॉल क्लिनिक, पुणे', type: 'hospital' },
  { id: 'pune-hadapsar', name: 'Hadapsar Gadital Hub, Pune', city: 'Pune', marathi: 'हडपसर गाडीतळ, पुणे', type: 'local_hub' },
  { id: 'pune-kothrud', name: 'Kothrud Karve Statue, Pune', city: 'Pune', marathi: 'कोथरूड कर्वे पुतळा, पुणे', type: 'local_hub' },

  { id: 'mum-dadar', name: 'Dadar Asiad Bus Stand, Mumbai', city: 'Mumbai', marathi: 'दादर एशियाड बस स्टँड, मुंबई', type: 'bus_stand' },
  { id: 'mum-csmt', name: 'CSMT Railway Terminus, Mumbai', city: 'Mumbai', marathi: 'सीएसएमटी रेल्वे टर्मिनस, मुंबई', type: 'railway' },
  { id: 'mum-borivali', name: 'Borivali Highway Stand, Mumbai', city: 'Mumbai', marathi: 'बोरिवली हायवे स्टँड, मुंबई', type: 'bus_stand' },

  { id: 'kol-cbs', name: 'CBS Central Bus Stand, Kolhapur', city: 'Kolhapur', marathi: 'मध्यवर्ती बस स्थानक (CBS), कोल्हापूर', type: 'bus_stand' },
  { id: 'kol-temple', name: 'Mahalaxmi Ambabai Temple, Kolhapur', city: 'Kolhapur', marathi: 'महालक्ष्मी अंबाबाई मंदिर, कोल्हापूर', type: 'temple' },

  { id: 'pan-stand', name: 'Pandharpur S.T. Stand', city: 'Pandharpur', marathi: 'पंढरपूर एस.टी. स्टँड', type: 'bus_stand' },
  { id: 'pan-temple', name: 'Shri Vitthal-Rukmini Mandir, Pandharpur', city: 'Pandharpur', marathi: 'श्री विठ्ठल-रुक्मिणी मंदिर, पंढरपूर', type: 'temple' }
];

export const quickPills = [
  { label: 'Solapur ST Stand', origin: 'Ashok Chowk, Solapur', destination: 'Swargate S.T. Stand, Pune' },
  { label: 'Pune Station to Solapur', origin: 'Pune Railway Station', destination: 'Solapur Old S.T. Stand' },
  { label: 'Pandharpur Temple Yatra', origin: 'Swargate S.T. Stand, Pune', destination: 'Shri Vitthal-Rukmini Mandir, Pandharpur' },
  { label: 'Hinjawadi IT Park Commute', origin: 'Ashok Chowk, Solapur', destination: 'Hinjawadi IT Park Phase 1, Pune' },
  { label: 'Ruby Hall Hospital (Pune)', origin: 'Solapur Old S.T. Stand', destination: 'Ruby Hall Clinic (Hospital), Pune' }
];

export const dhabaMenu = [
  {
    id: 'thali-spl',
    name: 'Special Maharashtrian Veg Thali',
    nameMr: 'विशेष महाराष्ट्रीयन शाकाहारी थाळी',
    price: 90,
    timeMins: 3,
    badge: 'Bestseller',
    desc: '3 Chapati / 2 Jowar Bhakri, Pithla, Shengdana Usal, Dal Tadka, Jeera Rice, Thecha, Gulab Jamun.',
    hygiene: '4.8★ FSSAI Certified'
  },
  {
    id: 'poha-kanda',
    name: 'Kanda Poha with Sev & Nimbu',
    nameMr: 'कांदा पोहे (शेव आणि लिंबू)',
    price: 30,
    timeMins: 2,
    badge: 'Quick Snack',
    desc: 'Freshly steamed Indori style poha with roasted peanuts, fresh coriander, spicy green thecha side.',
    hygiene: '4.7★ Hot & Fresh'
  },
  {
    id: 'chai-kulhad',
    name: 'Special Masala Chai (Kulhad)',
    nameMr: 'मसाला चहा (कुल्हड)',
    price: 10,
    timeMins: 1,
    badge: 'Transit Classic',
    desc: 'Adrak & Elaichi brewed rich hot chai served in eco-friendly terracotta earthen cup.',
    hygiene: 'Boiled at 100°C'
  },
  {
    id: 'water-mineral',
    name: 'Mineral Water (Chilled 1L)',
    nameMr: 'थंड मिनरल वॉटर (१ लिटर)',
    price: 20,
    timeMins: 1,
    badge: 'Sealed',
    desc: 'ISI Packaged Drinking Water bottle, pre-chilled for in-bus journey refreshment.',
    hygiene: '100% Sealed'
  },
  {
    id: 'misal-pav',
    name: 'Puneri Kat Misal Pav (2 Pav + Farsan)',
    nameMr: 'झणझणीत मिसळ पाव',
    price: 50,
    timeMins: 3,
    badge: 'Spicy Favorite',
    desc: 'Sprouted moth beans in authentic fiery tarri rassa, special Kolhapuri farsan, chopped onions, and lemon.',
    hygiene: '4.6★ Audited'
  },
  {
    id: 'bhakri-chutney',
    name: 'Solapuri Shenga Chutney & 2 Jowar Bhakri',
    nameMr: 'सोलापुरी शेंगदाणा चटणी व २ ज्वारी भाकरी',
    price: 80,
    timeMins: 3,
    badge: 'Regional Delicacy',
    desc: 'Handmade piping hot jowar bhakri served with Solapuri roasted peanut garlic dry chutney, white butter, and raw onion.',
    hygiene: '4.9★ Local Specialty'
  }
];

export const festivalDemandData = [
  { day: 'Mon (Dhanteras)', unserved: 1420, waitlist: 890, standbyDeployed: 2, capacity: '92% Full' },
  { day: 'Tue (Naraka Chaturdashi)', unserved: 2350, waitlist: 1540, standbyDeployed: 4, capacity: '98% Overbooked' },
  { day: 'Wed (Lakshmi Pujan)', unserved: 3100, waitlist: 2120, standbyDeployed: 6, capacity: '100% Saturated' },
  { day: 'Thu (Balipratipada / Padwa)', unserved: 2780, waitlist: 1850, standbyDeployed: 5, capacity: '96% Surge' },
  { day: 'Fri (Bhai Dooj)', unserved: 3450, waitlist: 2410, standbyDeployed: 8, capacity: '100% Saturated' }
];

export const driverPartnerQueue = [
  {
    rideId: 'RIDE-AUTO-101',
    customer: 'Demo Passenger A (Family 3)',
    rating: '4.9★',
    pickup: 'Ashok Chowk, Solapur',
    pickupMr: 'अशोक चौक, सोलापूर',
    drop: 'Solapur Old S.T. Stand (Bay 4)',
    dropMr: 'सोलापूर जुना एस.टी. स्टँड (प्लॅटफॉर्म ४)',
    fare: 60,
    distanceKm: 3.2,
    otp: 'Demo OTP hidden',
    status: 'Ready for Dispatch',
    teenSafe: false,
    standHelpPoint: 'Stand Gate A - Fast Track Lane'
  },
  {
    rideId: 'RIDE-AUTO-102',
    customer: 'Demo Student Passenger',
    rating: '5.0★',
    pickup: 'Saat Rasta, Solapur',
    pickupMr: 'सात रस्ता, सोलापूर',
    drop: 'Solapur Railway Station',
    dropMr: 'सोलापूर रेल्वे स्टेशन',
    fare: 75,
    distanceKm: 4.1,
    otp: 'Demo OTP hidden',
    status: 'Incoming Request',
    teenSafe: true,
    parentVerified: 'Verified Parent (contact masked)',
    policeLinked: 'Demo safety grid reference',
    standHelpPoint: 'Station Prepaid Auto Booth'
  },
  {
    rideId: 'RIDE-AUTO-103',
    customer: 'Nitin Mane (Solo Executive)',
    rating: '4.8★',
    pickup: 'Swargate Stand Bay 2, Pune',
    pickupMr: 'स्वारगेट बस स्थानक बे २, पुणे',
    drop: 'Hinjawadi IT Park Phase 1',
    dropMr: 'हिंजवडी आयटी पार्क फेज १, पुणे',
    fare: 80,
    distanceKm: 18.5,
    otp: 'Demo OTP hidden',
    status: 'Held for Inbound Bus',
    teenSafe: false,
    standHelpPoint: 'Swargate Prepaid Outbound Deck'
  }
];

export const activeJourneySeed = {
  tripId: 'TRIP-MH-84920',
  bookingRef: 'SY-2026-98124',
  passengerName: 'Demo Passenger',
  passengerCount: 1,
  travelDate: '2026-11-07',
  origin: 'Ashok Chowk, Solapur',
  destination: 'Hinjawadi IT Park Phase 1, Pune',
  totalFare: 470,
  planType: 'Fastest (Smart Connected)',
  policy: 'No surge pricing. Late fee: ₹50 only if cancelled within 1 hour of departure',
  currentLegIndex: 1, // 0: Auto 1, 1: Bus In-Transit, 2: Auto 2
  delayMins: 15,
  delayStatus: 'Intelligent Buffer Active',
  delayNote: '+15 min delay detected due to Hadapsar traffic — intelligent buffer activated, next auto held at Swargate Bay 2 for your arrival without waiting charges.',
  shareableTrackingUrl: 'https://sahiyatra.app/track/TRIP-MH-84920-LIVE-GPS',
  teenSafeRide: false,

  legs: [
    {
      id: 'leg-1',
      mode: 'Auto Rickshaw',
      icon: 'Car',
      title: 'First-Mile Auto: Doorstep to S.T. Stand',
      titleMr: 'पहिली पायरी: रिक्षा - घर ते एस.टी. स्टँड',
      from: 'Ashok Chowk, Solapur',
      to: 'Solapur Old S.T. Stand (Platform 4)',
      toMr: 'सोलापूर जुना एस.टी. स्टँड (प्लॅटफॉर्म ४)',
      fare: 60,
      otp: '4821',
      driverName: 'Ramesh Jadhav',
      driverPhone: 'Masked',
      vehicleNo: 'DEMO-AUTO-01',
      vehicleModel: 'Bajaj RE Green CNG Auto',
      driverRating: 4.7,
      tripsDone: 1240,
      duration: '15 mins',
      status: 'Completed',
      bufferMins: 15,
      sosContact: '112 (MH Police Emergency)'
    },
    {
      id: 'leg-2',
      mode: 'MSRTC Bus',
      icon: 'Bus',
      title: 'Intercity Bus: MSRTC Shivshahi AC',
      titleMr: 'दुसरी पायरी: एमएसआरटीसी शिवशाही वातानुकूलित बस',
      from: 'Solapur Old S.T. Stand',
      to: 'Swargate S.T. Stand, Pune',
      toMr: 'स्वारगेट एस.टी. स्टँड, पुणे',
      fare: 330,
      busNumber: 'DEMO-BUS-01',
      serviceType: 'MSRTC Shivshahi Express AC',
      platform: 'Platform #4',
      seatNumbers: 'Seat 14A (Window)',
      departureTime: '11:00 AM',
      scheduledArrival: '03:30 PM',
      estimatedArrival: '03:45 PM',
      duration: '4h 30m',
      status: 'In Transit',
      speedKmph: 72,
      currentLocation: 'Indapur Highway Bypass (Near Hotel Jagdamba)',
      highwayStop: {
        name: 'Hotel Jagdamba Highway Dhaba',
        nameMr: 'हॉटेल जगदंबा हायवे ढाबा',
        arrivalTime: '02:30 PM',
        haltDuration: '25 mins',
        hygieneRating: '4.5★ Audited',
        washroomStatus: 'Clean & Sanitized Verified',
        ordersAllowed: true
      }
    },
    {
      id: 'leg-3',
      mode: 'Auto Rickshaw',
      icon: 'Car',
      title: 'Last-Mile Auto: Swargate to Hinjawadi IT Park',
      titleMr: 'तिसरी पायरी: रिक्षा - स्वारगेट ते हिंजवडी आयटी पार्क',
      from: 'Swargate S.T. Stand (Bay 2)',
      fromMr: 'स्वारगेट एस.टी. स्टँड (बे २)',
      to: 'Hinjawadi IT Park Phase 1, Pune',
      toMr: 'हिंजवडी आयटी पार्क फेज १, पुणे',
      fare: 80,
      otp: '9152',
      driverName: 'Santosh Shinde',
      driverPhone: 'Masked',
      vehicleNo: 'DEMO-AUTO-02',
      vehicleModel: 'Piaggio Ape City Smart Auto',
      driverRating: 4.8,
      status: 'Held on Arrival (Buffer Engaged)',
      notes: 'Driver informed of +15m bus arrival delay. Auto will remain at Bay #2 with zero surge fee.'
    }
  ]
};
