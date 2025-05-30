import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice, updateById } from "../request";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "../components/StatusBadge";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

function Details() {
  const { setSheetOpen, setEditedData, updateInvoices } = useAppStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInvoice(id)
      .then((res) => {
        setInvoice(res);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // handleDelete function
  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById(id)
      .then((res) => {
        navigate("/");
      })
      .catch(({ message }) => {
        toast.error(message);
        console.log(message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  // handleUpdate function
  function handleUpdate(id, data) {
    setUpdateLoading(true);
    updateById({ id, newData: data })
      .then((res) => {
        updateInvoices(res);
        navigate(-1);
      })
      .catch(({ message }) => {
        toast.error(message);
        console.log(message);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  }

  // handleEdit function
  function handleEdit(data) {
    setSheetOpen();
    setEditedData(data);
  }

  // Loading
  if (loading) {
    return (
      <div className="base__container">
        <p>Loading</p>
      </div>
    );
  }
  // error
  if (error) {
    return <p>{error}</p>;
  }
  console.log(invoice);

  return (
    <div className="pt-5">
      <div className="base__container">
        <Card>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Status: </span>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="card__buttons">
              <Button
                onClick={() => {
                  handleEdit(invoice);
                }}
                variant={`secondary`}
              >
                Edit
              </Button>

              <Dialog>
                <DialogTrigger
                  className={buttonVariants({ variant: `destructive` })}
                >
                  Delete
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete invoice #
                      {invoice.invoiceId}? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="ml-auto flex gap-3">
                    <DialogClose
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Cancel
                    </DialogClose>
                    <Button
                      onClick={() => handleDelete(invoice.id)}
                      variant={"destructive"}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? "Loading..." : "Delete"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {invoice.status === "pending" && (
                <>
                  <Button
                    onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                    variant={`default`}
                  >
                    {updateLoading ? "Loading..." : "Mark As Paid"}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        {/* Details */}
        <div className="details mt-6 p-[32px] ">
          {/* sending id */}
          <div className="details__sending__id flex items-start justify-between">
            {/* id */}
            <div className="flex flex-col gap-1">
              <h3 className="details__title">#{invoice.id}</h3>
              <p className="details__paragrph">{invoice.description}</p>
            </div>
            {/* senderAddress */}
            <div className="details__senderAddress flex flex-col sm:items-end gap-[2px] ">
              <p className="details__paragrph">
                {invoice?.senderAddress?.street}
              </p>
              <p className="details__paragrph">
                {invoice?.senderAddress?.city}
              </p>
              <p className="details__paragrph">
                {invoice?.senderAddress?.postCode}
              </p>
              <p className="details__paragrph">
                {invoice?.senderAddress?.country}
              </p>
            </div>
          </div>
          {/* sending info */}
          <div className="details__sending__info flex-wrap gap-3 flex items-start justify-between mt-[21px]">
            <div>
              <span className="details__paragrph ">Invoice Date</span>
              <h3 className="details__title mt-3">{invoice.createdAt}</h3>
              <span className="details__paragrph">Payment Due</span>
              <h3 className="details__title mt-1">
                {invoice.paymentTerms} Day
              </h3>
            </div>
            <div className="flex flex-col">
              <span className="details__paragrph">Bill To</span>
              <h3 className="details__title my-3">{invoice.clientName}</h3>
              <span className="details__paragrph">
                {invoice?.clientAddress?.street}
              </span>
              <span className="details__paragrph">
                {invoice?.clientAddress?.city}
              </span>
              <span className="details__paragrph">
                {invoice?.clientAddress?.postCode}
              </span>
              <span className="details__paragrph">
                {invoice?.clientAddress?.country}
              </span>
            </div>
            <div>
              <span className="details__paragrph">Sent To</span>
              <h3 className="details__title">{invoice.clientEmail}</h3>
            </div>
          </div>
        </div>

        <div className=" p-8">
          {/* Items */}
          <div className="details__itemNames">
            <span className="details__paragrph">Item Name</span>
            <span className="details__paragrph">QTY.</span>
            <span className="details__paragrph">Price</span>
            <span className="details__paragrph">Total</span>
          </div>

          {invoice?.items?.map((item) => {
            console.log(item);
            return (
              <div className="flex items-center justify-between" key={item.id}>
                <div className="flex flex-col">
                  <h3 className="details__item__name">{item.name}</h3>
                  <span className="details__hide__item">
                    {item.quantity} x {item.price}
                  </span>
                </div>
                <span className="details__hidden__item details__paragrph">
                  {item.quantity}
                </span>
                <span className="details__hidden__item details__item__name text-[#7e88c3]">
                  £{item.price.toFixed(2)}
                </span>
                <span className="details__item__name">
                  £{item.total.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
        {/* Total footer */}
        <div className="details__footer__total">
          <p className="details__paragrph text-white">Amount Due</p>
          <h2 className="details__total">£{invoice.total}</h2>
        </div>
        {/* hidden buttons */}
        <div className="card__hidden__buttons">
          <Button
            onClick={() => {
              handleEdit(invoice);
            }}
            variant={`secondary`}
          >
            Edit
          </Button>

          <Dialog>
            <DialogTrigger
              className={buttonVariants({ variant: `destructive` })}
            >
              Delete
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete invoice #{invoice.invoiceId}?
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="ml-auto flex gap-3">
                <DialogClose
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Cancel
                </DialogClose>
                <Button
                  onClick={() => handleDelete(invoice.id)}
                  variant={"destructive"}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Loading..." : "Delete"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {invoice.status === "pending" && (
            <>
              <Button
                onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                variant={`default`}
              >
                {updateLoading ? "Loading..." : "Mark As Paid"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
