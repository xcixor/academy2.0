"use client";

import axios from "axios";
import { PlusCircle, File, Loader2, X, Ban } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GCPData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { DropZoneDocumentFileTypes } from "@/constants";
import Link from "next/link";

interface ReviewDocumentFormProps {
  reviewId: string;
  isDeleting: boolean;
  attachmentId: string;
}

export default function ReviewDocumentForm({
  reviewId,
  isDeleting,
  attachmentId,
}: ReviewDocumentFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      // await axios.delete(`/api/courses/${reviewId}/attachments/${id}`);
      await axios.delete(`/api/gcp/asset/${id}`);

      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Review File
        {isDeleting ? (
          <Ban className="h-4 w-4" />
        ) : (
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>Cancel</>}
            {!isEditing && (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add a file
              </>
            )}
          </Button>
        )}
      </div>

      {isEditing && (
        <div>
          <FileUpload
            bucketFileDirectory={`courses/${reviewId}/documents`}
            toggleEdit={toggleEdit}
            fileMessage={"pdf, docx, txt, zip, rar, ppt, pptx, xls, xlsx, doc"}
            acceptedFileTypes={DropZoneDocumentFileTypes}
            assetId={attachmentId}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            Upload any documents you want the coach to review for you.
          </div>
        </div>
      )}
    </div>
  );
}
