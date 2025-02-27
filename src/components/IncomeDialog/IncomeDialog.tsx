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
import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";
import { CreateIncomeRequest } from "@/__generated__/types";
import { postIncomes } from "@/__generated__/api";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const incomeSchema = z.object({
  description: z.string().min(2, "Income description is mandatory."),
  amount: z.number().positive("Amount should be a positive value."),
  fixed: z.boolean().default(false).optional(),
  date: z.date(),
});

type IncomeSchema = z.infer<typeof incomeSchema>;

export function IncomesDialog() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IncomeSchema>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      description: "",
      amount: 0,
      fixed: false,
      date: new Date(),
    },
  });

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
      accountId: 3,
    };

    await postIncomes(request);

    reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <i className="fa-solid fa-plus "></i> Add Income
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[495px]">
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
          <DialogDescription>Add here your income.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(createIncome)}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                type="text"
                className="col-span-2"
                {...register("description")}
              />

              <Controller
                name="fixed"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fixed"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="fixed"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Fixed?
                    </label>
                  </div>
                )}
              />
            </div>

            {errors?.description && (
              <p className="text-danger text-xs font-semibold">
                {errors.description.message}
              </p>
            )}
            {errors?.fixed && (
              <p className="text-danger text-xs font-semibold">
                {errors.fixed.message}
              </p>
            )}

            <div className="flex gap-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input {...register("amount", { valueAsNumber: true })} />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  type="date"
                  {...register("date", { valueAsDate: true })}
                />
              </div>
            </div>

            {errors?.amount && (
              <p className="text-danger text-xs font-semibold">
                {errors.amount.message}
              </p>
            )}
            {errors?.date && (
              <p className="text-danger text-xs font-semibold">
                {errors.date.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
