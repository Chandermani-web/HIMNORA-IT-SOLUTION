import React from 'react';
import './animations/register';
import { useLenis } from './animations/useLenis';
import { usePointerTracking } from './animations/usePointer';
import { GlobalReveals } from './animations/GlobalReveals';
import { Preloader } from './components/ui/Preloader';
import { PageTransition } from './components/ui/PageTransition';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { SceneHost } from './components/ui/SceneHost';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton';
import { ScrollToTopOnNav } from './components/navigation/ScrollToTopOnNav';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { PricingPage } from './pages/PricingPage';
import { QuotePage } from './pages/QuotePage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  useLenis();
  usePointerTracking();

  return (
    <BrowserRouter>
      <Preloader />
      <PageTransition />
      <ScrollProgress />
      <GlobalReveals />

      {/* Persistent 3D stage (lazy) */}
      <SceneHost />

      {/* Scroll reset on every route transition */}
      <ScrollToTopOnNav />

      {/* Signature Custom Cursor */}
      <CustomCursor />

      {/* App Shell */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10001] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded-full">Skip to content</a>

      <div className="relative z-10 min-h-screen flex flex-col text-[#0a0a0a]">
        {/* Sticky Navbar (5 essentials + LET'S TALK CTA) */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full" id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            
            {/* Work & Portfolio Aliases */}
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/work" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/case-study/:slug" element={<CaseStudyDetailPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/quote" element={<QuotePage />} />

            {/* Blog & Insights Aliases */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/insights" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* 404 Exception Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Navy Scroll-to-Top Button */}
        <ScrollToTopButton />

        {/* Black Rounded Editorial Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
