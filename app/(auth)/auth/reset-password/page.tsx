"use client"

import { sendResetPassword } from "@/actions/auth/send-reset-password";
import { Button } from "@/components/custom/ui/button";
import { FormAlerts } from "@/components/custom/ui/form-alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { ResetPasswordSchema } from "@/schema/auth/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardAuth } from "../_components/card-auth";

export default function ResetPassword() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    }
  })

  function onSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      sendResetPassword(data)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        })
        .catch(() => setError("Something went wrong"));
    })
  }

  return (
    <CardAuth
      headerLabel="Reset Password"
      backButtonLabel="Back to sign in"
      backButtonHref="/auth/sign-in"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="shortshub@example.com"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormAlerts message={success || error} variant={success ? "success" : "error"} />
            <Button type="submit" className="w-full" size={"lg"} variant={"primary"} disabled={isPending} loading={isPending}>
              Reset password
            </Button>
          </div>
        </form>
      </Form>
    </CardAuth>
  )
}
