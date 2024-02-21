'use client';
import React, { useRef } from 'react';
import Link from "next/link";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

export default function Index() {
  const background = useRef(null);
  const introImage = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top",
        end: "+=500px",
      },
    });

    timeline
      .from(background.current, { clipPath: `inset(8%)` })
      .to(introImage.current, { height: "200px" }, 0);
  }, []);

  return (
    <div className="relative w-full flex justify-center pb-80">
      <div className="absolute w-full h-[100vh] md:h-[100vh] filter brightness-75 sm:h-[100vh]" ref={background}>
        <Image
          src={'/../images/background.jpg'}
          fill={true}
          style={{ objectFit: "cover" }}
          alt="background image"
          priority={true}
        />
      </div>
      <div className="flex justify-center relative mt-[35vh] sm:mt-[20vh]">
        <div ref={introImage} data-scroll data-scroll-speed="0.3" className="filter brightness-70 max-w-full w-[200px] h-[220px] md:w-[500px] md:h-[475px] absolute sm:mt-[-160px]">
          <Image className='mt-[-100px] md:mt-[50px] lg:mt-[160px]'
            src={'/../images/PES-Academy-logo.png'}
            alt="intro image"
            fill={true}
            objectFit="cover"
            priority={true}
          />
        </div>
        <div className="absolute flex items-center justify-center mt-[150px] md:mt-[280px] lg:mt-[500px]">
          <Link href="/dashboard/teacher/courses">
            <Button
              onClick={() => signIn()}
              size="sm"
              variant="secondary"
              className="h-auto bg-pes-red py-2 text-white hover:bg-pes-blue shadow"
            >
              Start Learning!
            </Button>
          </Link>
        </div>
        
        <h1 data-scroll data-scroll-speed="0.7" className="text-white text-[6vw] z-10 text-center whitespace-nowrap mt-[-120px] md:mt-[-70px] uppercase sm:mt-[-170px] sm:text-[6vw]">
          Future-Ready Learning
        </h1>
      </div>
    </div>
  );
}