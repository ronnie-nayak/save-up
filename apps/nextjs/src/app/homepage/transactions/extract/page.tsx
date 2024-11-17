"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button, FileUpload, TransactionCard } from "@acme/ui";

import { apiReact } from "~/trpc/react";
import { Transaction } from "../../../../lib/type";

export default function ExtractPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const utils = apiReact.useUtils();
  const addMultiple = apiReact.transactions.addMultiple.useMutation({
    onSuccess: (data, variables) => {
      utils.transactions.invalidate();
    },
    onError: (error) => {
      utils.transactions.sessionExists.invalidate();
    },
  });

  const handleFileSelect = async (file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to analyze image");
      }

      const data = await response.json();
      setTransaction(data.transactions);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto max-w-3xl space-y-8 px-4 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          UPI Payment Analyzer
        </h1>
        <p className="text-muted-foreground">
          Upload your UPI payment screenshot to extract transaction details
        </p>
      </div>

      <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />

      {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {transaction && !isLoading && (
        <>
          {/* @ts-ignore */}
          <Button onClick={() => addMultiple.mutate(transaction)}>
            Upload Transactions
          </Button>
          {
            //@ts-ignore
            transaction.map((t, index) => (
              <TransactionCard key={index} transaction={t} />
            ))
          }
        </>
      )}
    </main>
  );
}
