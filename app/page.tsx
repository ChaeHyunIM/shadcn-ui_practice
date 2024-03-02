"use client";

import { Input } from "@/components/ui/input";
import { csvData, fileAtom } from "@/store/atom";
import { useAtom } from "jotai";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function File() {
  const [csvData, setCsvData] = useAtom(fileAtom);
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return toast.error("파일을 업로드하는데 실패했어요.", {
        duration: 5000,
        position: "top-center",
      });
    }

    if (file.type !== "text/csv") {
      return toast.error("csv 파일만 업로드할 수 있어요.", {
        duration: 5000,
        position: "top-center",
      });
    }

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setCsvData(result.data.flat() as csvData);
        toast.success("파일을 업로드했어요.", {
          duration: 5000,
          position: "top-center",
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Input
        id="file-input"
        type="file"
        onChange={handleFileUpload}
        className={`w-[60vw] cursor-pointer rounded-lg ${
          csvData.length === 0
            ? "border-2 border-dashed border-gray-300"
            : "border-2 border-solid border-black"
        }`}
      />
      <Button
        className="mt-8"
        onClick={() => {
          if (csvData.length === 0) {
            toast.error("CSV 파일을 업로드해주세요.", {
              duration: 5000,
              position: "top-center",
            });
          } else {
            router.push("/search");
          }
        }}
      >
        검색하러 가기
      </Button>
    </div>
  );
}
