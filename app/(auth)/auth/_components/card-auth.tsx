"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/shadcn/ui/card";
import Link from "next/link";
import { ButtonBack } from "./button-back";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
};

export const CardAuth = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md bg-transparent ">
      <CardHeader>
        <ButtonBack href="/" label="Back" className="mb-4 self-end" />
        {headerLabel}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {backButtonHref && (
          <div className="w-full text-center">
            <Link className="text-center text-xs underline w-fit" href={backButtonHref}>{backButtonLabel}</Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};