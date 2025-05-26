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

function Form() {
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
                id="senderAddress-city"
                name="senderAddress-city"
                placeholder="City"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-postcode">Post Code</Label>
              <Input
                type="text"
                id="senderAddress-postcode"
                placeholder="Post Code"
                name="senderAddress-postcode"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-country">Country</Label>
              <Input
                type="text"
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
              id="clientEmail"
              placeholder="Clients Email"
              name="clientEmail"
            />
          </div>
        </div>
        {/* Street Address */}
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
              type="text"
              id="clientAddress-street"
              placeholder="Street Address"
              name="clientAddress-street"
            />
          </div>

          <div className="flex justify-between items-center gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-city">City</Label>
              <Input
                type="text"
                id="clientAddress-city"
                name="clientAddress-city"
                placeholder="City"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-postcode">Post Code</Label>
              <Input
                type="text"
                id="clientAddress-postcode"
                placeholder="Post Code"
                name="clientAddress-postcode"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-country">Country</Label>
              <Input
                type="text"
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
              type="date"
              id="createdAt"
              placeholder="Invoice Date"
              name="createdAt"
            />
          </div>
          {/* Select */}
          <Select name="paymentTerms">
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
            id="description"
            placeholder="Project Description"
            name="description"
          />
        </div>
      </div>
      <ItemList />
      <div className="flex items-center justify-end gap-5 mt-10">
        <Button variant={"outline"}>Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </form>
  );
}

export default Form;
