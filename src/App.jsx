// import "./App.css";
import AboutUs from "./components/AboutUs.jsx";
import { AlexioContext } from "./Context";
import Nav from "./Nav.jsx";
import Header from "./Header.jsx";
import { useEffect, useState, Suspense, useContext } from "react";
import HomeBanner from "./components/HomeBanner.jsx";
import Contact from "./components/Contact.jsx";
import Services from "./components/Services.jsx";
import VideoPopup from "./components/popup/VideoPopup.jsx";
import ImageView from "./components/popup/ImageView.jsx";
import Preloader from "./Preloader.jsx";

function App() {
  const [PortfolioComponent, setPortfolioComponent] = useState(null); // Rename state variable

  useEffect(() => {
    const loadPortfolioComponent = async () => {
      const { default: PortfolioComponent } = await import(
        "./components/Portfolio"
      );
      setPortfolioComponent(() => PortfolioComponent);
    };

    loadPortfolioComponent();

    document.querySelector("html").classList.add("js");
    document.querySelector("body").classList.add("dark-body");

    return () => {
      document.querySelector("html").classList.remove("js");
      document.querySelector("body").classList.remove("dark-body");
    };
  }, []);

  const { toggle } = useContext(AlexioContext);

  const [load, setLoad] = useState(false);
  const [load1, setLoad1] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoad1(true);
    }, 1000);
    setTimeout(() => {
      setLoad(true);
    }, 2000);
  }, []);

  return (
    <>
      {!load && <Preloader />}
      {load1 && (
        <>
          <VideoPopup />
          <ImageView />
          <Nav />
          <div className={`pages-stack ${toggle ? "pages-stack--open" : ""}`}>
            <HomeBanner />
            <AboutUs />
            <Services />
            <Suspense fallback={<Preloader />}>
              {PortfolioComponent && <PortfolioComponent />}
            </Suspense>
            <Contact />
          </div>
          <Header />
        </>
      )}
    </>
  );
}

export default App;
