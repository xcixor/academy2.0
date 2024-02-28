import type { Metadata } from "next";
import CTA from "@/components/index/CTA";
import ComingSoon from "@/components/index/ComingSoon";
import Instructors from "@/components/index/Instructors";
import PopularCourses from "@/components/index/PopularCourses";
import Stats from "@/components/index/Stats";
import Intro from "@/components/index/Intro"
import Description from "@/components/index/Description"
import CookieConsent from "@/components/index/CookieConsent";

export const metadata: Metadata = {
  title: {
    default: "PES Academy",
    template: `%s | PES Academy`
  },
  description: "PES Academy: Nurturing leaders in private equity. Explore courses, learn from industry experts, and elevate your business acumen. Join us in shaping the future!",
  alternates: {
    canonical: '/',
  },
};

export default function Index() {
  return (
    <div>
      <main className=" flex flex-col ">
        <Intro />
        <Description />
        <PopularCourses />
        <Instructors />
        <Stats />
        <ComingSoon />
        <CTA />
        <CookieConsent />
      </main>
    </div>
  );
}