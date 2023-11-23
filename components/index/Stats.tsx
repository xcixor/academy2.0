"use client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import CountUp from "react-countup";

const Stats = () => {
  return (
    <section className="bg-[url('/index/bg_1.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="bg-[rgb(0,0,0)] opacity-70">
        <MaxWidthWrapper>
          <div className="h-[32rem] items-center justify-between gap-2 py-16 md:flex">
            <div className="flex basis-1/3 items-center gap-4 text-white">
              <div className="text-6xl">
                <div className="border-r-4 border-orange-400">
                  <CountUp
                    end={8}
                    duration={5}
                    className="basis-25  font-semibold"
                  />
                </div>
              </div>

              <p className=" ps-4 text-3xl">Instructors</p>
            </div>
            <div className="flex basis-1/3 items-center gap-4 text-white">
              <CountUp
                end={100}
                duration={5}
                suffix="+"
                className="basis-25 border-r-4 border-orange-400 text-6xl font-semibold"
              />
              <p className=" ps-4 text-3xl ">Students</p>
            </div>
            <div className="flex basis-1/3 items-center gap-4 text-white">
              <CountUp
                end={600}
                duration={5}
                suffix="+"
                className="basis-25 border-r-4 border-orange-400 text-6xl font-semibold"
              />

              <p className=" ps-4 text-3xl ">Courses</p>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default Stats;
