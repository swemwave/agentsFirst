# Firebase Setup

This app now uses Firebase Authentication for email/password login and Cloud Firestore for user profiles and roles.

## 1. Create the environment file

Copy `.env.example` to `.env.local` and fill in your Firebase web app credentials from Project settings -> General -> Your apps.

Required variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 2. Enable Firebase Authentication

In the Firebase console:

1. Open `Build -> Authentication`.
2. Click `Get started`.
3. Enable the `Email/Password` provider.

## 3. Create Firestore Database

In the Firebase console:

1. Open `Build -> Firestore Database`.
2. Create the database in production mode.
3. Choose your region.
4. Open the Rules tab and replace the contents with the rules from [firestore.rules](/c:/Users/ipkta/OneDrive/Desktop/Web%20Designer/FinditwithFahad%203-18-2026/agentsFirst/firestore.rules).

The app stores:

- one document per user in the `users` collection, keyed by Firebase Auth `uid`
- one document per booked slot in `appointmentSlots`
- one private appointment record per booking in `appointments`

Example document:

```json
{
  "fullName": "Jane Seller",
  "email": "jane@example.com",
  "role": "seller"
}
```

Example appointment slot:

```json
{
  "appointmentId": "2026-04-09__9-00-am",
  "bookedByUid": "firebase-user-uid",
  "dateKey": "2026-04-09",
  "timeLabel": "9:00 AM"
}
```

Example appointment document:

```json
{
  "slotId": "2026-04-09__9-00-am",
  "dateKey": "2026-04-09",
  "timeLabel": "9:00 AM",
  "purpose": "buying",
  "status": "scheduled",
  "clientUid": "firebase-user-uid",
  "clientName": "Jane Buyer",
  "clientEmail": "jane@example.com",
  "clientPhone": "(403) 555-0123",
  "propertyAddress": "2345 Elbow Drive SW",
  "message": "I want to view this property.",
  "agentName": "Fahad"
}
```

## 4. Creating admin accounts

Self-signup only creates `buyer` and `seller` accounts. Admin accounts should be created manually:

1. Create the user in `Authentication -> Users`.
2. In Firestore, create a document in `users/{uid}`.
3. Set:

```json
{
  "fullName": "Site Admin",
  "email": "admin@example.com",
  "role": "admin"
}
```

Use the Auth user UID as the Firestore document ID.

## 5. Route access now enforced

- `buyer` and `seller` can access buyer-facing pages like `/search`, `/calendar`, and `/appointments/new`.
- `seller` can access `/list-home`.
- `admin` can access `/admin/*`.
- Logged-in users are redirected away from `/login` and `/signup`.

## 6. Local development

After adding `.env.local`, restart the dev server:

```bash
npm run dev
```

If the app says Firebase setup is incomplete, one or more environment variables are still missing.
