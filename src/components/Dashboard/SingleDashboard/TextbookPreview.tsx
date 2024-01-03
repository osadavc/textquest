import { useState, FC, Dispatch, SetStateAction } from "react";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

interface TextbookPreview {
  fileURL: string;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  closeDialog: () => void;
}

const TextbookPreview: FC<TextbookPreview> = ({
  fileURL,
  pageNumber,
  setPageNumber,
  closeDialog,
}) => {
  const [numPages, setNumPages] = useState<number>();

  const onDocumentLoadSuccess = async ({
    numPages: nextNumPages,
  }: PDFDocumentProxy) => {
    setNumPages(nextNumPages);
  };

  return (
    <div className="mt-10 flex flex-col">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber((prevNumber) => prevNumber - 1);
            }
          }}
        >
          <FiChevronLeft />
        </Button>
        <p className="flex-grow text-center font-semibold">Page {pageNumber}</p>
        <Button
          variant="outline"
          onClick={() => {
            if (pageNumber + 1 <= numPages!) {
              setPageNumber((prevNumber) => prevNumber + 1);
            }
          }}
        >
          <FiChevronRight />
        </Button>
      </div>

      <Document
        className="mt-10"
        file={fileURL}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{
          cMapUrl: "/cmaps/",
          standardFontDataUrl: "/standard_fonts/",
        }}
      >
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          width={450}
        />
      </Document>

      <Button onClick={closeDialog} className="absolute bottom-10 w-[90%]">
        Choose Page
      </Button>
    </div>
  );
};

export default TextbookPreview;
