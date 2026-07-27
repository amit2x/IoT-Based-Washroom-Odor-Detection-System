# AAI - AUDITLOG

A robust security audit logging, system monitoring, and administration terminal dashboard built with Next.js.

## Key Features

- **Role-Based Access Control (RBAC)**: Secure redirection and access controls for Admins (`AAI_ADMIN`) and Terminal Users.
- **Log Management & Analytics**: Interactive tables with comprehensive filtering for both Audit and System logs.
- **Interactive Visualizations**: Real-time velocity and volume charting for security log events.
- **Terminal UI/UX**: A dark-themed, monospace-heavy terminal aesthetics tailored for security monitoring.

## Tech Stack

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS 4, next-themes
- **State & Data**: Zustand (global state), TanStack React Query (data fetching), TanStack Table (data grid)
- **Charts & Icons**: Recharts, Lucide React
- **Validation**: Zod & React Hook Form

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd CODE
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

- **Development Server**:
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

- **Production Build**:
  ```bash
  npm run build
  npm run start
  ```

- **Linting**:
  ```bash
  npm run lint
  ```

- **Releases**:
  ```bash
  npm run release
  ```
