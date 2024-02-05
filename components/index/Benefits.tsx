import Image from "next/image";
import MaxWidthWrapper from "../MaxWidthWrapper";
import "./custom.css";

const Benefits = () => {
  return (
    <section className="bg-secondary py-32">
      <MaxWidthWrapper>
        <h2 className="my-8 text-center text-3xl font-semibold text-red-800">
          Why PES Academy?
        </h2>
        <div className="grid-cols-2 grid-rows-2 gap-4 md:grid">
          <div className="md:flex">
            <div className="basis-2/3 bg-primary">
              <div className="flex">
                <div className="space-y-8 p-8 ">
                  <div className="relative">
                    <h3 className="half-underline text-2xl font-semibold text-white">
                    Elevate Your Expertise
                    </h3>
                  </div>

                  <p className="text-white ">
                  Stay ahead in the competitive financial landscape with PES Academy. Our comprehensive courses, crafted and led by industry leaders, provide a transformative learning experience.
                  </p>
                </div>
              </div>
            </div>
            <Image
              src="/index/female_student.jpg"
              alt="Male Student"
              height={200}
              width={200}
              className="h-auto w-full basis-1/3"
            />
          </div>
          <div className="md:flex">
            <div className="basis-2/3 bg-primary">
              <div className="flex">
                <div className="space-y-8 p-8 ">
                  <div className="relative">
                    <h3 className="half-underline text-2xl font-semibold text-white">
                    Practical Insights for Success
                    </h3>
                  </div>

                  <p className="text-white ">
                  Benefit from hands-on knowledge, strategic perspectives, and practical skills that set you apart in the industry.
                  </p>
                </div>
              </div>
            </div>
            <Image
              src="/index/male_student.jpg"
              alt="Male Student"
              height={200}
              width={200}
              className="h-auto w-full basis-1/3"
            />
          </div>
          <div className="md:flex">
            <div className="basis-2/3 bg-primary">
              <div className="flex">
                <div className="space-y-8 p-8 ">
                  <div className="relative">
                    <h3 className="half-underline text-2xl font-semibold text-white">
                    Expert-Led Specializations
                    </h3>
                  </div>

                  <p className="text-white ">
                  Choose expertise. PES Academy stands out for its expert-led specializations.
                  </p>
                </div>
              </div>
            </div>
            <Image
              src="/index/male_student.jpg"
              alt="Male Student"
              height={200}
              width={200}
              className="h-auto w-full basis-1/3"
            />
          </div>
          <div className="md:flex">
            <div className="basis-2/3 bg-primary">
              <div className="flex">
                <div className="space-y-8 p-8 ">
                  <div className="relative">
                    <h3 className="half-underline text-2xl font-semibold text-white">
                    Future-Ready Learning
                    </h3>
                  </div>

                  <p className="text-white ">
                  Our forward-looking curriculum ensures you&apos;re equipped with the latest industry trends and innovations. 
                  </p>
                </div>
              </div>
            </div>
            <Image
              src="/index/female_student.jpg"
              alt="Male Student"
              height={200}
              width={200}
              className="h-auto w-full basis-1/3"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Benefits;
