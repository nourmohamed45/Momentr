import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

// Size limit in bytes (1.5 MB = 1.5 * 1024 * 1024 bytes)
const MAX_FILE_SIZE = 1.5 * 1024 * 1024;

// Allowed file types
const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/svg+xml": [".svg"],
};

const ASPECT_RATIO_REQUIREMENTS = {
  SQUARE: {
    ratio: 1,
    minWidth: 1080,
    maxWidth: 1350,
    tolerance: 0.01,
  },
  LANDSCAPE: {
    ratio: 4 / 3,
    minWidth: 1024,
    maxWidth: 2048,
    tolerance: 0.1,
  },
  PORTRAIT: {
    ratio: 3 / 4,
    minHeight: 1024,
    maxHeight: 2048,
    tolerance: 0.1,
  },
};

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const { toast } = useToast();

  const validateFileType = (file: File): boolean => {
    const fileType = file.type;
    console.log(`File type: ${fileType}`);
    return Object.keys(ACCEPTED_IMAGE_TYPES).includes(fileType);
  };

  const getFileExtension = (fileName: string): string => {
    return fileName.toLowerCase().split(".").pop() ?? "";
  };

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[], rejectedFiles: any[]) => {
      // Handle rejected files first
      if (rejectedFiles.length > 0) {
        const rejectedFile = rejectedFiles[0];
        // Check if it's a file type error
        if (!validateFileType(rejectedFile.file)) {
          toast({
            variant: "destructive",
            title: "Invalid file type",
            description: "Please upload only JPG, JPEG, PNG, or SVG files",
          });
          return;
        }
        return;
      }

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Validate file type
      if (!validateFileType(file)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload only JPG, JPEG, PNG, or SVG files",
        });
        return;
      }

      // Validate file extension
      const extension = getFileExtension(file.name);
      const isValidExtension = Object.values(ACCEPTED_IMAGE_TYPES)
        .flat()
        .includes(`.${extension}`);

      if (!isValidExtension) {
        toast({
          variant: "destructive",
          title: "Invalid file extension",
          description: "Please upload only JPG, JPEG, PNG, or SVG files",
        });
        return;
      }

      // Check file size
      const fileSize = file.size;
      const fileSizeMB = fileSize / (1024 * 1024);
      console.log(`File size: ${fileSizeMB.toFixed(2)} MB`);

      if (fileSize > MAX_FILE_SIZE) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: `File size (${fileSizeMB.toFixed(
            2
          )} MB) exceeds the limit of 1.5 MB`,
        });
        return;
      }

      // Check dimensions
      const img = new Image();
      const validateDimensions = new Promise<boolean>((resolve) => {
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          console.log(
            `Image dimensions: ${img.width} x ${
              img.height
            }, Aspect ratio: ${aspectRatio.toFixed(2)}`
          );

          let isValid = false;
          let ratioType = "";

          if (
            Math.abs(aspectRatio - ASPECT_RATIO_REQUIREMENTS.SQUARE.ratio) <=
            ASPECT_RATIO_REQUIREMENTS.SQUARE.tolerance
          ) {
            isValid =
              img.width >= ASPECT_RATIO_REQUIREMENTS.SQUARE.minWidth &&
              img.width <= ASPECT_RATIO_REQUIREMENTS.SQUARE.maxWidth;
            ratioType = "square";
          } else if (
            Math.abs(aspectRatio - ASPECT_RATIO_REQUIREMENTS.LANDSCAPE.ratio) <=
            ASPECT_RATIO_REQUIREMENTS.LANDSCAPE.tolerance
          ) {
            isValid =
              img.width >= ASPECT_RATIO_REQUIREMENTS.LANDSCAPE.minWidth &&
              img.width <= ASPECT_RATIO_REQUIREMENTS.LANDSCAPE.maxWidth;
            ratioType = "landscape";
          } else if (
            Math.abs(aspectRatio - ASPECT_RATIO_REQUIREMENTS.PORTRAIT.ratio) <=
            ASPECT_RATIO_REQUIREMENTS.PORTRAIT.tolerance
          ) {
            isValid =
              img.height >= ASPECT_RATIO_REQUIREMENTS.PORTRAIT.minHeight &&
              img.height <= ASPECT_RATIO_REQUIREMENTS.PORTRAIT.maxHeight;
            ratioType = "portrait";
          }

          console.log(`Detected ratio type: ${ratioType}`);
          console.log(`Validation result: ${isValid}`);

          URL.revokeObjectURL(img.src);
          resolve(isValid);
        };

        img.onerror = () => {
          console.error("Error loading image for validation");
          URL.revokeObjectURL(img.src);
          resolve(false);
        };
      });

      img.src = URL.createObjectURL(file);
      const isValid = await validateDimensions;

      if (!isValid) {
        toast({
          variant: "destructive",
          title: "Invalid image dimensions",
          description:
            "Please upload an image that matches one of these formats:\n" +
            "• Square: 1080x1080 to 1350x1350 pixels\n" +
            "• Landscape: 1024x768 or similar (4:3 ratio)\n" +
            "• Portrait: 768x1024 or similar (3:4 ratio)",
        });
        return;
      }

      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(file));
    },
    [fieldChange, toast]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="post-image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag and drop your photo
          </h3>
          <p className="text-light-4 small-regular mb-6">
            Requirements:
            <br />• Allowed types: JPG, JPEG, PNG, SVG
            <br />• Max file size: 1.5 MB
            <br />• Square: 1080x1080 to 1350x1350 pixels
            <br />• Landscape: 1024x768 or similar (4:3)
            <br />• Portrait: 768x1024 or similar (3:4)
          </p>
          <Button className="shad-button_dark_4">Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
