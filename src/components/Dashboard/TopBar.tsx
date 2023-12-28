import { Button } from "@/components/ui/button";
import { CiInboxOut } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { UploadButton } from "@/utils/uploadthing";
import { Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const TopBar = () => {
  const [file, setFile] = useState({
    name: "",
    url: "",
  });
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  const uploadTextBook = async () => {
    try {
      setSaving(true);

      const data = await axios.post("/api/textbooks", {
        name: file.name,
        fileURL: file.url,
      });

      setFile({
        name: "",
        url: "",
      });

      toast.success("New Textbook Uploaded");
      setOpen(false);
    } catch (error) {
      toast.error("Error Occurred, Please Try Again");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-3">
      <h3 className="font-bold text-2xl">Uploaded Textbooks</h3>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="bg-customPrimary text-white hover:bg-customPrimary hover:text-white"
          >
            <CiInboxOut className="text-2xl" />{" "}
            <span className="ml-3">Upload a New Textbook</span>
          </Button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Upload New Textbook
            </DialogTitle>
            <DialogDescription>
              Upload a new textbook to start testing your knowledge
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <p className="mb-2 text-gray-600">Select PDF File</p>

            {file.name ? (
              <p className="text-sm text-gray-500">File Already Uploaded</p>
            ) : (
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setFile((prevFile) => ({
                    ...prevFile,
                    name: res[0].name.split(".pdf")[0],
                    url: res[0].url,
                  }));
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
                appearance={{
                  allowedContent: "hidden",
                  button:
                    "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 active:ring-0 ring-0 focus-visible:ring-offset-0 bg-customPrimary",
                  container: "flex flex-col items-start justify-start gap-1",
                }}
              />
            )}

            <p className="mb-2 mt-7 text-gray-600">Textbook Name</p>
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter Textbook Name"
              value={file.name}
              onChange={(e) => {
                setFile((prevFile) => ({
                  ...prevFile,
                  name: e.currentTarget.value,
                }));
              }}
            />
          </div>

          <Button
            variant="ghost"
            className="bg-customPrimary text-white hover:bg-customPrimary hover:text-white mt-4"
            onClick={uploadTextBook}
            disabled={saving}
          >
            <span>{saving ? "Saving" : "Save"}</span>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TopBar;
