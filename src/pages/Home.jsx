import React from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ProductSlide from "@/components/ProductSlide";
import ProductList from "@/components/ProductList";
import Poster from "@/components/Poster";
import Categories from "@/components/Categories";

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <InfiniteMovingCards className={"my-10"} />
      <ProductSlide title={"Produk Terbaru"} />
      <Poster />
      <ProductList title={"Produk Terlaris"} />
      <Footer />
    </div>
  );
};

export default Home;
