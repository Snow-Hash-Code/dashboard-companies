import { CardSummary } from "./components/CardSummary/CardSummary";
import { BookOpenCheck, UserRound, Waypoints } from "lucide-react";
import { LastCustomers } from "./components/LastCustomers";

export const dataCardSummary = [
  {
    icon: UserRound,
    total: "12.450",
    average: 5,
    title: "Companies created",
    tooltipText: "See all the companies created.",
  },
  {
    icon: Waypoints,
    total: "86.5%",
    average: 80,
    title: "Total revenue",
    tooltipText: "See all of the revenue.",
  },
  {
    icon: BookOpenCheck,
    total: "363,95€",
    average: 30,
    title: "Bounce Rate",
    tooltipText: "See all of the bounce rate.",
  },
]

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20 mx-auto">
        {dataCardSummary.map((card) => (
          <CardSummary 
            key={card.title}
            icon={card.icon}
            total={card.total}
            average={card.average}
            title={card.title}
            tooltipText={card.tooltipText}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12">
        <LastCustomers />
        <p>Sales Distributors</p>
      </div>
    </div>
  )
}
