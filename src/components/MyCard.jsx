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
      {/* myCard__card */}
      <div className="myCard__card">
        <Card
          onClick={() => {
            navigate(`/${id}`);
          }}
          className="sm:hidden md:block   border-2 border-transparent hover:border-[#7C5DFA] transition-colors "
        >
          <CardHeader className="flex items-center justify-between">
            <CardTitle>#{id}</CardTitle>
            <CardDescription>{createdAt}</CardDescription>
            <span className="myCard__name">{clientName}</span>
            <span className="myCard__total">£{total}</span>
            <StatusBadge status={status} />
            <ArrowRight className="text-[#7C5DFA]" />
          </CardHeader>
        </Card>
      </div>

      {/* hidden card */}

      <Card
        onClick={() => {
          navigate(`/${id}`);
        }}
        className="sm:block md:hidden lg:hidden border-2 border-transparent hover:border-[#7C5DFA] transition-colors"
      >
        <CardHeader className="flex items-center justify-around">
          <div className="flex flex-col gap-3 items-center">
            <CardTitle>#{id}</CardTitle>
            <CardDescription className="text-[#858bb2]">
              {createdAt}
            </CardDescription>
            <span className="myCard__total">£{total}</span>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <span className="myCard__name">{clientName}</span>
            <StatusBadge status={status} />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default MyCard;
