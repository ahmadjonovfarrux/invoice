import { getInvoices } from "../request";
import CardSkeleton from "../components/CardSkeleton";
import { useState, useEffect } from "react";
import MyCard from "../components/MyCard";
import { useAppStore } from "../lib/zustand";
import NotFoundCompo from "./NotFoundCompo";

function InvoiceCards() {
  const { filter, invoices, setInvoices } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInvoices(filter)
      .then((res) => {
        setInvoices(res);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return <CardSkeleton />;
  }

  if (invoices.length === 0) {
    return <NotFoundCompo />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="base__container flex flex-col gap-4">
      {invoices.map((el) => {
        const { createdAt, clientName, total, status, id } = el;
        // console.log(el);
        return (
          <MyCard
            createdAt={createdAt}
            clientName={clientName}
            total={total}
            status={status}
            key={Math.random()}
            id={id}
          />
        );
      })}
    </div>
  );
}

export default InvoiceCards;
