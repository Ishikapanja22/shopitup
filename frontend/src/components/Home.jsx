import React from "react";
import HeroSection from "./HeroSection";

const Home = ({ showPage }) => {
  return (
    <main id="home" className="page active" style={{ paddingTop: "76px" }}>
      

      <HeroSection
        onShopNow={() => showPage("products")}
        onBrowseCategories={() => showPage("categories")}
      />

      <section className="text-center py-4">
        <div className="container">
          <p className="lead mb-0">Thanks for using our site 🙌</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: "var(--maroon)" }}>
            Buy more products from our store and get a great deal
          </h2>
         
        </div>
      </section>
    </main>
  );
};

export default Home;
