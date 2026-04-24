import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import DanceStyles from './DanceStyles';
import Benefits from './Benefits';
import GroupClassBanner from './GroupClassBanner';
import Instructors from './Instructors';
import VideoSection from './VideoSection';
import Schedule from './Schedule';
import Pricing from './Pricing';
import FreeDownloads from './FreeDownloads';
import Testimonials from './Testimonials';
import IronboundSection from './IronboundSection';
import BookTrial from './BookTrial';
import FAQ from './FAQ';
import MapSection from './MapSection';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <DanceStyles />
      <Benefits />
      <GroupClassBanner />
      <Instructors />
      <VideoSection />
      <Schedule />
      <Pricing />
      <FreeDownloads />
      <Testimonials />
      <IronboundSection />
      <BookTrial />
      <FAQ />
      <MapSection />
      <Footer />
    </div>
  );
};

export default AppLayout;
