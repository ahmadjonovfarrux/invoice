import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

function ItemList() {
  const [items, setItems] = useState([
    {
      id: crypto.randomUUID(),
      name: "Banner Design",
      quantity: 1,
      price: 156,
      get total() {
        return this.price * this.quantity;
      },
    },
  ]);

  function handleChange(e, id) {
    const changedItem = items.find((el) => {
      return el.id == id;
    });
    changedItem[e.target.name] = e.target.value;
    setItems((prev) => {
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
      if (items.at(-1).name.trim() !== "") {
        setItems((prev) => {
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
      if (items.length === 1) {
        toast.info("Eng kamida bitta element bo'lishi kerak!");
      } else {
        const filtered = items.filter((el) => el.id !== id);
        setItems(filtered);
      }
    }
  }

  return (
    <div>
      <h1>Item List</h1>
      <div className="flex items-center justify-between">
        <span>Item Name</span>
        <span>Qty.</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <ul className="flex flex-col gap-5 mb-5">
        {items.map(({ name, quantity, total, price, id }, index) => {
          return (
            <li className="flex items-center justify-between" key={index}>
              <Input
                onChange={(e) => handleChange(e, id)}
                defaultValue={name}
                className="w-[214px]"
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
              <span>{total.toFixed(2)}</span>
              <Button
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
