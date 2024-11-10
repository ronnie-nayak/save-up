import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { insertTransactionType } from "@acme/db";

import { Button } from "../shadcn";

export function UploadButton({ data }: { data: insertTransactionType[] }) {
  function handleUpload() {
    console.log("Uploading...");
    console.log(data);
    const doc = new jsPDF();
    const arr = data.map((d) => [
      d.title,
      d.category,
      d.type,
      d.amount,
      d.createdAt!.toLocaleDateString(),
    ]);
    autoTable(doc, {
      head: [["Title", "Category", "Type", "Amount", "Date"]],
      body: arr,
    });
    const file = doc.output("blob");
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (fileData) {
        const presignedURL = new URL("/api/presigned", window.location.href);
        presignedURL.searchParams.set("fileName", Date.now().toLocaleString());
        presignedURL.searchParams.set("contentType", file.type);
        fetch(presignedURL.toString())
          .then((res) => res.json())
          .then((res) => {
            const body = new Blob([fileData], { type: file.type });
            fetch(res.signedUrl, {
              body,
              method: "PUT",
            }).then(() => {
              console.log("Uploaded");
              console.log(res.signedUrl.split("?")[0]);
              // fetch("/api/user/image", {
              //   method: "POST",
              //   headers: { "Content-Type": "application/json" },
              //   body: JSON.stringify({
              //     objectUrl: res.signedUrl.split("?")[0],
              //   }),
              // });
            });
          });
      }
    };
    reader.readAsArrayBuffer(file);
  }
  return (
    <div>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}
