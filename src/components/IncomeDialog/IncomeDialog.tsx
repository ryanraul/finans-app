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
import { useState } from "react";
import Income from "@/app/(pages)/platform/incomes/types/Income";
import { saveIncome } from "@/app/(pages)/platform/incomes/api/incomes.api";
import { Checkbox } from "../ui/checkbox";

export function IncomesDialog() {
  const [newIncome, setNewIncome] = useState<Income>(
    new Income({ description: "", amount: 0, fixed: false, date: "" })
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    console.log(`type`, type);
    setNewIncome((prevState) => {
      const updatedIncome = new Income({
        ...prevState,
        [id]: type === "checkbox" ? checked : value,
      });
      return updatedIncome;
    });
  };

  const handleSubmit = () => {
    // Validate inputs (if necessary)
    if (!newIncome.description || !newIncome.amount) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Income saved:", newIncome);
    saveIncome(newIncome, 3).then((response) => {
      if (response.Status == 200) {
        setNewIncome(
          new Income({ description: "", amount: 0, fixed: false, date: "" })
        );
      }
      console.log(`response ==> `, response);
    });
  };

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
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-2"
              value={newIncome.description || ""}
              onChange={handleInputChange}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fixed"
                value={newIncome.fixed ? 1 : 0}
                onCheckedChange={(checkedState) => {
                  newIncome.fixed = checkedState as boolean;
                }}
              />
              <label
                htmlFor="fixed"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Fixed?
              </label>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                value={newIncome.amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newIncome.date || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
