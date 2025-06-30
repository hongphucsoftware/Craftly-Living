import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Onboarding from "@/pages/onboarding";
import Contractors from "@/pages/contractors";
import Dashboard from "@/pages/dashboard";
import JoinNetwork from "@/pages/join-network";
import BuilderSignup from "@/pages/builder-signup";
import BuilderDashboard from "@/pages/builder-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/contractors" component={Contractors} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/join-network" component={JoinNetwork} />
      <Route path="/builder-signup" component={BuilderSignup} />
      <Route path="/builder-dashboard/:builderId" component={BuilderDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
