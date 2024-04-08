"use client"

import { onSubmitSignIn } from "@/actions/auth/signin"
import { Button } from "@/components/custom/ui/button"
import { FormAlerts } from "@/components/custom/ui/form-alert"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form"
import { Input } from "@/components/shadcn/ui/input"
import { SignInFormSchema } from "@/schema/auth/form.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CardAuth } from "../_components/card-auth"

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof SignInFormSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      onSubmitSignIn(data, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }

        })
        .catch(() => setError("Something went wrong"));
    })
  }

  return (
    <CardAuth
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/sign-up"
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
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription>
              <FormAlerts message={success || error || urlError} variant={success ? "success" : "error"} />
            </FormDescription>
            <div className="space-y-2">
              <Link className="text-xs hover:underline transition-all" href="/auth/reset-password">
                Forgot password?
              </Link>
              <Button type="submit" className="w-full" size={"lg"} variant={"primary"} disabled={isPending} loading={isPending}>
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CardAuth>

  )
}
