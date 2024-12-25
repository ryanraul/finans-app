import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";

interface IFinansTableProps<T> {
  caption: string;
  data: TableType<T>[];
}

export default function FinansTable<T>(finansTableProps: IFinansTableProps<T>) {
  const headers =
    finansTableProps.data.length > 0
      ? finansTableProps.data?.[0].getHeaders()
      : [];

  return (
    <Table>
      <TableCaption>{finansTableProps.caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, headerIndex) => (
            <TableHead key={headerIndex}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {finansTableProps.data.map((row, rowIndex) => {
          return (
            <TableRow key={rowIndex}>
              {headers.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>
                  {row.getValueByHeader(cell as keyof T)}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
