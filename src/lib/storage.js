const DATA_KEY = 'mrw_application_data_v1'
const USER_KEY = 'mrw_users_v1'
const SESSION_KEY = 'mrw_session_v1'

export const defaultData = {
  trucks: [
    { id: 'TRK-001', registration: 'JH09AB1234', model: 'Tata Signa 5525.S', type: 'Heavy Truck', capacity: '25 Ton', status: 'Available', owner: 'Mandeep RoadWays', insuranceExpiry: '2027-03-12' },
    { id: 'TRK-002', registration: 'JH09CD5678', model: 'Ashok Leyland 4220', type: 'Heavy Truck', capacity: '20 Ton', status: 'On Trip', owner: 'Raj Transport', insuranceExpiry: '2027-01-18' },
    { id: 'TRK-003', registration: 'JH10EF9012', model: 'BharatBenz 3528C', type: 'Tipper', capacity: '18 Ton', status: 'Maintenance', owner: 'Mandeep RoadWays', insuranceExpiry: '2026-12-20' }
  ],
  drivers: [
    { id: 'DRV-001', name: 'Rakesh Kumar', phone: '9876543210', licence: 'JH0920190001234', truckId: 'TRK-001', salary: 22000, status: 'Active' },
    { id: 'DRV-002', name: 'Sanjay Yadav', phone: '9876501234', licence: 'JH0920180005678', truckId: 'TRK-002', salary: 24000, status: 'Active' }
  ],
  truckOwners: [{ id: 'OWN-001', name: 'Raj Transport', phone: '9876509876', address: 'Bokaro, Jharkhand', trucks: 1, balance: 18500 }],
  customers: [{ id: 'CUS-001', name: 'Shree Cement Ltd.', phone: '9876512345', gstin: '20AAAAA0000A1Z5', address: 'Bokaro, Jharkhand', balance: 42000 }],
  bookings: [{ id: 'BKG-001', customer: 'Shree Cement Ltd.', from: 'Bokaro', to: 'Ranchi', date: '2026-11-10', truckId: 'TRK-001', amount: 28000, status: 'Confirmed' }],
  trips: [{ id: 'TRP-001', bookingId: 'BKG-001', driver: 'Rakesh Kumar', truckId: 'TRK-001', from: 'Bokaro', to: 'Ranchi', startDate: '2026-11-08', endDate: '2026-11-09', revenue: 28000, expenses: 9200, status: 'Completed' }],
  maintenance: [{ id: 'MNT-001', truckId: 'TRK-003', type: 'Engine service', date: '2026-11-12', cost: 12500, status: 'Scheduled' }],
  fuel: [{ id: 'FUL-001', truckId: 'TRK-001', date: '2026-11-08', litres: 120, amount: 11400, odometer: 84500, station: 'HP Bokaro' }],
  expenses: [{ id: 'EXP-001', category: 'Toll', date: '2026-11-08', amount: 1800, tripId: 'TRP-001', note: 'Highway tolls' }],
  invoices: [{ id: 'INV-001', customer: 'Shree Cement Ltd.', date: '2026-11-08', dueDate: '2026-11-20', amount: 28000, paid: 10000, status: 'Partially Paid' }],
  payments: [{ id: 'PAY-001', party: 'Shree Cement Ltd.', date: '2026-11-08', amount: 10000, method: 'Bank Transfer', reference: 'UTR001' }],
  employees: [{ id: 'EMP-001', name: 'Amit Singh', email: 'amit@example.com', designation: 'Operations Executive', status: 'Active', permissions: ['dashboard','bookings','trips','customers'] }],
  tasks: [{ id: 'TSK-001', title: 'Verify truck insurance documents', assignee: 'Amit Singh', dueDate: '2026-11-11', priority: 'High', status: 'Pending' }],
  attendance: [{ id: 'ATT-001', employee: 'Amit Singh', date: '2026-11-09', checkIn: '09:12', status: 'Present' }],
  salaries: [{ id: 'SAL-001', employee: 'Amit Singh', month: 'November 2026', salary: 18000, advance: 2000, paid: 0, status: 'Pending' }],
  documents: [{ id: 'DOC-001', title: 'TRK-001 Insurance', category: 'Insurance', entity: 'TRK-001', expiry: '2027-03-12', status: 'Valid' }],
  notifications: [{ id: 'NTF-001', title: 'Maintenance due soon', detail: 'TRK-003 engine service is scheduled.', date: '2026-11-09', read: false }],
  activity: [{ id: 'ACT-001', action: 'Workspace initialized', user: 'System', date: new Date().toISOString() }],
  settings: { companyName: 'Mandeep RoadWays', gstin: '', address: 'Bokaro, Jharkhand', invoicePrefix: 'MRW' }
}

export function readData() {
  try { return { ...defaultData, ...JSON.parse(localStorage.getItem(DATA_KEY) || '{}') } }
  catch { return structuredClone(defaultData) }
}
export function writeData(data) { localStorage.setItem(DATA_KEY, JSON.stringify(data)) }
export function readUsers() {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null') || [{ id: 'USR-OWNER', email: 'owner@mandeep.com', password: 'Mandeep@123', firstName: 'Mandeep', lastName: 'Owner', role: 'owner', active: true }] }
  catch { return [] }
}
export function writeUsers(users) { localStorage.setItem(USER_KEY, JSON.stringify(users)) }
export const SESSION_KEY_NAME = SESSION_KEY
export const DATA_KEY_NAME = DATA_KEY
export const USER_KEY_NAME = USER_KEY
export function makeId(prefix) { return `${prefix}-${Date.now().toString(36).toUpperCase()}` }
