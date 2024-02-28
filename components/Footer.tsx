import Image from "next/image";
import React from "react";
import {
  Contact2,
  Facebook,
  Instagram,
  Linkedin,
  MailPlus,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (

    <footer className="w-full bg-primary text-white">
      <div className="px-8 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 mb-3 md:grid-cols-3 lg:grid-cols-12 lg:gap-20">
          <div className="col-span-3">
            <Image
              src="/images/pes-academy-logo-white.png"
              height={80}
              width={100}
              alt="PES Logo"
              className="mb-4"
            />
            <p className="my-4 text-xs leading-normal">
              At PES Academy, we offer a comprehensive catalog of courses designed to cater to every skill level — from enthusiastic beginners to seasoned professionals. Each course is meticulously crafted to bridge knowledge gaps and enhance your skill set, ensuring you&apos;re equipped to meet the challenges of today&apos;s dynamic work environment.
            </p>
          </div>
          <nav className="col-span-1 md:col-span-1 lg:col-span-2">
            <p className="mb-3 font-semibold tracking-wider uppercase">Contact info</p>
            <div className="mb-4">
              <span className="flex gap-2">
                <Contact2 className="h-6 w-6" />
                Address: <br />
              </span>
              5th Floor, Timau Plaza, Argwings Kodhek Road, <br />
              Nairobi, Kenya.
            </div>
            <div className="mb-4">
              <span className="flex gap-2">
                <Phone className="h-6 w-6" />
                Mobile: <br />
              </span>
              <a href="tel:+254 707 151 783">+254 707 151 783</a>
            </div>
            <div className="mb-4">
              <span className="flex gap-2">
                <MailPlus className="h-6 w-6" />
                Email: <br />
              </span>
              <a href="mailto:connect@privateequity-support.com">
                connect@privateequity-support.com
              </a>
            </div>
          </nav>
          <nav className="col-span-1 md:col-span-1 lg:col-span-2">
            <p className="mb-3 font-semibold tracking-wider uppercase">Quick Links</p>
            <ul>
              <li>
                <Link
                  className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-pes-red after:transition after:duration-300 after:content-[''] hover:text-pes-light-blue after:hover:scale-x-100"
                  href="/browse"
                >
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-pes-red after:transition after:duration-300 after:content-[''] hover:text-pes-light-blue after:hover:scale-x-100"
                  href="#"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-pes-red after:transition after:duration-300 after:content-[''] hover:text-pes-light-blue after:hover:scale-x-100"
                  href="#"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-pes-red after:transition after:duration-300 after:content-[''] hover:text-pes-light-blue after:hover:scale-x-100"
                  href="#"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="col-span-2 md:col-span-1 lg:col-span-2">
            <p className="mb-3 font-semibold tracking-wider  uppercase">Support</p>
            <ul>
              <li>
                <Link
                  className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-pes-red after:transition after:duration-300 after:content-[''] hover:text-pes-light-blue after:hover:scale-x-100"
                  href="/browse"
                >
                  How to use PES Academy
                </Link>
              </li>
              <li>
                <Link
                  className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-pes-red after:transition after:duration-300 after:content-[''] hover:text-pes-light-blue after:hover:scale-x-100"
                  href="/terms"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-pes-red after:transition after:duration-300 after:content-[''] hover:text-pes-light-blue after:hover:scale-x-100"
                  href="/privacy"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-pes-red after:transition after:duration-300 after:content-[''] hover:text-pes-light-blue after:hover:scale-x-100"
                  href="#"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </nav>
          <div className="col-span-3">
            <p className="mb-3 text-xs font-semibold tracking-wider  uppercase">SUBSCRIBE TO OUR NEWSLETTER</p>
            <form className="mb-2">
              <div className=" flex items-center overflow-hidden border border-gray-200 rounded-lg">
                <Input className="w-full px-3 py-2 text-base leading-normal transition duration-150 ease-in-out bg-white text-pes-blue appearance-none focus:outline-none" type="email" placeholder="Enter your email" />
                <Button className="px-3 py-2 text-xs font-medium text-center text-white no-underline bg-pes-red border-2 border-pes-red hover:bg-pes-blue" type="submit">Subscribe</Button>
              </div>
            </form>
            <p className="text-xs leading-normal">Get the latest insights, expert advice, and exclusive updates in the world of private equity and stay updated when new courses are released.</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between pt-10 mt-10 border-t border-gray-100 md:flex-row md:items-center">
          <p className="mb-6 text-sm text-left md:mb-0">© Copyright {currentYear} Private Equity Support. All Rights Reserved.</p>
          <div className="flex items-start justify-start space-x-6 md:items-center md:justify-center">
            <a href="https://twitter.com/PrivateEquityAF">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/privateequityea/">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/company/privateequityaf">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.youtube.com/@PrivateEquitySupport/">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/privateequityaf/">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;