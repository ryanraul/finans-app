import {
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Table,
  TableFooter,
} from "../ui/table";
import { Landmark, MoveDownRight, ReceiptText, TrendingUp } from "lucide-react";

interface BalanceTableProps {
  balance: any;
}

export default function BalanceTable(balanceTableProps: BalanceTableProps) {
  const monthBalance = balanceTableProps.balance;

  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          {/* <TableHead key={headerIndex}>{header.description}</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody style={{ fontWeight: "bold" }}>
        <TableRow>
          <TableCell>
            <Landmark className="inline mr-1 " />
            Account Balance
          </TableCell>
          <TableCell> {monthBalance?.accountBalance.toFixed(2)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <TrendingUp className="inline mr-1 " />
            Incomes
          </TableCell>
          <TableCell> {monthBalance?.totalIncomes.toFixed(2)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <MoveDownRight className="inline mr-1 " />
            Expenses
          </TableCell>
          <TableCell> {monthBalance?.totalExpenses.toFixed(2)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <ReceiptText className="inline mr-1 " />
            Month Balance
          </TableCell>
          <TableCell> {monthBalance?.monthBalance.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={headers.length - 1}>Total</TableCell>
          <TableCell className="text-right">{calculableCells?.[0]}</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
