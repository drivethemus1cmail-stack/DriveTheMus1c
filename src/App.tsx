import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import CompatibilityStrip from "./components/CompatibilityStrip";
import Statement from "./components/Statement";
import WaveformShowcase from "./components/WaveformShowcase";
import IncludedTiles from "./components/IncludedTiles";
import ProcessSection from "./components/ProcessSection";
import RightsSection from "./components/RightsSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Hero />
      <CompatibilityStrip />
      <Statement />
      <WaveformShowcase />
      <IncludedTiles />
      <ProcessSection />
      <RightsSection />
      <Footer />
    </div>
  );
}

export default App;
