import ItemList from "./ItemList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { prepareData } from "../lib/utils";
import { useAppStore } from "../lib/zustand";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addInvoice, updateById } from "../request";
import { useNavigate } from "react-router-dom";

function Form({ info, setSheetOpen }) {
  const { items: zustandItems } = useAppStore();
  const {
    createdAt,
    description,
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    items,
  } = info || {};
  const navigate = useNavigate();
  const { updateInvoices } = useAppStore();
  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = {};
    if (!info) {
      result.status = e.nativeEvent.submitter.id;
    }

    formData.forEach((value, key) => {
      if (key === "quantity" || key === "price" || key === "paymentTerms") {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });

    result.items = zustandItems;
    const readyData = prepareData(result);
    setSending({
      mode: e.nativeEvent.submitter.id === "edit" ? "edit" : "add",
      data: readyData,
    });
  }

  useEffect(() => {
    if (sending) {
      setLoading(true);
      if (sending.mode === "add") {
        addInvoice(sending.data)
          .then((res) => {
            updateInvoices(res);
            toast.success("Successfully added");
            setSheetOpen(false);
          })
          .catch(({ message }) => {
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      } else if (sending.mode === "edit") {
        updateById({ id: info.id, newData: sending.data })
          .then((res) => {
            updateInvoices(res);
            toast.success("Successfully edited");
            navigate(-1);
            setSheetOpen(false);
          })
          .catch(({ message }) => {
            toast.error(message);
            console.log(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      }
    }
  }, [sending ? JSON.stringify(sending) : sending]);

  return (
    <form onSubmit={handleSubmit} className="p-4 pt-[20px]">
      {/* Bill From */}
      <div className="mb-10">
        <h3 className="sheet__title">Bill From</h3>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label
              className="sheet__global__text mb-[10px]"
              htmlFor="senderAddress-street "
            >
              Street Address
            </Label>
            <Input
              type="text"
              defaultValue={info && senderAddress.street}
              id="senderAddress-street"
              placeholder="Street Address"
              name="senderAddress-street"
            />
          </div>
          {/* senderAddress */}
          <div className="flex justify-between flex-wrap md:flex-nowrap lg:flex-nowrap items-center gap-5">
            <div className="flex items-center gap-5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                  className="sheet__global__text mb-[10px]"
                  htmlFor="senderAddress-city"
                >
                  City
                </Label>
                <Input
                  type="text"
                  defaultValue={info && senderAddress.city}
                  id="senderAddress-city"
                  name="senderAddress-city"
                  placeholder="City"
                />
              </div>
              {/* Sender Address postCode */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                  className="sheet__global__text mb-[10px]"
                  htmlFor="senderAddress-postCode"
                >
                  Post Code
                </Label>
                <Input
                  type="text"
                  defaultValue={info && senderAddress.postCode}
                  id="senderAddress-postCode"
                  placeholder="Post Code"
                  name="senderAddress-postCode"
                />
              </div>
            </div>
            {/* senderAddress country */}
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label
                className="sheet__global__text mb-[10px]"
                htmlFor="senderAddress-country"
              >
                Country
              </Label>
              <Input
                type="text"
                defaultValue={info && senderAddress.country}
                id="senderAddress-country"
                placeholder="Country"
                name="senderAddress-country"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bill To */}
      <div className="mb-10">
        <h3 className="sheet__title">Bill To</h3>
        <div className="flex flex-col gap-5 mb-5">
          {/* Client Name input */}
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label className="sheet__global__text" htmlFor="clientName">
              Client's Name
            </Label>
            <Input
              defaultValue={info && clientName}
              type="text"
              id="clientName"
              placeholder="Clients Name"
              name="clientName"
            />
          </div>
          {/* Client Email input */}
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label className="sheet__global__text" htmlFor="clientEmail">
              Client's Email
            </Label>
            <Input
              type="text"
              defaultValue={info && clientEmail}
              id="clientEmail"
              placeholder="Clients Email"
              name="clientEmail"
            />
          </div>
        </div>
        {/* Client Street Address */}
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label
              className="sheet__global__text"
              htmlFor="clientAddress-street"
            >
              Street Address
            </Label>
            <Input
              type="text"
              defaultValue={info && clientAddress.street}
              id="clientAddress-street"
              placeholder="Street Address"
              name="clientAddress-street"
            />
          </div>
          {/* ClientAddres city */}
          <div className="flex justify-between flex-wrap md:flex-nowrap lg:flex-nowrap items-center gap-5">
            <div className="flex items-center gap-5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                  className="sheet__global__text"
                  htmlFor="clientAddress-city"
                >
                  City
                </Label>
                <Input
                  type="text"
                  defaultValue={info && clientAddress.city}
                  id="clientAddress-city"
                  name="clientAddress-city"
                  placeholder="City"
                />
              </div>
              {/* ClientAddres Postcode */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                  className="sheet__global__text"
                  htmlFor="clientAddress-postCode"
                >
                  Post Code
                </Label>
                <Input
                  type="text"
                  defaultValue={info && clientAddress.postCode}
                  id="clientAddress-postCode"
                  placeholder="Post Code"
                  name="clientAddress-postCode"
                />
              </div>
            </div>
            {/* ClientAddress country */}
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label
                className="sheet__global__text"
                htmlFor="clientAddress-country"
              >
                Country
              </Label>
              <Input
                type="text"
                defaultValue={info && clientAddress.country}
                id="clientAddress-country"
                placeholder="Country"
                name="clientAddress-country"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Invoice Date */}
      <div className="flex flex-col gap-5 mb-10">
        {/* InVoice Date and select terms*/}
        <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap items-end gap-10">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label className="sheet__global__text" htmlFor="createdAt">
              Invoice Date
            </Label>
            <Input
              defaultValue={info && createdAt}
              type="date"
              id="createdAt"
              placeholder="Invoice Date"
              name="createdAt"
            />
          </div>
          {/* Select */}
          <Select
            name="paymentTerms"
            defaultValue={info ? paymentTerms.toString() : "1"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Terms</SelectLabel>
                <SelectItem value="1">Net 1 Day</SelectItem>
                <SelectItem value="7">Net 7 Day</SelectItem>
                <SelectItem value="14">Net 14 Day</SelectItem>
                <SelectItem value="30">Net 30 Day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Project Description */}
        <div className="grid w-full max-w-full items-center gap-1.5">
          <Label className="sheet__global__text" htmlFor="description">
            Project Description
          </Label>
          <Input
            type="text"
            defaultValue={info && description}
            id="description"
            placeholder="Project Description"
            name="description"
          />
        </div>
      </div>

      <ItemList info={items} />

      {info ? (
        <div className="flex  items-center justify-end gap-5 mt-10">
          {/* Cancel */}
          <Button variant={"outline"} onClick={() => setSheetOpen(false)}>
            Cancel
          </Button>
          {/* Save changes */}
          <Button id="edit" disabled={loading}>
            {loading ? "Loading..." : "Save changes"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-end gap-5 mt-10">
          {/* Discard */}
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setSheetOpen(false)}
          >
            Discard
          </Button>
          {/* Save as Draft */}
          <Button disabled={loading} id="draft" variant={"secondary"}>
            {loading ? "Loading..." : "Save as Draft"}
          </Button>
          <Button disabled={loading} id="pending">
            {loading ? "Loading..." : "Save & Send"}
          </Button>
        </div>
      )}
    </form>
  );
}

export default Form;
