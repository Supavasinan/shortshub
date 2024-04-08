import { cva } from "class-variance-authority";
import { CircleCheck, TriangleAlert } from "lucide-react";


const BoxVariants = cva(
  "p-3 rounded-md flex items-center gap-x-4 text-sm ",
  {
    variants: {
      variant: {
        default: "bg-primary/5",
        success: "bg-emerald-500/15 text-emerald-500",
        error: "bg-destructive/15 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)


export const FormAlerts = (
  { message, variant }: { message?: string, variant: "success" | "error" }
) => {
  if (!message || !variant) return null;
  
  return (
    <div className={BoxVariants({ variant })}>
      {variant === "success" && <CircleCheck className="size-4  flex-shrink-0" />}
      {variant === "error" && <TriangleAlert className="size-4  flex-shrink-0" />}
      <p className="text-sm ">{message}</p>
    </div>
  );
};
