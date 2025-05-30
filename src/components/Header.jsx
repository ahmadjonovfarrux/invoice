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
          <h1 className="header__title ">Invoices</h1>
          <p className="header__hidden">{invoices?.length} invoices</p>
          <p className="header__subtitle">
            There are {invoices?.length} total invoices
          </p>
        </div>

        {/* HIdden dropdown */}
        <div className="header__hidden__dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={`ml-auto mr-10 header__btn`} variant="ghost">
                Filter
                <ArrowBigDown className="text-[#7C5DFA]" />
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
          <Button onClick={setSheetOpen}>
            <PlusCircleIcon className="header__plusIcon" />
            New
          </Button>
        </div>

        <div className="header__hidden__box">
          {/* dropdownmenu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={`ml-auto mr-10 header__btn`} variant="ghost">
                Filter by status
                <ArrowBigDown className="text-[#7C5DFA]" />
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
            <PlusCircleIcon className="header__plusIcon" />
            New Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
