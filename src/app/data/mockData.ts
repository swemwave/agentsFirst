export interface Listing {
  id: string;
  address: string;
  city: string;
  postalCode: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  status: "active" | "pending" | "sold";
  dateAdded: string;
  assessedValue: number;
  description: string;
  images: string[];
  agentId: string;
  agentName: string;
  community: string;
  lat: number;
  lng: number;
  flags?: number;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "agent" | "admin";
  status: "active" | "inactive";
  joinDate: string;
}

export interface Appointment {
  id: string;
  listingId: string;
  listingAddress: string;
  date: string;
  time: string;
  type: "viewing" | "meeting" | "possession";
  status: "scheduled" | "cancelled" | "completed";
  agentName: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
}

export const mockListings: Listing[] = [
  {
    id: "1",
    address: "2345 Elbow Drive SW",
    city: "Calgary",
    postalCode: "T2S 2L1",
    price: 875000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    type: "Single Family",
    status: "active",
    dateAdded: "2026-02-20",
    assessedValue: 825000,
    description: "Beautiful family home in sought-after Elbow Park. Recently renovated kitchen with quartz countertops, new hardwood throughout, and finished basement.",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
    agentId: "fahad",
    agentName: "Fahad",
    community: "Elbow Park",
    lat: 51.0225,
    lng: -114.0799,
    flags: 0,
    notes: "Owner motivated to sell. New photos needed for kitchen renovation.",
  },
  {
    id: "2",
    address: "1234 Kensington Road NW",
    city: "Calgary",
    postalCode: "T2N 3P7",
    price: 625000,
    beds: 3,
    baths: 2.5,
    sqft: 1850,
    type: "Townhouse",
    status: "active",
    dateAdded: "2026-02-25",
    assessedValue: 600000,
    description: "Modern townhouse in the heart of Kensington. Walk to shops, restaurants, and transit. Open concept living with rooftop patio.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"],
    agentId: "fahad",
    agentName: "Fahad",
    community: "Kensington",
    lat: 51.0535,
    lng: -114.0845,
    notes: "High interest - 3 showings this week.",
  },
  {
    id: "3",
    address: "567 Mission Road SW",
    city: "Calgary",
    postalCode: "T2S 4B3",
    price: 1250000,
    beds: 5,
    baths: 4,
    sqft: 3600,
    type: "Single Family",
    status: "active",
    dateAdded: "2026-02-15",
    assessedValue: 1180000,
    description: "Stunning executive home with panoramic city views. Gourmet kitchen, wine cellar, home theatre, and landscaped yard with hot tub.",
    images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800", "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800"],
    agentId: "fahad",
    agentName: "Fahad",
    community: "Mission",
    lat: 51.0275,
    lng: -114.0730,
    flags: 2,
    notes: "Follow up on flagged content - user reported incorrect sqft.",
  },
  {
    id: "4",
    address: "890 Memorial Drive NE",
    city: "Calgary",
    postalCode: "T2E 2K4",
    price: 485000,
    beds: 2,
    baths: 2,
    sqft: 1150,
    type: "Condo",
    status: "active",
    dateAdded: "2026-02-28",
    assessedValue: 470000,
    description: "Bright corner unit with river views. Updated kitchen and bathrooms, in-suite laundry, parking and storage included.",
    images: ["https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800"],
    agentId: "fahad",
    agentName: "Fahad",
    community: "Bridgeland",
    lat: 51.0540,
    lng: -114.0520,
  },
  {
    id: "5",
    address: "123 Mahogany Boulevard SE",
    city: "Calgary",
    postalCode: "T3M 1A4",
    price: 725000,
    beds: 4,
    baths: 3.5,
    sqft: 2600,
    type: "Single Family",
    status: "pending",
    dateAdded: "2026-02-10",
    assessedValue: 710000,
    description: "Beautiful lakeside property in Mahogany. Backing onto the lake with private dock access. Triple car garage.",
    images: ["https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800"],
    agentId: "fahad",
    agentName: "Fahad",
    community: "Mahogany",
    lat: 50.8916,
    lng: -113.9537,
  },
  {
    id: "6",
    address: "456 17th Avenue SW",
    city: "Calgary",
    postalCode: "T2S 0A9",
    price: 550000,
    beds: 2,
    baths: 2,
    sqft: 1300,
    type: "Condo",
    status: "active",
    dateAdded: "2026-02-22",
    assessedValue: 535000,
    description: "Urban living at its finest. Steps to shopping and dining on 17th Ave. High ceilings, modern finishes, and heated underground parking.",
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"],
    agentId: "fahad",
    agentName: "Fahad",
    community: "Beltline",
    lat: 51.0375,
    lng: -114.0740,
  },
];

export const mockUsers: User[] = [
  { id: "u1", name: "John Smith", email: "john@example.com", role: "buyer", status: "active", joinDate: "2025-11-15" },
  { id: "u2", name: "Emily Davis", email: "emily@example.com", role: "seller", status: "active", joinDate: "2026-01-20" },
  { id: "u3", name: "Robert Wilson", email: "robert@example.com", role: "buyer", status: "active", joinDate: "2026-02-01" },
  { id: "fahad", name: "Fahad", email: "fahad@finditwithfahad.com", role: "agent", status: "active", joinDate: "2020-01-15" },
  { id: "admin1", name: "Fahad (Admin)", email: "admin@finditwithfahad.com", role: "admin", status: "active", joinDate: "2020-01-15" },
];

export const mockAppointments: Appointment[] = [
  {
    id: "apt1",
    listingId: "1",
    listingAddress: "2345 Elbow Drive SW",
    date: "2026-03-05",
    time: "2:00 PM",
    type: "viewing",
    status: "scheduled",
    agentName: "Fahad",
    clientName: "John Smith",
    clientEmail: "john@example.com",
    clientPhone: "(403) 555-0123",
  },
  {
    id: "apt2",
    listingId: "3",
    listingAddress: "567 Mission Road SW",
    date: "2026-03-08",
    time: "10:00 AM",
    type: "viewing",
    status: "scheduled",
    agentName: "Fahad",
    clientName: "John Smith",
    clientEmail: "john@example.com",
    clientPhone: "(403) 555-0123",
  },
  {
    id: "apt3",
    listingId: "2",
    listingAddress: "1234 Kensington Road NW",
    date: "2026-03-03",
    time: "4:00 PM",
    type: "viewing",
    status: "completed",
    agentName: "Fahad",
    clientName: "Emily Davis",
    clientEmail: "emily@example.com",
    clientPhone: "(403) 555-0198",
  },
  {
    id: "apt4",
    listingId: "6",
    listingAddress: "456 17th Avenue SW",
    date: "2026-03-04",
    time: "11:00 AM",
    type: "viewing",
    status: "scheduled",
    agentName: "Fahad",
    clientName: "Robert Wilson",
    clientEmail: "robert@example.com",
    clientPhone: "(403) 555-0245",
  },
  {
    id: "apt5",
    listingId: "4",
    listingAddress: "890 Memorial Drive NE",
    date: "2026-03-06",
    time: "3:30 PM",
    type: "viewing",
    status: "scheduled",
    agentName: "Fahad",
    clientName: "Sarah Johnson",
    clientEmail: "sarah@example.com",
    clientPhone: "(403) 555-0367",
  },
  {
    id: "apt6",
    listingId: "1",
    listingAddress: "2345 Elbow Drive SW",
    date: "2026-03-07",
    time: "1:00 PM",
    type: "viewing",
    status: "scheduled",
    agentName: "Fahad",
    clientName: "Michael Chen",
    clientEmail: "michael@example.com",
    clientPhone: "(403) 555-0489",
  },
  {
    id: "apt7",
    listingId: "5",
    listingAddress: "123 Mahogany Boulevard SE",
    date: "2026-03-09",
    time: "9:00 AM",
    type: "viewing",
    status: "scheduled",
    agentName: "Fahad",
    clientName: "Lisa Anderson",
    clientEmail: "lisa@example.com",
    clientPhone: "(403) 555-0512",
  },
  {
    id: "apt8",
    listingId: "2",
    listingAddress: "1234 Kensington Road NW",
    date: "2026-03-10",
    time: "5:00 PM",
    type: "viewing",
    status: "scheduled",
    agentName: "Fahad",
    clientName: "David Kim",
    clientEmail: "david@example.com",
    clientPhone: "(403) 555-0634",
  },
];

export const wishlistIds = ["1", "3", "6"];

export const searchTerms = [
  { term: "Elbow Park", count: 245 },
  { term: "Kensington", count: 189 },
  { term: "Beltline condo", count: 156 },
  { term: "Mission", count: 134 },
  { term: "Lake view", count: 98 },
  { term: "Downtown", count: 87 },
];

export const kpiData = {
  activeListings: 156,
  newRequests: 23,
  appointmentsBooked: 47,
  avgReviewTime: "1.2 hrs",
};

export const weeklyListingsData = [
  { week: "Week 1", count: 12 },
  { week: "Week 2", count: 18 },
  { week: "Week 3", count: 15 },
  { week: "Week 4", count: 23 },
  { week: "Week 5", count: 19 },
  { week: "Week 6", count: 21 },
];

export const funnelData = [
  { stage: "Search", count: 1250 },
  { stage: "Details", count: 680 },
  { stage: "Wishlist", count: 245 },
  { stage: "Viewing Request", count: 128 },
  { stage: "Appointment", count: 47 },
];

export interface Bookmark {
  id: string;
  name: string;
  url: string;
  group: string;
  tags: string[];
  notes?: string;
}

export const mockBookmarks: Bookmark[] = [
  {
    id: "b1",
    name: "Pillar 9",
    url: "https://pillar9.com",
    group: "MLS / Pillar 9",
    tags: ["mls", "listings"],
    notes: "Main MLS portal",
  },
  {
    id: "b2",
    name: "Calgary Property Assessment Search",
    url: "https://assessmentsearch.calgary.ca",
    group: "Calgary Assessments",
    tags: ["assessment", "valuation"],
  },
  {
    id: "b3",
    name: "Community Profiles",
    url: "https://www.calgary.ca/communities",
    group: "Census / Community Data",
    tags: ["demographics", "community"],
  },
  {
    id: "b4",
    name: "Google Maps",
    url: "https://maps.google.com",
    group: "Maps / Tools",
    tags: ["maps", "directions"],
  },
  {
    id: "b5",
    name: "Internal Sales Documentation",
    url: "https://docs.internal.com/sales",
    group: "Internal docs",
    tags: ["docs", "training"],
  },
  {
    id: "b6",
    name: "REALTOR.ca",
    url: "https://www.realtor.ca",
    group: "MLS / Pillar 9",
    tags: ["mls", "listings", "public"],
    notes: "Public-facing MLS portal",
  },
  {
    id: "b7",
    name: "Alberta Land Titles",
    url: "https://alta.registries.gov.ab.ca",
    group: "Government / Legal",
    tags: ["land titles", "legal", "ownership"],
  },
  {
    id: "b8",
    name: "Calgary Building Permits",
    url: "https://maps.calgary.ca/build",
    group: "Government / Legal",
    tags: ["permits", "development"],
  },
  {
    id: "b9",
    name: "WalkScore",
    url: "https://www.walkscore.com",
    group: "Maps / Tools",
    tags: ["walkability", "transit", "amenities"],
  },
  {
    id: "b10",
    name: "School Rankings - FraserInstitute",
    url: "https://www.compareschoolrankings.org/alberta",
    group: "Census / Community Data",
    tags: ["schools", "education", "rankings"],
  },
  {
    id: "b11",
    name: "Calgary Transit Maps",
    url: "https://www.calgarytransit.com/maps",
    group: "Maps / Tools",
    tags: ["transit", "ctrain", "bus"],
  },
  {
    id: "b12",
    name: "Property Tax Calculator",
    url: "https://www.calgary.ca/pda/pd/property-tax.html",
    group: "Calgary Assessments",
    tags: ["tax", "calculator", "fees"],
  },
  {
    id: "b13",
    name: "CREB Statistics",
    url: "https://www.creb.com/housing_statistics",
    group: "Market Data",
    tags: ["statistics", "market", "trends"],
    notes: "Calgary Real Estate Board market statistics",
  },
  {
    id: "b14",
    name: "Zoning & Bylaws",
    url: "https://www.calgary.ca/pda/pd/zoning.html",
    group: "Government / Legal",
    tags: ["zoning", "bylaws", "regulations"],
  },
  {
    id: "b15",
    name: "Mortgage Calculator",
    url: "https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MCCalc-CHCalc-eng.aspx",
    group: "Financial Tools",
    tags: ["mortgage", "calculator", "finance"],
  },
];
