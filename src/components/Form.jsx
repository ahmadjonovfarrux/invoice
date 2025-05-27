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

function Form({ info }) {
  const {
    createdAt,
    description,
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    paymentDue,
    postCode,
    items,
  } = info || {};
  return (
    <form className="p-4 pt-[56px]">
      {/* Bill From */}
      <div className="mb-10">
        <h3 className="text-2xl font-medium">Bill From</h3>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street Address</Label>
            <Input
              type="text"
              defaultValue={info && senderAddress.street}
              id="senderAddress-street"
              placeholder="Street Address"
              name="senderAddress-street"
            />
          </div>

          <div className="flex justify-between items-center gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-city">City</Label>
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
              <Label htmlFor="senderAddress-postCode">Post Code</Label>
              <Input
                type="text"
                defaultValue={info && senderAddress.postCode}
                id="senderAddress-postCode"
                placeholder="Post Code"
                name="senderAddress-postCode"
              />
            </div>
            {/* senderAddress country */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-country">Country</Label>
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
        <h3 className="text-2xl font-medium">Bill To</h3>
        <div className="flex flex-col gap-5 mb-5">
          {/* Client Name input */}
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client's Name</Label>
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
            <Label htmlFor="clientEmail">Client's Email</Label>
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
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
              type="text"
              defaultValue={info && clientAddress.street}
              id="clientAddress-street"
              placeholder="Street Address"
              name="clientAddress-street"
            />
          </div>
          {/* ClientAddres city */}
          <div className="flex justify-between items-center gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-city">City</Label>
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
              <Label htmlFor="clientAddress-postCode">Post Code</Label>
              <Input
                type="text"
                defaultValue={info && clientAddress.postCode}
                id="clientAddress-postCode"
                placeholder="Post Code"
                name="clientAddress-postCode"
              />
            </div>
            {/* ClientAddress country */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-country">Country</Label>
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
        <div className="flex items-end gap-10">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="createdAt">Invoice Date</Label>
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
            defaultValue={info ?? paymentTerms.toString()}
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
          <Label htmlFor="description">Project Description</Label>
          <Input
            type="text"
            defaultValue={info && description}
            id="description"
            placeholder="Project Description"
            name="description"
          />
        </div>
      </div>

      <ItemList info={info && info.items} />

      {info ? (
        <div className="flex items-center justify-end gap-5 mt-10">
          <Button variant={"outline"}>Cancel</Button>
          <Button>Save changes</Button>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-5 mt-10">
          <Button variant={"outline"}>Discard</Button>
          <Button variant={"secondary"}>Save as Draft</Button>
          <Button>Save & Send</Button>
        </div>
      )}
    </form>
  );
}

export default Form;
