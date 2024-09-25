
# UserPostsApp

A React Native application built with Expo that fetches user details and displays their posts using a mock API (`jsonPlaceholder`).

## Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **Yarn** ([Install Yarn](https://classic.yarnpkg.com/en/docs/install/))
- **Expo CLI** (You’ll use `npx expo`, so no need to install globally)

## Project Setup

### Step 1: Clone the Repository

First, clone the project repository to your local machine.

```bash
git clone https://github.com/divyanshlight/UsePostsAssignment
cd UsePostsAssignment
```

### Step 2: Install Dependencies

Use `yarn` to install all the necessary project dependencies:

```bash
yarn install
```

### Step 3: Start the Expo Development Server

You can start the project with:

```bash
npx expo start
```

This will open the Expo Developer Tools in your browser, where you can run the app on an emulator, simulator, or physical device using the Expo Go app.

### Running the App on a Device

1. **Android/iOS Device (with Expo Go)**:
   - Install the **Expo Go** app from the Google Play Store or Apple App Store.
   - Scan the QR code displayed in the Expo Developer Tools to run the app on your device.

2. **Emulators/Simulators**:
   - **Android**: Make sure Android Studio is installed with an emulator running.
   - **iOS**: Use Xcode’s simulator (macOS only).

   The Expo Developer Tools should automatically detect any running emulator/simulator and offer to run the app on it.

## Project Structure

Here’s a brief overview of the project structure:

```
.
├── api/                     # API services (jsonPlaceholder API in this case)
│   └── jsonPlaceholder.ts    # API request handlers
├── assets/                  # Images, fonts, etc.
├── components/              # Reusable components
├── screens/                 # Application screens (HomeScreen, UserPostsScreen)
├── App.tsx                  # Main application entry
├── app.json                 # Expo configuration file
├── package.json             # Project metadata and scripts
└── README.md                # Project documentation
```

## Troubleshooting

### Common Commands

- **Start the development server**:  
  ```bash
  npx expo start
  ```

- **Run the app on Android emulator**:  
  ```bash
  npx expo start --android
  ```

- **Run the app on iOS simulator** (macOS only):  
  ```bash
  npx expo start --ios
  ```

- **Clear cache**:  
  ```bash
  expo start -c
  ```


This `README.md` file is simplified for your specific use case where you're using `yarn` and `npx expo` for starting the project without the need for environment variables.
