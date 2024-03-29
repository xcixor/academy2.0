import { redirect } from "next/navigation";
import { File, FileQuestion, Files, MessageCircle } from "lucide-react";

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
import { IconBadge } from "@/components/IconBadge";
import QuizList from "@/components/courses/courseId/quizzes/QuizList";
import { getCourseOwner } from "@/actions/get-course-owner";
import Attachment from "./attachment/Attachment";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/");
  }

  const imageMetaData = await getLatestFileMetaData(params.courseId);

  const {
    chapter,
    course,
    gcpData,
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
    return redirect("/browse");
  }
  const isCourseOwner = await getCourseOwner(userId, params.courseId);
  const isLocked = !chapter.isFree && !purchase && !isCourseOwner;
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
      <div className="mx-auto flex flex-col items-center justify-center pb-20">
        <div className="w-full p-4">
          <VideoPlayer
            posterUrl={imageMetaData?.downloadUrl || ""}
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            videoUrl={gcpData ? gcpData.downloadUrl : ""}
          />
        </div>
        <div className="min-w-[80%] max-w-4xl">
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>

            {purchase || course.isFree ? (
              <div className="flex gap-4 align-middle">
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
                    <MessageCircle className="ml-2 h-4 w-4" />
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
                <AccordionTrigger>
                  <span className="flex items-center gap-4">
                    <IconBadge icon={Files} />
                    Materials
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4">
                    {attachments.map((attachment) => (
                      <Attachment
                        key={attachment.id}
                        attachmentId={attachment.id}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
            {purchase && (
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <span className="flex items-center gap-4">
                    <IconBadge icon={MessageCircle} />
                    Discussion
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <CommentSection courseId={params.courseId} />
                </AccordionContent>
              </AccordionItem>
            )}
            {purchase && (
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <span className="flex items-center gap-4">
                    <IconBadge icon={FileQuestion} />
                    Quizes
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <QuizList courseId={params.courseId} />
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
