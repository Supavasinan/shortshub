"use client"

import { onSubmitSignUp } from "@/actions/auth/signup"
import { Button } from "@/components/custom/ui/button"

import { FormAlerts } from "@/components/custom/ui/form-alert"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/shadcn/ui/form"
import { Input } from "@/components/shadcn/ui/input"
import { SignUpFormSchema } from "@/schema/auth/form.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CardAuth } from "../_components/card-auth"

export default function SignUp() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {

      onSubmitSignUp(data)
        .then((data) => {
          
          if (data?.error) {
            setError(data?.error);
          }
          if (data?.success) {
            // form.reset();
            setSuccess(data.success);
          }

        })
        .catch(() => setError("Something went wrong"));
    })
  }

  return (

    <CardAuth
      headerLabel="Get started"
      backButtonLabel="Have an account?"
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
            <FormAlerts message={success || error} variant={success ? "success" : "error"} />

            <Button type="submit" className="w-full" size={"lg"} variant={"primary"} disabled={isPending} loading={isPending}>
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </CardAuth>

  )
}
