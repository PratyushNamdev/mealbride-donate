"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/constants/react_query";
import { useMemo } from "react";

interface Props {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: Props) => {
  const queryClient = useMemo(getQueryClient, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
