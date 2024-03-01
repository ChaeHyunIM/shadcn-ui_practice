"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Papa from "papaparse";

import { useState } from "react";

type tableData = {
  Cluster: string;
  제목: string;
}[];

export default function Home() {
  const [tableData, setTableData] = useState<tableData>([]);
  const [resetTableData, setResetTableData] = useState<tableData>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const search = () => {
    const searchTermLower = searchTerm.toLowerCase().replace(/\s/g, "");

    const cluster = tableData.find(
      (movie) =>
        movie.제목.toLowerCase().replace(/\s/g, "") === searchTermLower,
    )?.Cluster;

    if (!cluster) return setIsAlertDialogOpen(true);

    const filteredMovies = tableData.filter(
      (movie) => movie.Cluster === cluster,
    );

    setTableData(filteredMovies);
  };

  // const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     search();
  //   }
  // };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setTableData(result.data.flat() as tableData);
        setResetTableData(result.data.flat() as tableData);
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-10">
      <div className="flex gap-10">
        <Input
          className="w-[500px]"
          placeholder="제목으로 검색하세요"
          onChange={handleInputChange}
          value={searchTerm}
          // onKeyDown={handleEnterPress}
        />
        <div className="flex gap-3">
          <Button onClick={search}>검색</Button>
          <Button
            variant="outline"
            onClick={() => setTableData(resetTableData)}
          >
            초기화
          </Button>
        </div>
      </div>
      <Input type="file" onChange={handleFileUpload} className="w-[800px]" />
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Cluster</TableHead>
            <TableHead className="w-2/3">Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((movie, index) => (
            <TableRow key={`${movie.제목}${index}`}>
              <TableCell>{movie.Cluster}</TableCell>
              <TableCell>{movie.제목}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
