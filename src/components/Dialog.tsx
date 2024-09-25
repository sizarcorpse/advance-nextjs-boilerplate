"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const Dialog = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleModalDismiss = () => {
    router.back();
  };

  return (
    <AlertDialog defaultOpen onOpenChange={handleModalDismiss}>
      <AlertDialogContent className="max-w-screen-lg h-screen p-0 border-none overflow-y-scroll">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog;
