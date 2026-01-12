import React from "react"
import { columns } from "./features/columns"
import { DataTable } from "./features/data-table"

import {
  Card,
  CardHeader,
  CardContent,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

const Page = () => {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ]

  return (
    <div className="py-4 md:py-8 px-4 lg:px-6">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            <span>List of categories</span>
          </CardDescription>
        </CardHeader>

        <CardAction>
          <Button>Add new record</Button>
        </CardAction>

        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
