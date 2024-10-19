import { InfoIcon } from "lucide-react";
import { CustomTooltipProps } from "./CustomTooltip.types";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function CustomTooltip(props: CustomTooltipProps) {
  const { content } = props
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon className="w-5 h-5" />
          </TooltipTrigger>
          <TooltipContent>
           {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}