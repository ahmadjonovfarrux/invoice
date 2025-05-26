import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyCard({
  createdAt = "Due  19 Aug 2021",
  clientName = "Jensen Huang",
  total = "1,800.90",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();
  return (
    <div>
      <Card
        onClick={() => {
          navigate(`/${id}`);
        }}
        className="border-2 border-transparent hover:border-[#7C5DFA] transition-colors "
      >
        <CardHeader className="flex items-center justify-between">
          <CardTitle>#{id}</CardTitle>
          <CardDescription>{createdAt}</CardDescription>
          <span>{clientName}</span>
          <span>£{total}</span>
          <StatusBadge status={status} />
          <ArrowRight className="text-[#7C5DFA]" />
        </CardHeader>
      </Card>
    </div>
  );
}

export default MyCard;
