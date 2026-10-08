import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Catalog } from '@/components/Catalog';
import { CategoryTabs } from '@/components/CategoryTabs';
import { DateDialog } from '@/components/DateDialog';
import { FaqSection } from '@/components/Faq';
import { ChatFab, FloatingPill, MobileNav } from '@/components/FloatingUi';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { Panels } from '@/components/Panels';
import { Reviews } from '@/components/Reviews';

export default function GamingRentalsPage() {
  return (
    <>
      <Header />
      <main className="min-h-dvh">
        <div className="container px-0 py-24 md:py-20">
          {/* On mobile the tabs and the hero sit on a purple band that continues the header. */}
          <div className="relative bg-gaming-hero max-md:pb-3 md:bg-none">
            <CategoryTabs />
            <div className="block px-2 md:hidden">
              <HeroBanner />
            </div>
          </div>
          <Catalog />
        </div>
        <FaqSection />
        <Breadcrumbs />
        <Reviews />
      </main>
      <Footer />

      <FloatingPill />
      <ChatFab />
      <MobileNav />
      <DateDialog />
      <Panels />
    </>
  );
}
