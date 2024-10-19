import { CardSummary } from "./components/CardSummary/CardSummary";
import { BookOpenCheck, UserRound, Waypoints } from "lucide-react";
import { LastCustomers } from "./components/LastCustomers";
import { SalesDistributor } from "./components/SalesDistributors";
import { TotalSubscribers } from "./components/TotalSubscribers";
import { ListIntegrations } from "./components/ListIntegrations";

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

      <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12 gap-y-4 md:gap-y-0">
        <LastCustomers />
        <SalesDistributor />
      </div>

      <div className="flex-col xl:flex xl:flex-row gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center md:gap-x-10">
        <TotalSubscribers />
        <ListIntegrations />
      </div>
    </div>
  )
}
