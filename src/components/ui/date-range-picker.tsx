"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

interface DatePickeWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  onChangeDates: (dateRange?: DateRange) => void;
  keyForLocalStorage?: string;
}

export function DatePickerWithRange({
  className,
  onChangeDates,
  keyForLocalStorage,
}: DatePickeWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  useEffect(() => {
    if (!keyForLocalStorage) return;

    const dateRangeLocalStorage = localStorage.getItem(keyForLocalStorage);

    if (!dateRangeLocalStorage) return;

    const dateObject = JSON.parse(dateRangeLocalStorage);
    const dateRangeConverted = {
      from: new Date(dateObject.from),
      to: new Date(dateObject.to),
    };

    setDate(dateRangeConverted);
    onChangeDates(dateRangeConverted);
  }, []);

  function saveDateRange(dateRange?: DateRange) {
    setDate(dateRange);

    if (keyForLocalStorage && dateRange)
      localStorage.setItem(keyForLocalStorage, JSON.stringify(dateRange));

    onChangeDates(dateRange);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline-solid"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={saveDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
