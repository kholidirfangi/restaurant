import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import Navbar from "@/components/Navbar";
import TestimoniSection from "@/components/TestimoniSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <TestimoniSection />
      <Footer/>
    </>
  );
}
