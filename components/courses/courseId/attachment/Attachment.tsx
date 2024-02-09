import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import Link from "next/link";
import { File, FileX2 } from "lucide-react";

type Props = {
  attachmentId: string;
};

const Attachment = async ({ attachmentId }: Props) => {
  const attachment = await getLatestFileMetaData(attachmentId);

  if (attachment) {
    return (
      <div>
        <Link
          href={attachment.downloadUrl}
          target="_blank"
          key={attachment.id}
          className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
        >
          <File />
          <p className="line-clamp-1">{attachment.assetName}</p>
        </Link>
      </div>
    );
  }
  return (
    <div className="my-2 flex gap-2 align-baseline text-red-500">
      <FileX2 className="h-8 w-8" />
      <p className="m-0 self-center p-0">File not Found</p>
    </div>
  );
};

export default Attachment;
