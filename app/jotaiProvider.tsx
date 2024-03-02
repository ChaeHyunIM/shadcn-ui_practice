"use client";

import { Provider } from "jotai";

export default function JotaiProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}