import { useState } from "react";
import { MusicProvider } from "./audio/MusicContext";
import IgnitionScreen from "./components/IgnitionScreen";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import CompatibilityStrip from "./components/CompatibilityStrip";
import Statement from "./components/Statement";
import WaveformShowcase from "./components/WaveformShowcase";
import IncludedTiles from "./components/IncludedTiles";
import ProcessSection from "./components/ProcessSection";
import RightsSection from "./components/RightsSection";
import Footer from "./components/Footer";

function hasStartedBefore() {
  try {
    return sessionStorage.getItem("dtm-ignition-done") === "1";
  } catch {
    return false;
  }
}

function App() {
  const [ignitionDone, setIgnitionDone] = useState(hasStartedBefore);

  return (
    <MusicProvider>
      {!ignitionDone && <IgnitionScreen onComplete={() => setIgnitionDone(true)} />}

      <div className="min-h-screen">
        <TopBar />
        <main>
          <Hero />
          <CompatibilityStrip />
          <Statement />
          <WaveformShowcase />
          <IncludedTiles />
          <ProcessSection />
          <RightsSection />
        </main>
        <Footer />
      </div>
    </MusicProvider>
  );
}

export default App;
