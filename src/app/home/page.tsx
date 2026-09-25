import HeroSection from "./hero/heroSection";
import AboutSection from "./about/aboutSection";
import InformationBar from "@/components/informationBar/informationBarComponent";
import BestSellersSection from "./bestSellers/bestSellersSection";
// import ServicesSection from "./services/ServicesSection";
import NewsletterSection from "./newsletter/newsletterSection";
import FeedbacksSection from "./feedbacks/feedbacksSection";
import CategoriesSection from "./categories/categoriesSection";
import MomentsSection from "./moments/momentsSection";
import BenefitsSection from "./benefits/benefitsSection";
import ProcessSection from "./process/processSection";

export default function HomePage() {
  return (
    <main className="">
      <HeroSection />
      <InformationBar
        items={["Horário de funcionamento - Domingo a Sexta das 8h - 19h", "Java Café & Conceito - Rua das Flores, 123 - Centro"]}
        preset={2}
        speed={80}
        separator="✦"
      />
      <AboutSection />
      <BestSellersSection />
      {/* <ServicesSection /> */}
      <CategoriesSection />
      <MomentsSection />
      <BenefitsSection />
      <ProcessSection />
      <FeedbacksSection />
      <NewsletterSection />
      
    </main>
  )
}
