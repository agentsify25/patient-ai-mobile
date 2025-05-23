import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Index from "./pages/Index"; // Index import remains, though not default home
import Health from "./pages/Health";
import Appointments from "./pages/Appointments";
// import Messages from "./pages/Messages"; // Messages icon was replaced by Settings
import Profile from "./pages/Profile";
import SettingsPage from "./pages/SettingsPage"; // Import new SettingsPage
import VitalSignsHistoryPage from "./pages/VitalSignsHistoryPage"; // New import
import LogNewVitalsPage from "./pages/LogNewVitalsPage"; // New import for the form
import SelectTestPage from "./pages/SelectTestPage";
import BloodOxygenPage from "./pages/BloodOxygenPage";
import BloodPressurePage from "./pages/BloodPressurePage";
import TemperaturePage from "./pages/TemperaturePage";
import ECGPage from "./pages/ECGPage";
import HeartRatePage from "./pages/HeartRatePage";
import BloodGlucosePage from "./pages/BloodGlucosePage";
import StethoscopePage from "./pages/StethoscopePage"; // New import
import OtoscopePage from "./pages/OtoscopePage"; // New import
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Loader2 } from "lucide-react";
import AuthPage from "./pages/AuthPage"; // Added import
import NotFound from "./pages/NotFound"; // Added import

const queryClient = new QueryClient();

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

const AppRoutes = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <Routes>
      {/* If user has a session, show Health page at "/", otherwise show AuthPage at "/" */}
      <Route path="/" element={session ? <Health /> : <AuthPage />} /> 
      
      {/* If user has a session and navigates to "/auth", redirect to "/", otherwise show AuthPage */}
      {/* This redirect will now lead to Health page for authenticated users via the root route */}
      <Route path="/auth" element={session ? <Navigate to="/" replace /> : <AuthPage />} /> 
      
      <Route element={<ProtectedRoute />}>
        {/* The /health route still exists and is protected, ensuring direct navigation also works */}
        <Route path="/health" element={<Health />} />
        <Route path="/appointments" element={<Appointments />} />
        {/* <Route path="/messages" element={<Messages />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<SettingsPage />} /> {/* Add route for SettingsPage */}
        {/* <Route path="/log-vitals" element={<LogVitalsPage />} /> */}
        <Route path="/vital-history" element={<VitalSignsHistoryPage />} /> {/* New route for history */}
        <Route path="/log-new-vitals" element={<LogNewVitalsPage />} /> {/* New route for form */}
        <Route path="/select-test" element={<SelectTestPage />} />
        <Route path="/blood-oxygen" element={<BloodOxygenPage />} />
        <Route path="/blood-pressure" element={<BloodPressurePage />} />
        <Route path="/temperature" element={<TemperaturePage />} />
        <Route path="/ecg" element={<ECGPage />} />
        <Route path="/heart-rate" element={<HeartRatePage />} />
        <Route path="/blood-glucose" element={<BloodGlucosePage />} />
        <Route path="/stethoscope" element={<StethoscopePage />} /> {/* New route */}
        <Route path="/otoscope" element={<OtoscopePage />} /> {/* New route */}
        {/* The Index page is no longer explicitly routed here unless you add a specific path for it. */}
        {/* For example, if you still want to access Index page, you could add: <Route path="/dashboard-overview" element={<Index />} /> */}
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter> {/* BrowserRouter should wrap AuthProvider if AuthProvider uses hooks like useNavigate */}
        <AuthProvider> {/* AuthProvider wraps components that need auth context */}
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-background">
            <AppRoutes />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
