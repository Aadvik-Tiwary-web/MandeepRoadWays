# Mandeep RoadWays — Transport Management System

Premium dark-only frontend TMS built with React, Vite, JavaScript, Tailwind CSS, React Router, Lucide React and Recharts.

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## Install and run
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## Initial owner sign-in
- Email: `owner@mandeep.com`
- Password: `Mandeep@123`

Change this starter password before using the application with real operational data. This is a browser-only starter authentication flow, not production-grade security.

## Included modules
Dashboard, Fleet, Drivers, Truck Owners, Customers, Bookings, Trips, Maintenance, Fuel, Expenses, Invoices, Payments, Employees & Access, Tasks, Attendance, Salaries, Documents, Reports, Notifications, Calendar, Activity History, Settings, Backup & Restore.

## Data and limitations
- Application records persist in the current browser using `localStorage`.
- JSON backup and restore are available under Backup & Restore.
- CSV export is available in the main register modules.
- No backend, server database, GPS, or external messaging integration is included.
- Data does not sync between devices or browser profiles.
- Browser-only authentication and permissions can be altered by someone with access to developer tools. Do not use this architecture for sensitive multi-user production deployment without a secure backend.
- Passwords in this frontend-only starter are stored in browser storage and are not securely hashed. Do not use real employee passwords or sensitive personal information.

## Notes
The dashboard includes sample operational records so the interface is populated on first launch. Replace them with your own data. The app is dark-theme only.
