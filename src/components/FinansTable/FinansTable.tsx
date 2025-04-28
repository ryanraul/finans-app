import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableFooter,
} from "../ui/table";
import { useEffect, useState } from "react";
import { EnumTableHeaderType } from "@/app/platform/incomes/types/EnumTableHeaderType";

interface IFinansTableProps<T> {
  caption: string;
  data: TableType<T>[];
  delete?: (obj: T) => void;
}

export default function FinansTable<T>(finansTableProps: IFinansTableProps<T>) {
  const [clickedRow, setClickedRow] = useState<Number>(-1);
  const [calculableHeaders] = useState<string[]>(
    finansTableProps.data?.[0].getCalculableHeaders()
  );
  const [headers] = useState<TableHeaderProps[]>(
    finansTableProps.data.length > 0
      ? finansTableProps.data?.[0].getHeaders()
      : []
  );

  const [calculableCells, setCalculableCells] = useState<any[]>([]);
  useEffect(() => {
    const calculableCellsAux: any[] = [];
    calculableHeaders.forEach((calcHeader) => {
      const totalColumn = finansTableProps.data.reduce(
        (total, dataRow) =>
          total + dataRow.getValueByHeader(calcHeader as keyof T),
        0
      );

      calculableCellsAux.push(totalColumn.toFixed(2));
    });

    setCalculableCells(calculableCellsAux);
  }, [headers]);

  const getFormattedValue = (row: TableType<T>, cell: TableHeaderProps) => {
    switch (cell.type) {
      case EnumTableHeaderType.CurrencyAmount:
        return `R$ ${row.getValueByHeader(cell.key as keyof T)}`;
    }
    return row.getValueByHeader(cell.key as keyof T);
  };

  return (
    <Table>
      <TableCaption>{finansTableProps.caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, headerIndex) => (
            <TableHead key={headerIndex}>{header.description}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {finansTableProps.data.map((row, rowIndex) => {
          return (
            <TableRow onClick={() => setClickedRow(rowIndex)} key={rowIndex}>
              {headers.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>
                  {getFormattedValue(row, cell)}
                </TableCell>
              ))}
              {finansTableProps.delete && clickedRow == rowIndex && (
                <TableCell key={headers.length}>
                  <Button onClick={() => finansTableProps.delete!(row as T)}>
                    <Trash />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={headers.length - 1}>Total</TableCell>
          <TableCell className="text-right">{calculableCells?.[0]}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
