"use client";

import { newVerification } from "@/actions/auth/new-verification";
import { FormAlerts } from "@/components/custom/ui/form-alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";


export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-base">Confirming your verification</CardTitle>
        <CardDescription className="text-sm">Please wait, we are verifying your account.</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending && (
          <Loader className="size-4 animate-spin" />
        )}
        <FormAlerts message={success || error} variant={success ? "success" : "error"} />
      </CardContent>
      <CardFooter>
        <Link href="/auth/sign-in" className="text-sm underline w-fit">
          Back to sign in
        </Link>
      </CardFooter>
    </Card>

  )
}