import { Trophy } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";

type Props = {};

const SelfSelection = (props: Props) => {
  return (
    <MaxWidthWrapper>
      <div className="justify-between gap-4 md:flex">
        <div className="relative bg-primary">
          <div className="absolute left-[calc(50%-4rem)] -translate-y-1/2 transform rounded-full bg-primary p-12">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <div className="flex h-48 flex-col items-center justify-around  p-8 text-white">
            <h2 className="mt-8 font-semibold">Industry Leader</h2>
            <p>
              We are experts in this industry with over 100 years of experience.
            </p>
          </div>
        </div>
        <div className="relative bg-primary">
          <div className="absolute left-[calc(50%-4rem)] -translate-y-1/2 transform rounded-full bg-primary p-12">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <div className="flex h-48 flex-col items-center justify-around  p-8 text-white">
            <h2 className="mt-8 font-semibold">Industry Leader</h2>
            <p>
              We are experts in this industry with over 100 years of experience.
            </p>
          </div>
        </div>
        <div className="relative bg-primary">
          <div className="absolute left-[calc(50%-4rem)] -translate-y-1/2 transform rounded-full bg-primary p-12">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <div className="flex h-48 flex-col items-center justify-around  p-8 text-white">
            <h2 className="mt-8 font-semibold">Industry Leader</h2>
            <p>
              We are experts in this industry with over 100 years of experience.
            </p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SelfSelection;
