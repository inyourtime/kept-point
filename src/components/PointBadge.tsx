import { Badge } from "@/components/ui/badge";

interface PointBadgeProps extends React.ComponentPropsWithoutRef<typeof Badge> {
  point: number;
}

function PointBadge({ point, ...props }: PointBadgeProps) {
  return (
    <Badge
      className="text-sm font-bold text-gray-800"
      variant={"secondary"}
      {...props}
    >
      {point.toLocaleString()} points
    </Badge>
  );
}

export default PointBadge;
