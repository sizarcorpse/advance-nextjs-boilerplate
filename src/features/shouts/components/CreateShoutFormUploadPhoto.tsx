"use client";

import { Button } from "@/components/ui/button";
import { inputStyles } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AttachmentPayload } from "@/drizzle/schema/attachment";
import {
  ALLOWED_ATTACHMENT_TYPES,
  MAX_ATTACHMENT_COUNT,
  MAX_EACH_ATTACHMENT_SIZE,
  MAX_TOTAL_ATTACHMENT_SIZE,
} from "@/features/shouts/config";
import { calculateTotalAttachmentSize } from "@/features/shouts/utils";
import { cn } from "@/libs/utils";
import { ImagePlus } from "lucide-react";
import { FC, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

type CreateShoutFormUploadPhotoProps = {
  setAttachment: any;
  attachments: AttachmentPayload[];
};

const CreateShoutFormUploadPhoto: FC<CreateShoutFormUploadPhotoProps> = ({
  setAttachment,
  attachments,
}) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const validateFile = useCallback(
    (file: File): boolean => {
      if (file.size > MAX_EACH_ATTACHMENT_SIZE) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: `File ${file.name} exceeds the maximum file size of ${MAX_EACH_ATTACHMENT_SIZE}MB.`,
        });
        return false;
      }

      if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: `File ${file.name} is not a valid file type. Only JPEG, PNG, and GIF files are allowed.`,
        });
        return false;
      }

      return true;
    },
    [toast]
  );

  const processFile = (file: File): Promise<AttachmentPayload> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const img = new Image();

        img.onload = () => {
          const formData = new FormData();
          formData.append("file", file);

          resolve({
            name: uuidv4(),
            file: formData,
            preview: imageUrl,
            metadata: {
              width: img.width,
              height: img.height,
            },
          });
        };

        img.onerror = () => {
          reject(new Error(`Failed to load image for file ${file.name}`));
        };

        img.src = imageUrl;
      };

      reader.onerror = () => {
        reject(new Error(`Failed to read file ${file.name}`));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleAttachmentChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files.length === 0) {
        setAttachment([]);
        return;
      }

      const validFiles = Array.from(files).filter(validateFile);

      if (validFiles.length === 0) {
        return;
      }

      const totalSize = calculateTotalAttachmentSize(attachments);
      const newFilesSize = validFiles.reduce((acc, file) => acc + file.size, 0);

      if (totalSize + newFilesSize > MAX_TOTAL_ATTACHMENT_SIZE) {
        toast({
          variant: "destructive",
          title: "Total file size exceeded",
          description: `Total file size exceeds the maximum of ${MAX_TOTAL_ATTACHMENT_SIZE}MB.`,
        });
        return;
      }

      if (attachments.length + validFiles.length > MAX_ATTACHMENT_COUNT) {
        toast({
          variant: "destructive",
          title: "Maximum file count exceeded",
          description: `You can only upload a maximum of ${MAX_ATTACHMENT_COUNT} files.`,
        });
        return;
      }

      try {
        const newAttachments = await Promise.all(validFiles.map(processFile));
        setAttachment((prev: AttachmentPayload[]) => [
          ...prev,
          ...newAttachments,
        ]);

        e.target.value = "";
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error processing files",
          description: error.message,
        });
      }
    },
    [setAttachment, toast, validateFile, attachments]
  );

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <input
        type="file"
        id="attachments"
        ref={inputRef}
        className="hidden"
        onChange={handleAttachmentChange}
        accept={ALLOWED_ATTACHMENT_TYPES.join(",")}
        multiple={true}
      />
      <Button
        type="button"
        onClick={handleButtonClick}
        className={cn(
          inputStyles,
          `bg-primary/5 p-2 text-primary/60 aspect-square hover:bg-muted`
        )}
      >
        <ImagePlus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CreateShoutFormUploadPhoto;
