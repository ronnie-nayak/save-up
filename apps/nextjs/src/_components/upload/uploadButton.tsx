import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { insertTransactionType } from "@acme/db";
import { Button } from "@acme/ui";

import { apiReact } from "~/trpc/react";

export function UploadButton({ data }: { data: insertTransactionType[] }) {
  const utils = apiReact.useUtils();
  const addNewRecords = apiReact.transactions.addNewRecords.useMutation({
    onSuccess: (data, variables) => {
      utils.transactions.invalidate();
    },
    onError: (error) => {
      utils.transactions.sessionExists.invalidate();
    },
  });
  function handleUpload() {
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
              addNewRecords.mutate({ link: res.signedUrl.split("?")[0] });
            });
          });
      }
    };
    reader.readAsArrayBuffer(file);
  }
  return (
    <Button className="p-2 px-4 text-lg font-bold" onClick={handleUpload}>
      Upload
    </Button>
  );
}
