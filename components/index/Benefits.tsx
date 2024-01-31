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
                      Education Organization
                    </h3>
                  </div>

                  <p className="text-white ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam ex numquam quis hic ratione vero laborum doloribus
                    non ullam dolores.
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
                      Education Organization
                    </h3>
                  </div>

                  <p className="text-white ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam ex numquam quis hic ratione vero laborum doloribus
                    non ullam dolores.
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
                      Education Organization
                    </h3>
                  </div>

                  <p className="text-white ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam ex numquam quis hic ratione vero laborum doloribus
                    non ullam dolores.
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
                      Education Organization
                    </h3>
                  </div>

                  <p className="text-white ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam ex numquam quis hic ratione vero laborum doloribus
                    non ullam dolores.
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
