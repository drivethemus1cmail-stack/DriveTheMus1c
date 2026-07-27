import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhatsIncluded from "./components/WhatsIncluded";
import Mission from "./components/Mission";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <WhatsIncluded />
      <Mission />
      <Footer />
    </div>
  );
}

export default App;
