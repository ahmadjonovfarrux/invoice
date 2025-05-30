import Form from "./Form";
import { useAppStore } from "../lib/zustand";
import ThemesToggle from "./ThemesToggle";
// Sheet
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function SideBar() {
  const { sheetOpen, setSheetOpen, editedData } = useAppStore();
  return (
    <>
      <div className="bg-[#373B53] flex items-center justify-between md:flex-col md:h-full md:fixed mf:left-0 md:top-0 md:bottom-0  md:z-999 rounded-tr-2xl">
        <img src="../images/sidebar_logo.svg" alt="images of person logo" />
        <div className="mr-5 md:mr-0 md:mb-5 ">
          <ThemesToggle />
        </div>
      </div>

      {/* Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          className="sideBar__sheetContent"
          side="left"
        >
          <SheetHeader className="top-0 sticky w-full  border-b">
            <SheetTitle className="sideBar__sheet__title">
              New Invoice
            </SheetTitle>
          </SheetHeader>
          <Form setSheetOpen={setSheetOpen} info={editedData} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default SideBar;
