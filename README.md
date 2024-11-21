# ZapDo - Your Offline-First Todo List App 🚀

Welcome to **ZapDo**, an offline-first todo list application built with [Expo](https://expo.dev), [Recoil](https://recoiljs.org/), and [Supabase](https://supabase.io/). ZapDo allows you to manage your tasks locally and seamlessly sync them with a Supabase database when an internet connection is available. The app is modular, leveraging TypeScript for type safety and maintainability.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Technical Overview](#technical-overview)
  - [Offline-First Approach](#offline-first-approach)
  - [State Management with Recoil](#state-management-with-recoil)
  - [Syncing with Supabase](#syncing-with-supabase)
- [Configuration](#configuration)
  - [Supabase Setup](#supabase-setup)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Development](#development)
  - [File-Based Routing](#file-based-routing)
  - [Debugging](#debugging)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)
- [Learn More](#learn-more)
- [Join the Community](#join-the-community)
- [Acknowledgments](#acknowledgments)

---

## Features

- **Offline-First Functionality**: Use ZapDo without an internet connection. Your tasks are stored locally.
- **Seamless Syncing**: Manually sync your local tasks with Supabase when you're back online.
- **Network Status Awareness**: The app notifies you when there's no internet connection and displays a sync button when connectivity is restored.
- **Modular Architecture**: Components are separated into individual files for better maintainability and reusability.
- **Type Safety with TypeScript**: The entire codebase is written in TypeScript, ensuring type safety and easier debugging.
- **State Management with Recoil**: Manage global state efficiently with Recoil.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed. Download them from [here](https://nodejs.org/).
- **Expo CLI** installed globally:

  ```bash
  npm install -g expo-cli
  ```

- **Supabase Account**: Sign up for a free account at [supabase.io](https://supabase.io/).
- **Basic Knowledge** of React Native and TypeScript.

---

## Getting Started

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/shawwal/zapdo.git
   cd zapdo
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

### Running the App

Start the Expo development server:

```bash
npx expo start
```

In the terminal, you'll see options to open the app in:

- **Development Build**
- **Android Emulator**
- **iOS Simulator**
- **Expo Go**

---

## Project Structure

```
zapdo/
├── app/
├── assets/
├── components/
│   ├── Header.tsx
│   ├── InputField.tsx
│   ├── TodoItem.tsx
│   ├── TodoListApp.tsx
│   └── styles/
│       ├── HeaderStyles.ts
│       ├── InputFieldStyles.ts
│       └── TodoItemStyles.ts
├── recoil/
│   └── atoms.ts
├── lib/
│   └── supabase.ts
├── App.tsx
├── tsconfig.json
├── package.json
└── README.md
```

- **app/**: Contains the main application files (if using Expo Router).
- **assets/**: Contains images, fonts, and other static assets.
- **components/**: Contains reusable React components.
- **recoil/**: Contains Recoil atoms for state management.
- **lib/**: Contains library configurations like Supabase client.
- **App.tsx**: The entry point of the application.

---

## Technical Overview

### Offline-First Approach

ZapDo is designed to work without an internet connection. Your tasks are stored locally using Recoil's state management. The app monitors network connectivity and alerts you when you're offline.

### State Management with Recoil

Recoil is used for global state management, providing a simple and efficient way to manage state across components.

- **Atoms**: Represent the source of truth for the state.
- **Selectors**: Derive data from atoms (not used extensively in this app).

### Syncing with Supabase

When an internet connection is available, you can sync your local tasks with a Supabase database by pressing the sync button.

- **Manual Sync**: Gives you control over when to sync data.
- **Supabase Client**: Configured in `lib/supabase.ts` for interacting with your Supabase database.

---

## Configuration

### Supabase Setup

1. **Create a Supabase Project**

   Sign in to [Supabase](https://app.supabase.io/) and create a new project.

2. **Create a `todos` Table**

   In your Supabase dashboard, navigate to the SQL editor and run the following SQL command:

   ```sql
   create table todos (
     id text primary key,
     text text not null
   );
   ```

### Environment Variables

Create a `.env` file in the root directory and add your Supabase credentials:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
```

**Note**: Ensure that you add `.env` to your `.gitignore` to avoid committing sensitive information.

---

## Usage

- **Adding a Task**: Type your task in the input field and press the **Add** button.
- **Deleting a Task**: Press the **Delete** button next to a task to remove it.
- **Offline Notification**: A message appears when there's no internet connection.
- **Syncing Data**: When back online, press the **Sync** button to upload your local tasks to Supabase.

---

## Development

### File-Based Routing

ZapDo uses Expo's file-based routing system. You can add new screens by creating new files in the `app/` directory (if using Expo Router).

### Debugging

- **Developer Menu**: Press `j` in the terminal to open debugger.

---

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Repository**

   Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/shawwal/zapdo.git
   ```

3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Commit Your Changes**

   ```bash
   git commit -m "Add your commit message"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

   Navigate to the original repository and click "New Pull Request".

---

## Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/shawwal/zapdo/issues).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- **Expo Documentation**: [https://docs.expo.dev/](https://docs.expo.dev/)
- **Recoil Documentation**: [https://recoiljs.org/](https://recoiljs.org/)
- **Supabase Documentation**: [https://supabase.io/docs](https://supabase.io/docs)
- **TypeScript Documentation**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

---

## Join the Community

- **Expo on GitHub**: [https://github.com/expo/expo](https://github.com/expo/expo)
- **Recoil on GitHub**: [https://github.com/facebookexperimental/Recoil](https://github.com/facebookexperimental/Recoil)
- **Supabase on GitHub**: [https://github.com/supabase/supabase](https://github.com/supabase/supabase)
- **Discord Communities**:
  - [Expo Community](https://chat.expo.dev)
  - [Supabase Community](https://discord.supabase.io/)

---

## Acknowledgments

- **Expo Team**: For providing a fantastic platform for React Native development.
- **Recoil Contributors**: For creating an intuitive state management library.
- **Supabase Team**: For offering an open-source alternative to Firebase.

---

Happy coding! 🎉

