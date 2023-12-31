import axios from "axios";

const pdfjs = require("@/external/pdf");

export const getText = async (pdfUrl: string, pageNumber: number) => {
  pdfjs.disableWorker = true;

  const response = await axios.get(pdfUrl, {
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(response.data);

  const document = await pdfjs.getDocument(buffer);
  const page = await document.getPage(pageNumber);

  const pageText = renderPage(page);

  return pageText;
};

// Source: https://gitlab.com/autokent/pdf-parse/-/blob/master/lib/pdf-parse.js?ref_type=heads
const renderPage = (pageData: any) => {
  let render_options = {
    normalizeWhitespace: false,

    disableCombineTextItems: false,
  };

  return pageData.getTextContent(render_options).then((textContent: any) => {
    let lastY,
      text = "";
    for (let item of textContent.items) {
      if (lastY == item.transform[5] || !lastY) {
        text += item.str;
      } else {
        text += "\n" + item.str;
      }
      lastY = item.transform[5];
    }
    return text;
  });
};
