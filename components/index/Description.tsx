'use client'
import React, { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import MaxWidthWrapper from "../MaxWidthWrapper";

const phrases = ["As a cutting-edge platform, we go beyond conventional learning, offering a dynamic range of courses designed and led by industry experts. Whether you're starting your journey or seeking advanced insights, PES Academy empowers you with the knowledge and skills needed to thrive in the ever-evolving world of finance."]

export default function Index() {
    return (
        <div className="relative text-pes-blue text-[2vw] md:p-[4vw] md:text-3xl sm:text-lg mt-40 md:mt-30 md:drop-shadow-md md:text-white lg:mt-72 lg:text-pes-blue lg:drop-shadow-none sm:mt-24 pr-2  ml-4 sm:ml-5 md:ml-6 lg:ml-8">
            {phrases.map((phrase, index) => (
                <AnimatedText key={index}>{phrase}</AnimatedText>
            ))}
        </div>
    );
}

function AnimatedText({ children }) {
    const text = useRef(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(text.current, {
            scrollTrigger: {
                trigger: text.current,
                scrub: true,
                start: "0px bottom",
                end: "bottom+=400px bottom",
                // markers: true,
            },
            opacity: 0,
            x: "-200px",
            ease: "power3.Out"
        });
    }, []);

    return (
        <MaxWidthWrapper>
            <p ref={text} className="m-0 relative text-justify">{children}</p>
        </MaxWidthWrapper>
    );
}