"use client"

import { setShortCut } from "@/actions/post/shortcut"
import { deleteShortcut } from "@/actions/post/shortcut-delete"
import { Button } from "@/components/shadcn/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/shadcn/ui/form"
import { cn } from "@/lib/utils"
import { ShortcutsInputSchema } from "@/schema/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostDetail } from "@prisma/client"
import { isDate } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { Disc, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useRecordHotkeys } from 'react-hotkeys-hook'
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid';



type Prop = {
    postId: string
    initShortcut: PostDetail[]
}


export function ShortcutForm({ postId, initShortcut }: Prop) {
    const FormSchema = ShortcutsInputSchema
    const [keys, { start, stop, isRecording }] = useRecordHotkeys()
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [recordingState, setRecordingState] = useState({ status: false, id: "" });
    const [isPending, startTransition] = useTransition();
    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            shortcut: initShortcut
        }
    })

    const onSave = async (values: z.infer<typeof FormSchema>) => {
        const validatedFields = FormSchema.safeParse(values);

        if (!validatedFields.success) {
            return toast.error("Invalid fields!");
        }

        const { shortcut } = validatedFields.data;


        startTransition(() => {
            stop()
            setShortCut({ shortcut }, postId).then(() => {
                toast.success("Saved")
                toggleEdit()
                router.refresh()
            })
        })
    }


    const onDelete = (id: string | undefined) => {
        if (!id) return toast.error("Invalid id")
        const shortcut = form.getValues("shortcut").find((shortcut) => shortcut.id === id)

        if (shortcut?.id && shortcut?.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
            startTransition(() => {
                deleteShortcut(id).then(() => {
                    toast.success("Deleted")
                    form.setValue("shortcut", form.watch("shortcut").filter((shortcut) => shortcut.id !== id))
                })
            })

        } else {
            form.setValue("shortcut", form.watch("shortcut").filter((shortcut) => shortcut.id !== id))
        }
    }

    const RecordShortcut = (id: string) => {
        if (!recordingState.status || recordingState.id !== id) {
            setRecordingState({ status: true, id })
            start()
        } else {
            setRecordingState({ status: false, id: "" })
            stop()
        }
    }

    useEffect(() => {
        if (recordingState.status && recordingState.id && isRecording) {
            form.watch("shortcut").forEach((shortcut) => {
                if (shortcut.id === recordingState.id) {
                    shortcut.value = Array.from(keys).join(' + ').toUpperCase() || "Press any key";
                    form.trigger("shortcut");
                }
            })
        }

    }, [keys, form, isRecording, recordingState.id, recordingState.status]);


    const { isSubmitting, isValid } = form.formState;

    useEffect(() => {

        if (!isEditing && !isSubmitting) {
            form.reset({ shortcut: initShortcut });
        }

    }, [isEditing, isSubmitting, form, initShortcut]);


    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)}>
                <div className="p-4 border rounded-md w-full">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Shortcut</p>
                        <div className="space-x-4">
                            {isEditing && (
                                <Button disabled={isSubmitting || !isValid} variant={"ghost"} type="submit" size="sm" >
                                    Save
                                </Button>
                            )}
                            <Button variant={"outline"} type="button" size={"sm"} className="space-x-2" onClick={toggleEdit}>
                                {isEditing
                                    ? (
                                        <p className="text-sm">Cancel</p>
                                    ) : (
                                        <>
                                            <Pencil className="size-4" />
                                            <p className="text-sm">Edit</p>
                                        </>
                                    )
                                }
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col space-y-2">
                        <AnimatePresence>
                            {form.watch("shortcut").map((data) => {
                                return (
                                    <motion.div
                                        key={data.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{
                                            opacity: { duration: 0.2 },
                                            height: { duration: 0.2 },
                                        }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="shortcut"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                                                        <FormControl>
                                                            <div className="flex gap-x-3 items-center justify-between w-full">
                                                                <div className="flex-shrink-0 flex items-center  justify-center gap-x-2">
                                                                    <p className={cn("h-10 transition-all border rounded-lg text-sm text-muted-foreground px-3 flex items-center justify-center",
                                                                        recordingState.id === data.id && isRecording && "border-red-500 animate-pulse"
                                                                    )}>{data?.value}</p>
                                                                    <Button disabled={!isEditing || isSubmitting} className="outline-0" onClick={() => RecordShortcut(data.id || "")} variant="outline" type="button" size="icon">
                                                                        <Disc className={cn("size-4 transition-all",
                                                                            recordingState.id === data.id && isRecording && "text-red-500 animate-pulse"
                                                                        )} />
                                                                    </Button>
                                                                </div>
                                                                <div className="relative w-full flex items-center">
                                                                    <input
                                                                        onChange={(e) => { data.label = e.target.value; form.trigger("shortcut") }}
                                                                        value={data.label}
                                                                        disabled={!isEditing}
                                                                        placeholder="Description"
                                                                        className="bg-transparent h-10 w-full border text-sm  px-3 rounded-lg disabled:opacity-65 disabled:cursor-not-allowed"
                                                                    />
                                                                    <Button
                                                                        className="absolute right-1 size-8"
                                                                        variant="ghost"
                                                                        type="button"
                                                                        size="icon"
                                                                        disabled={isSubmitting}
                                                                        onClick={() => {
                                                                            onDelete(data.id)
                                                                        }}
                                                                    >
                                                                        <Trash2 className="size-4 text-red-500" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </FormControl>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                        <Button
                            variant={"secondary"}
                            type="button"
                            size="sm"
                            disabled={isSubmitting || !isEditing || isPending}
                            onClick={
                                () => form.setValue("shortcut",
                                    [...form.watch("shortcut"), {
                                        id: String(new Date().getTime()),
                                        label: "",
                                        value: "No shortcut set"
                                    }])
                            }
                        >
                            Add Shortcut
                        </Button>
                    </div>

                </div>
            </form>
        </Form >
    )
}

