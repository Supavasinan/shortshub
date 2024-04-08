import { SectionContainer } from "@/components/custom/ui/Layout/section-container";
import { buttonVariants } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/shadcn/ui/separator";
import { CreateForm } from "./_components/create-form";

export default function CreatePostPage() {
  return (
    <SectionContainer className="py-6 space-y-5">
      <div className="flex items-center justify-start gap-x-4">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
          <ChevronLeft />
        </Link>
        <h1 className="text-base md:text-md">Post Create</h1>
      </div>
      <Separator className="w-full" />
      <div className="py-6 lg:py-20 flex items-center justify-center">
        <CreateForm />
      </div>
    </SectionContainer>
  )
}
