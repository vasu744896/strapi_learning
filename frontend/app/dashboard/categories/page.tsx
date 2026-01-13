"use client";

import React, { useEffect, useState } from "react";
import { columns } from "./features/columns";
import { DataTable } from "./features/data-table";

import {
  Card,
  CardHeader,
  CardContent,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import axiosInstance from "@/lib/axios";
import type { AxiosResponse } from "axios";

/* -------------------- Types -------------------- */

interface Category {
  id: number;
  name: string;
  description: string;
  documentId: string;
}

interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface CategoriesResponse {
  data: Category[];
  meta: {
    pagination: PaginationMeta;
  };
}

/* -------------------- Component -------------------- */

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get<CategoriesResponse>(
        `/api/categories?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
      )
      .then((response: AxiosResponse<CategoriesResponse>) => {
        setCategories(response.data.data);
        setMeta(response.data.meta.pagination);
      })
      .catch((error: unknown) => {
        console.error("There was an error fetching the categories!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, pageSize]);

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  return (
    <div className="py-4 md:py-8 px-4 lg:px-6">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>List of categories</CardDescription>

          <CardAction>
            <Button>Add new record</Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <DataTable columns={columns} data={categories} />
          )}

          {/* Footer */}
          {meta && (
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
              <div>
                {categories.length === 0
                  ? "No rows"
                  : `Showing ${(meta.page - 1) * meta.pageSize + 1} to ${
                      (meta.page - 1) * meta.pageSize + categories.length
                    } of ${meta.total} rows`}
              </div>

              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={handlePageSizeChange}
                >
                  <SelectTrigger className="w-[90px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <span className="whitespace-nowrap">
                Page {meta?.page} of {meta?.pageCount}
              </span>


            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
