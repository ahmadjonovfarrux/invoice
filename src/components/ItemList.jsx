import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

function ItemList({ info }) {
  const { setItems } = useAppStore();
  const [localItems, setLocalItems] = useState(
    info
      ? info
      : [
          {
            id: crypto.randomUUID(),
            name: "",
            quantity: 1,
            price: 0,
            get total() {
              return +this.price * +this.quantity;
            },
          },
        ]
  );
  useEffect(() => {
    setItems(localItems);
  }, [JSON.stringify(localItems)]);

  function handleChange(e, id) {
    const changedItem = localItems.find((el) => {
      return el.id == id;
    });
    changedItem[e.target.name] = e.target.value;
    setLocalItems((prev) => {
      const mapped = prev.map((el) => {
        if (el.id === changedItem.id) {
          return changedItem;
        } else {
          return el;
        }
      });
      return mapped;
    });
  }

  function handleClick(type, id) {
    if (type === "add") {
      if (localItems.at(-1).name.trim() !== "") {
        setLocalItems((prev) => {
          return [
            ...prev,
            {
              id,
              name: "",
              quantity: 1,
              price: 0,
              get total() {
                return this.price * this.quantity;
              },
            },
          ];
        });
      } else {
        toast.info("Enter the last name!");
      }
    } else if (type === "delete") {
      if (localItems.length === 1) {
        toast.info("Eng kamida bitta element bo'lishi kerak!");
      } else {
        const filtered = localItems.filter((el) => el.id !== id);
        setLocalItems(filtered);
      }
    }
  }

  return (
    <div>
      <h1 className="font-bold text-[18px] text-[#777F98]">Item List</h1>
      <div className="flex items-center justify-around">
        <span className="sheet__global__text item__hide">Item Name</span>
        <span className="sheet__global__text item__hide">Qty.</span>
        <span className="sheet__global__text item__hide">Price</span>
        <span className="sheet__global__text item__hide">Total</span>
      </div>
      <ul className="flex flex-col gap-5 mb-5">
        {localItems.map(({ name, quantity, total, price, id }, index) => {
          return (
            <li
              className="flex flex-wrap items-center justify-between gap-3"
              key={index}
            >
              <Input
                onChange={(e) => handleChange(e, id)}
                defaultValue={name}
                className="sm:w-full md:w-[214px]"
                type="text"
                name="name"
                placeholder="Item Name"
              />

              <Input
                onChange={(e) => handleChange(e, id)}
                defaultValue={quantity}
                className="w-[100px]"
                type="number"
                name="quantity"
                placeholder="Quantity"
              />
              <Input
                onChange={(e) => handleChange(e, id)}
                defaultValue={parseFloat(price).toFixed(2)}
                className="w-[100px]"
                type="number"
                name="price"
                placeholder="Price"
              />
              <span>{(price * quantity).toFixed(2)}</span>
              <Button
                type="button"
                onClick={() => handleClick("delete", id)}
                variant={`destructive`}
                size={`icon`}
              >
                <Trash2 />
              </Button>
            </li>
          );
        })}
      </ul>
      <Button
        onClick={() => handleClick("add", crypto.randomUUID())}
        className="w-full"
        variant={"secondary"}
        type="button"
      >
        <PlusCircle /> Add New Item
      </Button>
    </div>
  );
}

export default ItemList;
