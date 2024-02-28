import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/IconBadge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./CourseProgress";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  id: string;
  title: string;
  chaptersLength: number;
  price: number;
  progress?: number | null;
  category: string;
  isFree: boolean;
}

export default async function CourseCard({
  id,
  title,
  chaptersLength,
  price,
  progress,
  category,
  isFree,
}: CourseCardProps) {
  const imageMetaData = await getLatestFileMetaData(id);

  return (
    <Link href={`/courses/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageMetaData ? imageMetaData.downloadUrl : ""}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-x-1 text-slate-500">
                <IconBadge size="sm" icon={BookOpen} />
                <span>
                  {chaptersLength}{" "}
                  {chaptersLength === 1 ? "Chapter" : "Chapters"}
                </span>
              </div>
              {isFree && <Badge>Free</Badge>}
            </div>
          </div>
          {progress && progress !== null ? (
            <CourseProgress
              size="sm"
              value={progress}
              variant={progress === 100 ? "success" : "default"}
            />
          ) : (
            <p className="text-md font-medium text-slate-700 md:text-sm">
              {!isFree && formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
