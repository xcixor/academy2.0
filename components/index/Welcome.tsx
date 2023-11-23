import Image from "next/image";
import "./custom.css";

type Props = {};

const Welcome = (props: Props) => {
  return (
    <section className="flex flex-col items-center gap-8 py-32">
      <div className="w-1/2 text-center">
        <h2 className="text-3xl font-semibold">Welcome To PES Academy</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          perferendis quaerat molestiae itaque praesentium illo odio nisi
          corporis, dolores cumque voluptatibus animi provident ullam sunt,
          asperiores, commodi at quia sequi.
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
