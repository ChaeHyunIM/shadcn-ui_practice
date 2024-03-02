"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fileAtom } from "@/store/atom";
import { useAtomValue } from "jotai";

import { useState } from "react";

export default function Home() {
  const csvData = useAtomValue(fileAtom);
  const [searchData, setSearchData] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const search = () => {
    const searchTermLower = searchTerm.toLowerCase().replace(/\s/g, "");

    const cluster = csvData.find(
      (movie) =>
        movie.제목.toLowerCase().replace(/\s/g, "") === searchTermLower,
    )?.Cluster;

    if (!cluster) return setIsAlertDialogOpen(true);

    const filteredMovies = csvData
      .filter((movie) => movie.Cluster === cluster)
      .map((movie) => movie.제목)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    setSearchData(filteredMovies);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-10">
      <div className="flex gap-10">
        <Input
          className="w-[500px]"
          placeholder="제목으로 검색하세요"
          onChange={handleInputChange}
          value={searchTerm}
        />
        <div className="flex gap-3">
          <Button onClick={search}>검색</Button>
          <Button variant="outline" onClick={() => setSearchData([])}>
            초기화
          </Button>
        </div>
      </div>
      {searchData.length > 0 && (
        <div>
          <h2 className="mb-3 text-2xl font-bold">추천 영화 🎬</h2>
          <ul>
            {searchData.map((movie, index) => (
              <li key={`${movie}${index}`}>{movie}</li>
            ))}
          </ul>
        </div>
      )}
      <Dialog
        open={isAlertDialogOpen}
        onOpenChange={() => {
          setIsAlertDialogOpen((prev) => !prev);
        }}
      >
        <DialogContent className="w-[30vw]">
          <DialogHeader>
            <DialogTitle>검색을 하지 못했어요 😿</DialogTitle>
            <DialogDescription>
              정확한 제목으로 검색해주세요 🙏
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsAlertDialogOpen(false)}>
              제목 다시 쓰기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
