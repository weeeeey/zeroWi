# 🏋️ Fitness Tracker Application

This is a full-stack web application built with Next.js App Router, designed to help users track and manage their fitness programs and workout records.

## ✨ Features

- User Authentication (Login/Logout)
- Program Creation and Management
- Workout Record Tracking
- Community Features (e.g., Post creation)
- User Profile Management

## 🚀 Technologies Used

This project leverages a modern web development stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Frontend**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (inferred from Prisma setup)
- **Data Fetching/State Management**: [Tanstack Query](https://tanstack.com/query/latest)
- **Validation**: [Zod](https://zod.dev/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/react)

## ⚙️ Local Development Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18.x or later)
- npm (v8.x or later) or Yarn / pnpm / Bun
- PostgreSQL database instance (or other database compatible with Prisma)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd fitness
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    # or bun install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory based on `.env.example` (if available) or the required variables.

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/fitnessdb"
    NEXTAUTH_SECRET="your_nextauth_secret"
    NEXTAUTH_URL="http://localhost:3000"
    # Add other necessary environment variables (e.g., OAuth credentials)
    ```

4.  **Set up the database:**
    Run Prisma migrations to create the database schema.

    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Start the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server with Turbopack.
- `npm run db`: Runs Prisma development commands (e.g., `npx prisma dev`).
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code style issues.
- `npm run lint:fix`: Runs ESLint and automatically fixes fixable issues.
- `npm run format`: Formats code using Prettier.
- `npm test`: Runs Jest tests.

## 📁 Project Structure

```
.next/             # Next.js build output
app/              # App Router routes, pages, layouts, and API routes
├── (auth)/       # Authentication related routes (login, admin)
├── (home)/       # Main application routes (dashboard, community, profile, programs)
├── (workout)/    # Workout recording routes
└── api/          # Backend API routes
components/       # Reusable React components
├── features/     # Feature-specific components (e.g., auth, community, programs)
├── modal/        # Modal components
└── ui/           # Generic UI components (shadcn/ui based)
hooks/            # Custom React hooks
lib/              # Utility functions, server-side logic, database setup, auth logic
├── auth/         # Authentication related utilities
├── db.ts         # Prisma client instance
├── programs/     # Program related server logic and schemas
└── utils.ts      # General utility functions
prisma/           # Prisma schema and migrations
public/           # Static assets (fonts, images)
provider/         # React Context providers (e.g., Tanstack Query, Modal)
types/            # TypeScript type definitions
```

## 🧪 Testing

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/react) for testing.

- **Unit Tests**: Located alongside the code they test (e.g., `lib/utils.test.ts`, `hooks/use-mobile.test.ts`).
- **Integration Tests**: For API routes, located next to the route file (e.g., `app/api/program/route.test.ts`).

To run all tests:

```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.
