import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  CreateExpenseRequest,
  UpdateExpenseRequest,
} from "@/__generated__/types";
import { postExpenses, putExpenses } from "@/__generated__/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputCurrency from "@/components/InputCurrency/input-currency";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Expense from "./types/Expense";
import { useEffect, useState } from "react";

const expenseSchema = z.object({
  description: z.string().min(2, "Expense description is mandatory."),
  amount: z.number().positive("Amount should be a positive value."),
  fixed: z.boolean().default(false).optional(),
  date: z.date(),
  plots: z.number(),
});

type ExpenseSchema = z.infer<typeof expenseSchema>;

interface IExpenseDialogProps {
  accountId: number;
  onCloseDialog: () => void;
  updateExpense?: Expense;
}

export function ExpensesDialog({
  onCloseDialog,
  accountId,
  updateExpense,
}: IExpenseDialogProps) {
  const [openDialog, setOpenDialog] = useState(
    updateExpense != undefined ? true : false
  );

  useEffect(() => {
    if (!updateExpense) return;
    setOpenDialog(true);
  }, [updateExpense]);

  const form = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      fixed: false,
      date: new Date(),
      plots: 0,
    },
  });

  useEffect(() => {
    if (updateExpense) {
      form.reset({
        description: updateExpense.description ?? "",
        amount: updateExpense.amount ?? 0,
        plots: updateExpense.totalPlots ?? 0,
        fixed: updateExpense.fixed ?? false,
        date: updateExpense.date ? new Date(updateExpense.date) : new Date(),
      });
    } else {
      form.reset({
        description: "",
        plots: 0,
        amount: 0,
        fixed: false,
        date: new Date(),
      });
    }
  }, [updateExpense, form]);

  async function createExpense({
    description,
    amount,
    fixed,
    date,
    plots,
  }: ExpenseSchema) {
    const request: CreateExpenseRequest = {
      description: description,
      amount: amount,
      fixed: fixed ?? false,
      date: date,
      accountId: accountId,
      plots: plots,
    };

    await postExpenses(request);

    form.reset();
    onCloseDialog(); // Close dialog after successful submission
  }

  async function editExpense({
    description,
    amount,
    plots,
    fixed,
    date,
  }: ExpenseSchema) {
    if (!updateExpense?.id) return;

    const request: UpdateExpenseRequest = {
      id: updateExpense.id,
      description: description,
      amount: amount,
      plots: plots,
      date: date,
      fixed: fixed ?? false,
    };

    console.log("request => ", request);

    await putExpenses(request);
    setOpenDialog(false);
    onCloseDialog();
  }

  const handleSubmit = updateExpense ? editExpense : createExpense;

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);
        if (open) return;
        onCloseDialog();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[595px]">
        <DialogHeader>
          <DialogTitle>
            {updateExpense ? "Edit Expense" : "Add Expense"}
          </DialogTitle>
          <DialogDescription>
            {updateExpense ? "Edit your expense." : "Add here your expense."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row  gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <InputCurrency {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!updateExpense?.fixed && (
                <FormField
                  control={form.control}
                  name="plots"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Plots</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={updateExpense?.fixed}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="flex flex-row items-center gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fixed"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row  gap-2">
                      <FormControl className="flex space-x-2">
                        <Checkbox
                          disabled={updateExpense ? true : false}
                          id="fixed"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Fixed?
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">{updateExpense ? "Update" : "Save"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
