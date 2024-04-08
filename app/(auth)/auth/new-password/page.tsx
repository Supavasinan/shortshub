"use client"
import { newPassword } from "@/actions/auth/new-passoword";
import { Button } from "@/components/custom/ui/button";
import { FormAlerts } from "@/components/custom/ui/form-alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { NewPasswordSchema } from "@/schema/auth/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardAuth } from "../_components/card-auth";

export default function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    function onSubmit(data: z.infer<typeof NewPasswordSchema>) {
        setError("");
        setSuccess("");

        if (!token) return setError("Missing token!");

        startTransition(() => {
            newPassword(data, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
                .catch(() => setError("Something went wrong"));
        })
    }
    return (
        <CardAuth
            headerLabel="Enter a new password"
            backButtonHref="/auth/sign-in"
            backButtonLabel="Back to sign in"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
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
                            Reset password
                        </Button>
                    </div>
                </form>
            </Form>
        </CardAuth>
    )
}
