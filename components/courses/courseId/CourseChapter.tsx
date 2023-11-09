import { redirect } from "next/navigation";
import { File, MessageCircle } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/Banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/Preview";

import { VideoPlayer } from "./chapters/chapterId/VideoPlayer";
import CourseEnrollButton from "./chapters/chapterId/CourseEnrollButton";
import CourseProgressButton from "./chapters/chapterId/CourseProgressButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CommentSection from "@/components/courses/courseId/discussion/CommentSection";
import { getLoggedInUser } from "@/lib/auth/utils";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect("/");
  }

  const { userId } = user;

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col justify-center items-center mx-auto pb-20">
        <div className="p-4 w-full">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="max-w-4xl min-w-[80%]">
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>

            {purchase ? (
              <div className="flex align-middle gap-4">
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
                <Link
                  href={`/courses/${params.courseId}/discussion`}
                  target="_blank"
                >
                  <Button type="button" className="w-full md:w-auto">
                    <MessageCircle className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>

          <Accordion type="single" collapsible className="p-4">
            {!!attachments.length && (
              <AccordionItem value="item-1">
                <AccordionTrigger>Materials</AccordionTrigger>
                <AccordionContent>
                  <div className="p-4">
                    {attachments.map((attachment) => (
                      <a
                        href={attachment.url}
                        target="_blank"
                        key={attachment.id}
                        className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                      >
                        <File />
                        <p className="line-clamp-1">{attachment.name}</p>
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <span className="flex">
                  Discussion
                  <MessageCircle className="ms-2" />
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <CommentSection courseId={params.courseId} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
