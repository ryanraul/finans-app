"use client";

import { ColumnDef } from "@tanstack/react-table";
import Expense from "./Expense";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Expense = {
//   id?: number;
//   description?: string;
//   amount?: number;
//   fixed?: boolean;
//   date?: Date;
//   plots?: number;
// };

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "plots",
    header: "Plots",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
