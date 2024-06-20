"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { z } from "zod";

import { addToWaitlistAction } from "~/lib/actions/waitlist";
import { cn } from "~/lib/utils";
import { waitlistSchema } from "~/lib/validations";

import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

type WaitlistFormProps = {
  isFooter?: boolean;
};

type FormData = z.infer<typeof waitlistSchema>;

const defaultValues = {
  email: "",
};

export function WaitlistForm({ isFooter = false }: WaitlistFormProps) {
  const [isSubmitting, setSubmitting] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    if (form.formState.isSubmitSuccessful) {
      toast.success("You're already on the waitlist!");
      return;
    }

    setSubmitting(true);

    toast.promise(() => addToWaitlistAction(data), {
      loading: "Adding to waitlist...",
      success: "Added to waitlist!",
      error: (e) => (e as Error).message,
      finally: () => setSubmitting(false),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col gap-4 md:flex-row",
          isFooter ? "w-full" : "duration-1000 animate-in slide-in-from-top-1/4"
        )}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2" />

                  <Input
                    disabled={isSubmitting}
                    placeholder="Enter your email address"
                    className={cn(
                      "h-12 w-full rounded-4xl border-2 pl-12 font-matter transition-shadow hover:shadow-md focus-visible:ring-4",
                      !isFooter && "sm:h-16 sm:text-2xl"
                    )}
                    {...field}
                  />
                </div>
              </FormControl>
              {/* <FormDescription>
                Get notified when we launch and receive exclusive early access.
              </FormDescription> */}
              <FormMessage className="pl-6" />
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          className={cn(
            "h-12 rounded-4xl p-4 text-lg font-semibold uppercase transition-all duration-200 ease-in-out hover:rounded-2xl",
            !isFooter && "px-8 sm:h-16 sm:text-xl"
          )}
        >
          {isSubmitting ?
            <span>
              <Loader className="mr-2 inline-block animate-spin" />
              Adding to Waitlist...
            </span>
          : form.formState.isSubmitSuccessful ?
            <span>
              <Check className="mr-2 inline-block" />
              Added to Waitlist!
            </span>
          : "Join Waitlist"}
        </Button>
      </form>
    </Form>
  );
}
