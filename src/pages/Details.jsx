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
    updateById(id, data)
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

  return (
    <div className="py-5">
      <div className="base__container">
        <Card>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Status: </span>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
}

export default Details;
