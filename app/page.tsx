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

  console.log(tableData);

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

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
          placeholder="장한 똥꾸 빵꾸를 입력해주세요."
          onChange={handleInputChange}
          value={searchTerm}
          onKeyDown={handleEnterPress}
        />
        <div className="flex gap-3">
          <Button onClick={search}>Search</Button>
          <Button
            variant="outline"
            onClick={() => setTableData(resetTableData)}
          >
            Reset
          </Button>
        </div>
      </div>
      <Input type="file" onChange={handleFileUpload} />
      <Table>
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
            <DialogTitle>뭐하노</DialogTitle>
            <DialogDescription>장한아 영화 제목 똑바로 써라</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsAlertDialogOpen(false)}>
              닥치고 다시 쓰기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
