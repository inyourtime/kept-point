import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/Home";
import RewardPage from "./pages/Reward";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import RewardDetailPage from "./pages/RewardDetail";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const protectedRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/reward", element: <RewardPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/reward/:rewardId", element: <RewardDetailPage /> },
];

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ))}
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<div>Not Found</div>} />
      </>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
