import React, { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import { X } from "lucide-react";

import Overview from "./screens/Overview.jsx";
import CustomerApp from "./screens/CustomerApp.jsx";
import BuilderStudio from "./screens/BuilderStudio.jsx";
import LiveMeeting from "./screens/LiveMeeting.jsx";
import BillingDomain from "./screens/BillingDomain.jsx";
import Backoffice from "./screens/Backoffice.jsx";
import FlowMap from "./screens/FlowMap.jsx";

export default function App() {
  const [tab, setTab] = useState("overview");
  const [drawer, setDrawer] = useState(false);

  const go = (id) => {
    setTab(id);
    setDrawer(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderScreen = () => {
    switch (tab) {
      case "overview":
        return <Overview onNavigate={go} />;
      case "customer":
        return <CustomerApp onNavigate={go} />;
      case "builder":
        return <BuilderStudio />;
      case "live":
        return <LiveMeeting />;
      case "billing":
        return <BillingDomain />;
      case "backoffice":
        return <Backoffice />;
      case "flow":
        return <FlowMap />;
      default:
        return <Overview onNavigate={go} />;
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* desktop sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar active={tab} onNavigate={go} />
      </div>

      {/* mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[256px] animate-fade-up shadow-2xl">
            <Sidebar active={tab} onNavigate={go} onClose={() => setDrawer(false)} />
            <button
              onClick={() => setDrawer(false)}
              className="absolute -right-11 top-4 grid h-9 w-9 place-items-center rounded-xl bg-white text-ink shadow-soft"
              aria-label="Đóng menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* main column */}
      <div className="lg:pl-[256px]">
        <Topbar onOpenSidebar={() => setDrawer(true)} />
        <main className="pb-16">{renderScreen()}</main>
      </div>
    </div>
  );
}
