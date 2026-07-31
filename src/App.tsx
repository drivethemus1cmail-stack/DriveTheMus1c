import { useState } from "react";
import { MusicProvider } from "./audio/MusicContext";
import { RouterProvider, useRouter } from "./router";
import IgnitionScreen from "./components/IgnitionScreen";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import CompatibilityStrip from "./components/CompatibilityStrip";
import Statement from "./components/Statement";
import WaveformShowcase from "./components/WaveformShowcase";
import IncludedTiles from "./components/IncludedTiles";
import Services from "./components/Services";
import ProcessSection from "./components/ProcessSection";
import RightsSection from "./components/RightsSection";
import MyMusic from "./components/MyMusic";
import Footer from "./components/Footer";

function hasStartedBefore() {
  try {
    return sessionStorage.getItem("dtm-ignition-done") === "1";
  } catch {
    return false;
  }
}

function HomePage() {
  return (
    <>
      <Hero />
      <CompatibilityStrip />
      <Statement />
      <WaveformShowcase />
      <IncludedTiles />
      <Services />
      <ProcessSection />
      <RightsSection />
    </>
  );
}

function Routes() {
  const { path } = useRouter();
  return path === "/music" ? <MyMusic /> : <HomePage />;
}

function App() {
  const [ignitionDone, setIgnitionDone] = useState(hasStartedBefore);

  return (
    <MusicProvider>
      <RouterProvider>
        {!ignitionDone && <IgnitionScreen onComplete={() => setIgnitionDone(true)} />}

        <div className="min-h-screen">
          <TopBar />
          <main>
            <Routes />
          </main>
          <Footer />
        </div>
      </RouterProvider>
    </MusicProvider>
  );
}

export default App;
