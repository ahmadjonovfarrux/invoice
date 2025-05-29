"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// dropdownMenu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "./ui/button";
import { Label } from "@/components/ui/label";
import { ArrowBigDown, PlusCircleIcon } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { queryGenerator } from "../lib/utils";

function Header() {
  const { invoices, setSheetOpen } = useAppStore();
  const { setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  function handleChange(e) {
    const value = e.target.value;

    setItems((prev) => {
      return { ...prev, [value]: !prev[value] };
    });
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [JSON.stringify(items)]);
  return (
    <div>
      <div className="base__container flex items-center justify-between py-10">
        <div>
          <h1 className="">Invoices</h1>
          <p>There are {invoices?.length} total invoices</p>
        </div>
        {/* dropdownmenu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={`ml-auto mr-10`} variant="ghost">
              Filter by status
              <ArrowBigDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Statuses</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              {Object.entries(items).map(([key, value]) => {
                return (
                  <Label
                    key={Math.random()}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })}  justify-start capitalize`}
                    htmlFor={key}
                  >
                    <input
                      value={key}
                      type="checkbox"
                      onChange={handleChange}
                      checked={value}
                      id={key}
                    />
                    {key}
                  </Label>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* SheetOpen button */}
        <Button onClick={setSheetOpen}>
          <PlusCircleIcon />
          New Invoice
        </Button>
      </div>
    </div>
  );
}

export default Header;
