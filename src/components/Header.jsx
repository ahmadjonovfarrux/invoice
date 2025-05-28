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
// sheet
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Form from "./Form";

function Header() {
  const [sheetOpen, setSheetOpen] = useState(false);
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
          <p>There are 7 total invoices</p>
        </div>
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

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className={` ${buttonVariants({ variatn: "default" })}`}
          >
            <PlusCircleIcon />
            New Invoice
          </SheetTrigger>
          <SheetContent
            className="md:ml-[72px]  min-w-[calc(80%-72px)] overflow-y-auto max-h-screen"
            side="left"
          >
            <SheetHeader className="top-0 sticky w-full bg-white border-b">
              <SheetTitle>Are you absolutely sure?</SheetTitle>
            </SheetHeader>
            <Form setSheetOpen={setSheetOpen} info={null} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Header;
