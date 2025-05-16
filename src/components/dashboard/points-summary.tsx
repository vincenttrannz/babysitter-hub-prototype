import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, AlertTriangle } from "lucide-react";

interface PointsSummaryProps {
  points: number;
  arrearsLimit?: number; // Example: -20
}

export function PointsSummary({ points, arrearsLimit = -10 }: PointsSummaryProps) {
  const isInArrears = arrearsLimit !== undefined && points < 0;
  const isNearArrearsLimit = arrearsLimit !== undefined && points < 0 && points <= arrearsLimit + 5 && points > arrearsLimit; // Within 5 points of limit
  const hasExceededArrearsLimit = arrearsLimit !== undefined && points <= arrearsLimit;

  let cardClass = "";
  let pointClass = "text-primary";
  let alertMessage = null;

  if (hasExceededArrearsLimit) {
    cardClass = "border-destructive bg-destructive/10";
    pointClass = "text-destructive";
    alertMessage = "You have exceeded the arrears limit. Please earn points to continue requesting care.";
  } else if (isNearArrearsLimit) {
    cardClass = "border-yellow-500 bg-yellow-500/10";
    pointClass = "text-yellow-600";
    alertMessage = "You are close to the arrears limit. Consider earning points soon.";
  } else if (isInArrears) {
    pointClass = "text-amber-600";
  }


  return (
    <Card className={cn("shadow-lg", cardClass)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Your Points Balance</CardTitle>
        <Coins className={cn("h-6 w-6", pointClass)} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-4xl font-bold", pointClass)}>{points}</div>
        <p className="text-xs text-muted-foreground pt-1">
          New members start with 10 points.
        </p>
        {alertMessage && (
          <div className="mt-3 flex items-start text-sm text-destructive">
            <AlertTriangle className="h-5 w-5 mr-2 shrink-0"/>
            <p>{alertMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}
