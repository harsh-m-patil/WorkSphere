# WorkSphere Client

This is the client-side application for WorkSphere, a platform connecting freelancers and clients.

## Tech Stack

- **Framework/Library:** React.js
- **Build Tool:** Vite
- **Routing:** React Router (`react-router-dom`)
- **State Management:** Zustand (`zustand`)
- **Data Fetching/Caching:** TanStack Query (`@tanstack/react-query`)
- **Styling:** Tailwind CSS (`tailwindcss`), `clsx`, `tailwind-merge`
- **UI Components:** Radix UI (`@radix-ui/*`), shadcn/ui components
- **HTTP Client:** Axios (`axios`)
- **Forms:** React Hook Form (`react-hook-form`)
- **Linting/Formatting:** ESLint (`eslint`), Prettier (`prettier`)
- **Animation:** Motion (`motion/react`), AOS (`aos`)
- **Markdown:** `@uiw/react-md-editor`, `react-markdown`, `remark-gfm`
- **Notifications:** Sonner (`sonner`)
- **Real-time Communication:** Socket.IO Client (`socket.io-client`)
- **Validation:** Validator (`validator`)
- **Payments:** Razorpay

## Environment Variables

The application uses environment variables for configuration. You need to create two files in the root directory:

1.  `.env`: For development settings.

**Required Variables:**

- `VITE_EXPRESS_APP_URL`: The base URL for the backend API (e.g., `http://localhost:3000/api/v1`).
- `VITE_IMAGE_URL`: The base URL for the server hosting images or handling socket connections.
- `VITE_RAZORPAY_KEY`: Your public key for Razorpay integration.

**Example `.env` file:**

```env
// filepath: /.env
VITE_EXPRESS_APP_URL=http://localhost:3000/api/v1
VITE_IMAGE_URL=http://localhost:3000/
VITE_RAZORPAY_KEY=your_razorpay_key
```

_Note: Vite requires environment variables exposed to the client to be prefixed with `VITE_`.\_

## Setup

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd client
    ```
2.  **Install dependencies:**
    This project uses `pnpm` as the package manager.
    ```sh
    pnpm install
    ```
3.  **Set up environment variables:**
    Create `.env` and `.env.production` files in the root directory as described above, filling in your specific keys and URLs.

## Running the Project

1.  **Start the development server:**

    ```sh
    pnpm run dev
    ```

    This will start the Vite development server, typically on `http://localhost:5173`.

2.  **Build for production:**

    ```sh
    pnpm run build
    ```

    This command bundles the application into the `dist/` directory for deployment.

3.  **Preview the production build:**
    ```sh
    pnpm run preview
    ```
    This command serves the production build locally.

## Linting

To check for code style and potential errors:

```sh
pnpm run lint
```
