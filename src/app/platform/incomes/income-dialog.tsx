import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  CreateIncomeRequest,
  UpdateIncomeRequest,
} from "@/__generated__/types";
import { postIncomes, putIncomes } from "@/__generated__/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Income from "./types/Income";
import { useEffect, useState } from "react";

const incomeSchema = z.object({
  description: z.string().min(2, "Income description is mandatory."),
  amount: z.number().positive("Amount should be a positive value."),
  fixed: z.boolean().default(false).optional(),
  date: z.date(),
});

type IncomeSchema = z.infer<typeof incomeSchema>;

interface IIncomeDialogProps {
  accountId: number;
  onCloseDialog: () => void;
  updateIncome?: Income;
}

export function IncomesDialog({
  onCloseDialog,
  accountId,
  updateIncome,
}: IIncomeDialogProps) {
  const [openDialog, setOpenDialog] = useState(
    updateIncome != undefined ? true : false
  );

  useEffect(() => {
    if (!updateIncome) return;
    setOpenDialog(true);
  }, [updateIncome]);

  const form = useForm<IncomeSchema>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      description: "",
      amount: 0,
      fixed: false,
      date: new Date(),
    },
  });

  useEffect(() => {
    if (updateIncome) {
      form.reset({
        description: updateIncome.description ?? "",
        amount: updateIncome.amount ?? 0,
        fixed: updateIncome.fixed ?? false,
        date: updateIncome.date ? new Date(updateIncome.date) : new Date(),
      });
    } else {
      form.reset({
        description: "",
        amount: 0,
        fixed: false,
        date: new Date(),
      });
    }
  }, [updateIncome, form]);

  async function createIncome({
    description,
    amount,
    fixed,
    date,
  }: IncomeSchema) {
    const request: CreateIncomeRequest = {
      description: description,
      amount: amount,
      fixed: fixed ?? false,
      date: date,
      accountId: accountId,
    };

    await postIncomes(request);

    form.reset();
    onCloseDialog();
  }

  async function editIncome({
    description,
    amount,
    fixed,
    date,
  }: IncomeSchema) {
    if (!updateIncome?.id) return;

    const request: UpdateIncomeRequest = {
      id: updateIncome.id,
      description: description,
      amount: amount,
      date: date,
      fixed: fixed ?? false,
    };

    await putIncomes(request);
    setOpenDialog(false);
    onCloseDialog();
  }

  const handleSubmit = updateIncome ? editIncome : createIncome;

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
          <Plus /> Add Income
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[495px]">
        <DialogHeader>
          <DialogTitle>
            {updateIncome ? "Edit Income" : "Add Income"}
          </DialogTitle>
          <DialogDescription>
            {updateIncome ? "Edit your income." : "Add here your income."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-row items-center gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fixed"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row gap-2">
                      <FormControl className="flex space-x-2">
                        <Checkbox
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

            <div className="flex gap-4">
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
            </div>

            <DialogFooter>
              <div className="flex justify-end">
                <Button type="submit">
                  {updateIncome ? "Update" : "Save"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
