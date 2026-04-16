# Reading Companion App - Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Expo CLI**: `npm install -g expo-cli`
3. **Appwrite Account** (free at https://appwrite.io)

## Installation Steps

### 1. Install Dependencies

```bash
cd /workspace
npm install
```

### 2. Set Up Appwrite Backend

#### A. Create a Project in Appwrite Console
1. Go to https://cloud.appwrite.io
2. Create a new project called "Reading Companion"
3. Copy your **Project ID**

#### B. Create Database
1. In your project, go to Databases → Create Database
2. Name it "reading-companion-db"
3. Copy the **Database ID**

#### C. Create Tables
Create the following tables in your database:

**users**
- username (string)
- email (string)
- totalXP (integer, default: 0)
- level (integer, default: 1)
- currentStreak (integer, default: 0)
- lastReadingDay (string, optional)
- treats (integer, default: 0)
- hasActivePet (boolean, default: false)

**pettypes**
- name (string)
- baseImageUrl (string)
- color (string, optional)
- model3DUrl (string, optional)

**userpets**
- userId (string)
- petTypeId (string)
- nickname (string)
- happiness (integer, default: 100)
- equippedItems (array of strings)

**petitems**
- name (string)
- price (integer)
- imageUrl (string)

**userbook**
- userId (string)
- title (string)
- totalPages (integer)
- currentPage (integer, default: 0)
- status (string: "reading" | "finished")

**readingsession**
- userId (string)
- bookId (string)
- pagesRead (integer)
- timeSpent (integer)

**clubs**
- clubName (string)
- inviteCode (string)
- creatorId (string)

**clubmembers**
- userId (string)
- clubId (string)
- weeklyPages (integer, default: 0)

#### D. Create Cloud Functions
Go to Functions → Create Function for each:

1. **purchasePetItem**
   - Runtime: Node.js 18.0
   - Execute permissions: Users
   
2. **processReadingSession**
   - Runtime: Node.js 18.0
   - Execute permissions: Users
   
3. **runDailyTasks**
   - Runtime: Node.js 18.0
   - Schedule: 0 0 * * * (daily at midnight)
   
4. **onClubCreated**
   - Runtime: Node.js 18.0
   - Trigger: Database event on clubs table create
   
5. **onCreateUser**
   - Runtime: Node.js 18.0
   - Trigger: Database event on users table create

Copy each function's **Function ID**.

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_APPWRITE_PLATFORM=io.readingcompanion.app
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
EXPO_PUBLIC_PURCHASE_PETITEM_FN_ID=your_purchase_function_id_here
```

### 4. Seed Initial Data

Add some pet types to your `pettypes` table:

```json
[
  {
    "name": "Cat",
    "baseImageUrl": "https://example.com/cat.png",
    "color": "#FF6B6B"
  },
  {
    "name": "Dog",
    "baseImageUrl": "https://example.com/dog.png",
    "color": "#4ECDC4"
  },
  {
    "name": "Bird",
    "baseImageUrl": "https://example.com/bird.png",
    "color": "#FFE66D"
  }
]
```

Add some pet items to your `petitems` table:

```json
[
  {
    "name": "Bow Tie",
    "price": 50,
    "imageUrl": "https://example.com/bowtie.png"
  },
  {
    "name": "Hat",
    "price": 75,
    "imageUrl": "https://example.com/hat.png"
  },
  {
    "name": "Glasses",
    "price": 60,
    "imageUrl": "https://example.com/glasses.png"
  }
]
```

### 5. Run the App

```bash
npm start
```

Then:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app on your phone

## Features

✅ **Authentication**: Sign up/login with email
✅ **Book Management**: Add books, track reading progress
✅ **Reading Sessions**: Log reading time and pages
✅ **3D Pet System**: 
   - Adopt animated 3D pets (Cat, Dog, Bird)
   - Pets have happiness levels
   - Animated behaviors (idle breathing, happy bouncing, tail wagging)
   - Interactive 3D viewer with orbit controls
✅ **Pet Store**: Buy accessories with treats
✅ **Clubs**: Create/join reading clubs
✅ **Leaderboards**: Weekly page count rankings
✅ **Stats & Achievements**: Level up, streaks, XP tracking

## 3D Pet Features

The app includes fully animated 3D pets built with Three.js and React Three Fiber:

- **Idle Animation**: Gentle breathing motion
- **Happy Animation**: Bouncing when happiness > 70%
- **Tail Wagging**: Continuous tail movement
- **Type Variations**: Different ears and tails for cats, dogs, and birds
- **Interactive Controls**: Rotate view by dragging (orbit controls)
- **Customizable Colors**: Each pet type has its own color

## Troubleshooting

### No Space Left on Device
```bash
rm -rf node_modules/.cache
rm -rf /root/.npm
npm cache clean --force
```

### Build Errors
```bash
npx expo doctor
npx expo install --fix
```

### Appwrite Connection Issues
- Verify your Project ID and Database ID
- Check that all tables are created
- Ensure cloud functions are deployed and active

## Next Steps

1. Customize pet colors and add more pet types
2. Add more 3D animations (eating, sleeping, playing)
3. Import custom 3D models (.glb files) for more detailed pets
4. Add sound effects and background music
5. Implement push notifications for daily reminders

Enjoy your Reading Companion App! 📚🐾
