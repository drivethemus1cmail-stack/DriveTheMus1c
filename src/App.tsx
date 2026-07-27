import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Templates from "./components/Templates";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Templates />
      <About />
      <Footer />
    </div>
  );
}

export default App;
