// VillaOS Seed Data — Realistic Phuket villa management data

export type VillaStatus = 'active' | 'inactive';
export type ReservationSource = 'airbnb' | 'booking_com' | 'direct' | 'agoda' | 'vrbo';
export type ReservationStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
export type TaskType = 'cleaning' | 'pool' | 'garden' | 'maintenance' | 'repair' | 'laundry';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type StaffRole = 'cleaner' | 'pool_tech' | 'gardener' | 'handyman' | 'driver';
export type ExpenseCategory = 'maintenance' | 'utilities' | 'supplies' | 'repairs' | 'staff' | 'other';

export interface Villa {
  id: string;
  name: string;
  address: string;
  bedrooms: number;
  max_guests: number;
  nightly_rate: number;
  images: string[];
  amenities: string[];
  description: string;
  status: VillaStatus;
}

export interface Reservation {
  id: string;
  villa_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  source: ReservationSource;
  total_revenue: number;
  status: ReservationStatus;
  commission_rate: number;
  notes: string;
}

export interface Task {
  id: string;
  villa_id: string;
  type: TaskType;
  assigned_to: string;
  scheduled_date: string;
  status: TaskStatus;
  priority: TaskPriority;
  notes: string;
  completed_at: string | null;
}

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  phone: string;
  daily_rate_thb: number;
  available: boolean;
}

export interface Expense {
  id: string;
  villa_id: string;
  category: ExpenseCategory;
  amount_thb: number;
  description: string;
  date: string;
}

export interface OwnerReport {
  id: string;
  villa_id: string;
  month: string;
  total_revenue: number;
  total_expenses: number;
  net_income: number;
  occupancy_rate: number;
  nights_booked: number;
}

// Helper to get dates relative to today
function relDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}

const today = relDate(0);

export const villas: Villa[] = [
  {
    id: 'v1',
    name: 'Villa Andaman Sunset',
    address: '42/7 Kamala Beach Road, Kamala, Kathu, Phuket 83150',
    bedrooms: 4,
    max_guests: 8,
    nightly_rate: 15000,
    images: [],
    amenities: ['Private Pool', 'Ocean View', 'BBQ', 'Parking', 'WiFi', 'Smart TV', 'Full Kitchen'],
    description: 'Stunning 4-bedroom villa overlooking the Andaman Sea in Kamala. Perfect for families and groups seeking luxury and tranquility.',
    status: 'active',
  },
  {
    id: 'v2',
    name: 'Villa Coral Bay',
    address: '18/3 Surin Beach Lane, Cherngtalay, Thalang, Phuket 83110',
    bedrooms: 3,
    max_guests: 6,
    nightly_rate: 12000,
    images: [],
    amenities: ['Private Pool', 'Garden', 'WiFi', 'Parking', 'Outdoor Shower', 'Yoga Deck'],
    description: 'Charming 3-bedroom villa nestled among tropical gardens near Surin Beach. Modern Balinese design with a private pool.',
    status: 'active',
  },
  {
    id: 'v3',
    name: 'Villa Patong Heights',
    address: '99/1 Phang Muang Sai Kor Road, Patong, Kathu, Phuket 83150',
    bedrooms: 5,
    max_guests: 10,
    nightly_rate: 22000,
    images: [],
    amenities: ['Infinity Pool', 'Gym', 'Cinema Room', 'Chef Service', 'Ocean View', 'Elevator', 'Wine Cellar'],
    description: 'Luxury 5-bedroom hilltop villa with panoramic views over Patong Bay. Premium finishes and full concierge service.',
    status: 'active',
  },
  {
    id: 'v4',
    name: 'Villa Kata Serenity',
    address: '25/9 Kata Noi Road, Karon, Mueang Phuket, Phuket 83100',
    bedrooms: 2,
    max_guests: 4,
    nightly_rate: 8000,
    images: [],
    amenities: ['Plunge Pool', 'Terrace', 'WiFi', 'Scooter Rental', 'Beach Gear'],
    description: 'Cozy 2-bedroom retreat just 5 minutes walk from Kata Noi Beach. Ideal for couples and small families.',
    status: 'active',
  },
  {
    id: 'v5',
    name: 'Villa Rawai Retreat',
    address: '56/2 Viset Road, Rawai, Mueang Phuket, Phuket 83130',
    bedrooms: 3,
    max_guests: 6,
    nightly_rate: 10000,
    images: [],
    amenities: ['Private Pool', 'Thai Kitchen', 'Garden', 'WiFi', 'Parking', 'Laundry'],
    description: 'Authentic Thai-style 3-bedroom villa in quiet Rawai. Close to seafood market and island hopping piers.',
    status: 'active',
  },
];

export const staff: StaffMember[] = [
  { id: 's1', name: 'Somchai K.', role: 'cleaner', phone: '081-234-5678', daily_rate_thb: 800, available: true },
  { id: 's2', name: 'Nong P.', role: 'cleaner', phone: '089-876-5432', daily_rate_thb: 800, available: true },
  { id: 's3', name: 'Chai W.', role: 'pool_tech', phone: '086-111-2222', daily_rate_thb: 1000, available: true },
  { id: 's4', name: 'Lek S.', role: 'gardener', phone: '087-333-4444', daily_rate_thb: 700, available: true },
  { id: 's5', name: 'Pong R.', role: 'handyman', phone: '083-555-6666', daily_rate_thb: 1200, available: true },
];

export const reservations: Reservation[] = [
  {
    id: 'r1',
    villa_id: 'v1',
    guest_name: 'James Mitchell',
    guest_email: 'james.m@email.com',
    guest_phone: '+44-7911-123456',
    check_in: relDate(-2),
    check_out: today,
    source: 'airbnb',
    total_revenue: 75000,
    status: 'checked_in',
    commission_rate: 0.15,
    notes: 'Celebrating anniversary. Late checkout requested.',
  },
  {
    id: 'r2',
    villa_id: 'v3',
    guest_name: 'Chen Wei Lin',
    guest_email: 'chen.wei@email.com',
    guest_phone: '+86-138-1234-5678',
    check_in: today,
    check_out: relDate(5),
    source: 'booking_com',
    total_revenue: 110000,
    status: 'confirmed',
    commission_rate: 0.18,
    notes: 'Family of 8. Need extra towels and baby cot.',
  },
  {
    id: 'r3',
    villa_id: 'v2',
    guest_name: 'Sarah Johnson',
    guest_email: 'sarah.j@email.com',
    guest_phone: '+1-415-555-0123',
    check_in: relDate(1),
    check_out: relDate(7),
    source: 'direct',
    total_revenue: 72000,
    status: 'confirmed',
    commission_rate: 0,
    notes: 'Repeat guest. Prefers villa stocked with almond milk.',
  },
  {
    id: 'r4',
    villa_id: 'v4',
    guest_name: 'Hans Mueller',
    guest_email: 'hans.m@email.com',
    guest_phone: '+49-176-12345678',
    check_in: relDate(-5),
    check_out: relDate(-1),
    source: 'agoda',
    total_revenue: 32000,
    status: 'checked_out',
    commission_rate: 0.15,
    notes: '',
  },
  {
    id: 'r5',
    villa_id: 'v5',
    guest_name: 'Yuki Tanaka',
    guest_email: 'yuki.t@email.com',
    guest_phone: '+81-90-1234-5678',
    check_in: relDate(3),
    check_out: relDate(8),
    source: 'airbnb',
    total_revenue: 50000,
    status: 'confirmed',
    commission_rate: 0.15,
    notes: 'Vegetarian. Wants cooking class arranged.',
  },
  {
    id: 'r6',
    villa_id: 'v1',
    guest_name: 'Emma Thompson',
    guest_email: 'emma.t@email.com',
    guest_phone: '+61-412-345-678',
    check_in: relDate(1),
    check_out: relDate(6),
    source: 'booking_com',
    total_revenue: 75000,
    status: 'confirmed',
    commission_rate: 0.18,
    notes: 'Airport transfer needed.',
  },
  {
    id: 'r7',
    villa_id: 'v3',
    guest_name: 'Alex Petrov',
    guest_email: 'alex.p@email.com',
    guest_phone: '+7-916-123-4567',
    check_in: relDate(7),
    check_out: relDate(14),
    source: 'vrbo',
    total_revenue: 154000,
    status: 'confirmed',
    commission_rate: 0.12,
    notes: 'Wants private chef for 3 dinners.',
  },
  {
    id: 'r8',
    villa_id: 'v2',
    guest_name: 'David Kim',
    guest_email: 'david.k@email.com',
    guest_phone: '+82-10-1234-5678',
    check_in: relDate(-7),
    check_out: relDate(-3),
    source: 'airbnb',
    total_revenue: 48000,
    status: 'checked_out',
    commission_rate: 0.15,
    notes: '',
  },
];

export const tasks: Task[] = [
  {
    id: 't1',
    villa_id: 'v1',
    type: 'cleaning',
    assigned_to: 's1',
    scheduled_date: today,
    status: 'pending',
    priority: 'high',
    notes: 'Deep clean after checkout. Guest requested late checkout until 2pm.',
    completed_at: null,
  },
  {
    id: 't2',
    villa_id: 'v3',
    type: 'cleaning',
    assigned_to: 's2',
    scheduled_date: today,
    status: 'in_progress',
    priority: 'urgent',
    notes: 'Prepare for check-in today. Extra towels and baby cot needed.',
    completed_at: null,
  },
  {
    id: 't3',
    villa_id: 'v2',
    type: 'pool',
    assigned_to: 's3',
    scheduled_date: today,
    status: 'pending',
    priority: 'medium',
    notes: 'Weekly pool chemical treatment and filter cleaning.',
    completed_at: null,
  },
  {
    id: 't4',
    villa_id: 'v4',
    type: 'garden',
    assigned_to: 's4',
    scheduled_date: relDate(1),
    status: 'pending',
    priority: 'low',
    notes: 'Trim hedges and clean up fallen leaves.',
    completed_at: null,
  },
  {
    id: 't5',
    villa_id: 'v3',
    type: 'repair',
    assigned_to: 's5',
    scheduled_date: today,
    status: 'pending',
    priority: 'urgent',
    notes: 'AC unit in master bedroom making rattling noise. Fix before guest arrives.',
    completed_at: null,
  },
  {
    id: 't6',
    villa_id: 'v5',
    type: 'maintenance',
    assigned_to: 's5',
    scheduled_date: relDate(2),
    status: 'pending',
    priority: 'medium',
    notes: 'Check water heater — previous guest reported inconsistent hot water.',
    completed_at: null,
  },
  {
    id: 't7',
    villa_id: 'v1',
    type: 'laundry',
    assigned_to: 's1',
    scheduled_date: today,
    status: 'pending',
    priority: 'high',
    notes: 'Full linen change for all 4 bedrooms.',
    completed_at: null,
  },
  {
    id: 't8',
    villa_id: 'v2',
    type: 'cleaning',
    assigned_to: 's2',
    scheduled_date: relDate(1),
    status: 'pending',
    priority: 'high',
    notes: 'Pre-arrival clean for Sarah Johnson. Stock almond milk.',
    completed_at: null,
  },
  {
    id: 't9',
    villa_id: 'v4',
    type: 'pool',
    assigned_to: 's3',
    scheduled_date: relDate(-1),
    status: 'completed',
    priority: 'medium',
    notes: 'Routine pool maintenance.',
    completed_at: relDate(-1),
  },
  {
    id: 't10',
    villa_id: 'v5',
    type: 'garden',
    assigned_to: 's4',
    scheduled_date: relDate(-2),
    status: 'completed',
    priority: 'low',
    notes: 'Monthly garden maintenance completed.',
    completed_at: relDate(-2),
  },
];

export const expenses: Expense[] = [
  { id: 'e1', villa_id: 'v1', category: 'utilities', amount_thb: 4500, description: 'Electricity bill - March', date: relDate(-10) },
  { id: 'e2', villa_id: 'v1', category: 'supplies', amount_thb: 2800, description: 'Toiletries, cleaning products, linens', date: relDate(-5) },
  { id: 'e3', villa_id: 'v2', category: 'maintenance', amount_thb: 3500, description: 'Pool pump repair', date: relDate(-8) },
  { id: 'e4', villa_id: 'v3', category: 'utilities', amount_thb: 8200, description: 'Electricity bill - March (high AC usage)', date: relDate(-12) },
  { id: 'e5', villa_id: 'v3', category: 'repairs', amount_thb: 15000, description: 'Replace AC compressor unit bedroom 3', date: relDate(-3) },
  { id: 'e6', villa_id: 'v4', category: 'supplies', amount_thb: 1500, description: 'Guest welcome pack supplies', date: relDate(-6) },
  { id: 'e7', villa_id: 'v5', category: 'staff', amount_thb: 4800, description: 'Extra cleaning crew for deep clean', date: relDate(-4) },
  { id: 'e8', villa_id: 'v2', category: 'utilities', amount_thb: 3200, description: 'Water bill - March', date: relDate(-9) },
  { id: 'e9', villa_id: 'v1', category: 'staff', amount_thb: 6400, description: 'Gardener monthly service', date: relDate(-15) },
  { id: 'e10', villa_id: 'v3', category: 'supplies', amount_thb: 5600, description: 'Premium linens and towels replacement', date: relDate(-7) },
];

export const ownerReports: OwnerReport[] = [
  { id: 'or1', villa_id: 'v1', month: '2026-03', total_revenue: 285000, total_expenses: 42500, net_income: 242500, occupancy_rate: 73, nights_booked: 22 },
  { id: 'or2', villa_id: 'v1', month: '2026-02', total_revenue: 255000, total_expenses: 38000, net_income: 217000, occupancy_rate: 64, nights_booked: 18 },
  { id: 'or3', villa_id: 'v1', month: '2026-01', total_revenue: 315000, total_expenses: 45000, net_income: 270000, occupancy_rate: 80, nights_booked: 25 },
  { id: 'or4', villa_id: 'v1', month: '2025-12', total_revenue: 390000, total_expenses: 52000, net_income: 338000, occupancy_rate: 93, nights_booked: 29 },
  { id: 'or5', villa_id: 'v2', month: '2026-03', total_revenue: 192000, total_expenses: 28500, net_income: 163500, occupancy_rate: 60, nights_booked: 18 },
  { id: 'or6', villa_id: 'v2', month: '2026-02', total_revenue: 168000, total_expenses: 25000, net_income: 143000, occupancy_rate: 50, nights_booked: 14 },
  { id: 'or7', villa_id: 'v3', month: '2026-03', total_revenue: 440000, total_expenses: 65000, net_income: 375000, occupancy_rate: 77, nights_booked: 24 },
  { id: 'or8', villa_id: 'v3', month: '2026-02', total_revenue: 396000, total_expenses: 58000, net_income: 338000, occupancy_rate: 68, nights_booked: 19 },
  { id: 'or9', villa_id: 'v4', month: '2026-03', total_revenue: 128000, total_expenses: 18000, net_income: 110000, occupancy_rate: 57, nights_booked: 17 },
  { id: 'or10', villa_id: 'v5', month: '2026-03', total_revenue: 170000, total_expenses: 24000, net_income: 146000, occupancy_rate: 63, nights_booked: 19 },
];

// Helper functions for the UI
export function getVillaById(id: string): Villa | undefined {
  return villas.find(v => v.id === id);
}

export function getReservationsForVilla(villaId: string): Reservation[] {
  return reservations.filter(r => r.villa_id === villaId);
}

export function getTasksForVilla(villaId: string): Task[] {
  return tasks.filter(t => t.villa_id === villaId);
}

export function getExpensesForVilla(villaId: string): Expense[] {
  return expenses.filter(e => e.villa_id === villaId);
}

export function getReportsForVilla(villaId: string): OwnerReport[] {
  return ownerReports.filter(r => r.villa_id === villaId);
}

export function getStaffById(id: string): StaffMember | undefined {
  return staff.find(s => s.id === id);
}

export function getVillaStatus(villaId: string): 'occupied' | 'vacant' | 'checkout-today' | 'checkin-today' {
  const villaReservations = getReservationsForVilla(villaId);

  for (const r of villaReservations) {
    if (r.status === 'cancelled') continue;
    if (r.check_out === today && (r.status === 'checked_in' || r.status === 'confirmed')) return 'checkout-today';
    if (r.check_in === today && r.status === 'confirmed') return 'checkin-today';
    if (r.check_in <= today && r.check_out > today && (r.status === 'checked_in' || r.status === 'confirmed')) return 'occupied';
  }

  return 'vacant';
}

export function getTodayCheckIns(): Reservation[] {
  return reservations.filter(r => r.check_in === today && r.status === 'confirmed');
}

export function getTodayCheckOuts(): Reservation[] {
  return reservations.filter(r => r.check_out === today && (r.status === 'checked_in' || r.status === 'confirmed'));
}

export function getPendingTasksCount(villaId: string): number {
  return tasks.filter(t => t.villa_id === villaId && (t.status === 'pending' || t.status === 'in_progress')).length;
}

export function getNextReservation(villaId: string): Reservation | undefined {
  return reservations
    .filter(r => r.villa_id === villaId && r.check_in >= today && r.status === 'confirmed')
    .sort((a, b) => a.check_in.localeCompare(b.check_in))[0];
}

export function getMonthlyRevenue(): number {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return ownerReports
    .filter(r => r.month === currentMonth)
    .reduce((sum, r) => sum + r.total_revenue, 0);
}

export function getUrgentTasks(): Task[] {
  return tasks.filter(t => t.priority === 'urgent' && t.status !== 'completed');
}
