import Image from "next/image";
import "./custom.css";

type Props = {};

const Welcome = (props: Props) => {
  return (
    <section className="flex flex-col items-center gap-8 py-32">
      <div className="w-1/2 text-center">
        <h2 className="text-3xl font-semibold text-red-800">Welcome To PES Academy</h2>
        <p>
          As a cutting-edge platform, we go beyond conventional learning, offering a dynamic range of courses designed and led by industry experts. Whether you&apos;re starting your journey or seeking advanced insights, PES Academy empowers you with the knowledge and skills needed to thrive in the ever-evolving world of finance. Join us on this transformative educational experience where expertise meets innovation, and where your success in private equity begins
        </p>
      </div>
      <div className="relative flex w-full items-center justify-center space-y-4">
        <Image
          src="/index/about_img.png"
          alt="Welcome Image"
          height={400}
          width={400}
          className="z-10 h-[400px] w-auto max-w-full"
        />
        <div className="bg-img absolute bottom-0 h-1/2 w-full bg-[url('/index/waves2.svg')] bg-cover bg-center bg-no-repeat"></div>
      </div>
    </section>
  );
};

export default Welcome;
