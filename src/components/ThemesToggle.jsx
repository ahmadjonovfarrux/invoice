import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAppStore } from "../lib/zustand";
import { ArrowBigDown, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function ThemesToggle() {
  const [dark, setDark] = useState(
    document.documentElement.dataset.theme.startsWith("dark-")
  );
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );
  const { themes } = useAppStore();

  function handleTheme(type, mode) {
    const html = document.documentElement;
    let isDark;
    if (html.dataset.theme.startsWith("dark-")) {
      isDark = true;
    } else {
      isDark = false;
    }

    if (mode === "theme") {
      if (isDark) {
        html.dataset.theme = `dark-${type}`;
        setTheme(`dark-${type}`);
      } else {
        html.dataset.theme = type;
        setTheme(type);
      }
    } else if (mode === "dark") {
      if (type.startsWith("dark-")) {
        html.dataset.theme = type.replace("dark-", "");
        setTheme(type.replace("dark-", ""));
      } else {
        html.dataset.theme = `dark-${type}`;
        setTheme(`dark-${type}`);
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <div className="flex gap-5 md:flex-col md:items-start">
      <div className="sidebar__toggle">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="secondary">
              <span className="block md:hidden">Change Theme</span>
              <ArrowBigDown className="" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ">
            <DropdownMenuLabel>Themes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              {themes.map((el, index) => {
                return (
                  <Button
                    onClick={() => {
                      handleTheme(el, "theme");
                    }}
                    key={index}
                    className={`justify-start`}
                    variant="ghost"
                  >
                    {el}
                  </Button>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button
        size={"icon"}
        onClick={() => {
          handleTheme(theme, "dark");
        }}
        variant="ghost"
      >
        {theme.startsWith("dark-") ? <Sun /> : <Moon />}
      </Button>

      <div>
        <img
          className="rounded-2xl my-2"
          src="../images/personOval.svg"
          alt="image"
        />
      </div>
    </div>
  );
}

export default ThemesToggle;
