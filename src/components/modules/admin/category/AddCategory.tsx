"use client";

import { useState } from "react";
import { Button } from "../../../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../../ui/dialog";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Input } from "../../../ui/input";
import { Field, FieldError, FieldLabel } from "../../../ui/field";
import { toast } from "sonner";
import { createCategoryAction } from '@/src/actions/category.action';
import { Loader2, Plus } from "lucide-react";

// স্কিমা ভ্যালিডেশন
const categorySchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long"),
});

export default function AddCategory() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
        },
        validators: {
            onChange: categorySchema, // রিয়েল-টাইম ভ্যালিডেশন
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating category...");
            setIsSubmitting(true);

            try {
                const res = await createCategoryAction(value.name);

                if (res?.success) {
                    toast.success("Category created successfully!", { id: toastId });
                    setIsOpen(false);
                    form.reset();
                } else {
                    toast.error(res?.message || "Failed to create category", { id: toastId });
                }
            } catch (error) {
                toast.error("Something went wrong. Please try again.", { id: toastId });
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <>
            {/* মেইন বাটন - ব্র্যান্ড কালার পিঙ্ক করা হয়েছে */}
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-2xl flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
                <Plus size={18} />
                Add Category
            </Button>

            <Dialog open={isOpen} onOpenChange={(open) => {
                if (!isSubmitting) setIsOpen(open); // সাবমিট হওয়ার সময় বন্ধ হবে না
            }}>
                <DialogContent className="sm:max-w-md rounded-3xl p-8 border-none">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-slate-800">New Category</DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Give a unique name to your new collection or category.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-6 py-4"
                    >
                        <form.Field name="name">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;

                                return (
                                    <Field className="flex flex-col gap-2">
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="font-semibold text-slate-700 ml-1"
                                        >
                                            Category Name
                                        </FieldLabel>

                                        <Input
                                            type="text"
                                            id={field.name}
                                            placeholder="e.g. Winter Collection"
                                            className={`rounded-xl py-6 bg-slate-50 border-none focus-visible:ring-2 transition-all ${isInvalid ? "focus-visible:ring-red-400" : "focus-visible:ring-pink-400"
                                                }`}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            disabled={isSubmitting}
                                        />

                                        {isInvalid && (
                                            <div className="text-red-500 text-xs font-medium ml-1 flex items-center gap-1">
                                                <span>•</span>
                                                <FieldError errors={field.state.meta.errors} />
                                            </div>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <DialogFooter className="sm:justify-start gap-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black hover:bg-slate-800 text-white font-bold py-6 rounded-2xl transition-all cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" size={20} />
                                        Creating...
                                    </span>
                                ) : (
                                    "Save Category"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}