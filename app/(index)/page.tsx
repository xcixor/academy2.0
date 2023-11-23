import Benefits from "@/components/index/Benefits";
import CTA from "@/components/index/CTA";
import CarouselWrapper from "@/components/index/CarouselWrapper";
import ComingSoon from "@/components/index/ComingSoon";
import Instructors from "@/components/index/Instructors";
import PopularCourses from "@/components/index/PopularCourses";
import SelfSelection from "@/components/index/SelfSelection";
import Stats from "@/components/index/Stats";
import Welcome from "@/components/index/Welcome";

export default function Index() {
  return (
    <div>
      <main className=" flex flex-col ">
        <div className="relative mb-48">
          <CarouselWrapper />
          <div className="absolute left-0 right-0 -translate-y-1/2 transform">
            <SelfSelection />
          </div>
        </div>
        <Welcome />
        <Benefits />
        <PopularCourses />
        <Instructors />
        <Stats />
        <ComingSoon />
        <CTA />
      </main>
    </div>
  );
}
