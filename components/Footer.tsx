import Image from "next/image";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  AtSign,
  Contact2,
  Facebook,
  Instagram,
  Linkedin,
  MailPlus,
  Phone,
  Twitter,
  TwitterIcon,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary py-32 text-white">
      <MaxWidthWrapper className="grid-cols-3 md:grid">
        <div>
          <Image
            src="/logo.png"
            height={80}
            width={80}
            alt="PES Logo"
            className="mb-4"
          />
          <h4 className="text-md font-semibold">Contact info</h4>
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
              Mobile: <br />
            </span>
            <a href="mailto:connect@privateequity-support.com">
              connect@privateequity-support.com
            </a>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <a href="#">
              <Twitter className="h-8 w-8" />
            </a>
            <a href="#">
              <Facebook className="h-8 w-8" />
            </a>
            <a href="#">
              <Linkedin className="h-8 w-8" />
            </a>
            <a href="#">
              <Youtube className="h-8 w-8" />
            </a>
            <a href="#">
              <AtSign className="h-8 w-8" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold">Quick Links</h4>
          <ul>
            <li>
              <Link
                className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-zinc-400 after:transition after:duration-300 after:content-[''] hover:text-zinc-400 after:hover:scale-x-100"
                href="/browse"
              >
                Browse Courses
              </Link>
            </li>
            <li>
              <Link
                className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-zinc-400 after:transition after:duration-300 after:content-[''] hover:text-zinc-400 after:hover:scale-x-100"
                href="#"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-zinc-400 after:transition after:duration-300 after:content-[''] hover:text-zinc-400 after:hover:scale-x-100"
                href="#"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-zinc-400 after:transition after:duration-300 after:content-[''] hover:text-zinc-400 after:hover:scale-x-100"
                href="#"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold">Subscribe to our newsletter</h4>
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl">
            <p className="mb-6 text-base text-white md:text-lg">
              Get the latest insights, expert advice, and exclusive updates in the world of private equity and stay updated when new courses are released.
            </p>
            <form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-8">
              <Input
                className="w-full rounded-full bg-slate-100 py-6 pl-12 focus-visible:ring-slate-200 md:w-full"
                placeholder=" Your Email"
                type="text"
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-pes-red font-semibold text-white mx-4 shadow-md hover:text-pes-red"
              >
                Subscribe
              </Button>
              
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
