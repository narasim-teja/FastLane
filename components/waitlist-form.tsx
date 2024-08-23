"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { z } from "zod";

import { addToWaitlistAction } from "~/lib/actions/waitlist";
import { waitlistSchema } from "~/lib/validations";

import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

type FormData = z.infer<typeof waitlistSchema>;

const defaultValues = {
  email: "",
};

export function WaitlistForm() {
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

    toast.promise(
      () =>
        addToWaitlistAction(data).then((res) => {
          if (res?.error) throw new Error(res.error);
        }),
      {
        loading: "Adding to waitlist...",
        success: "Added to waitlist!",
        error: (e) => (e as Error).message,
        finally: () => setSubmitting(false),
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-14 flex items-center gap-2 md:gap-3 lg:gap-4"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="h-7 rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent pt-px lg:h-full">
                  <Input
                    disabled={isSubmitting}
                    placeholder="example@gmail.com"
                    className="h-full rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 px-5 py-2 text-xs font-light placeholder:text-neutral-300 disabled:opacity-100 sm:text-base lg:text-lg"
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

        <div className="overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-violet-500 p-px md:h-full lg:p-0.5">
          <Button
            variant="custom"
            round
            loading={isSubmitting}
            className="h-7 bg-background text-xs text-foreground transition-colors duration-300 hover:bg-transparent hover:text-background sm:text-base lg:h-full lg:px-5 lg:text-lg"
          >
            {isSubmitting ?
              "Adding to Waitlist..."
            : form.formState.isSubmitSuccessful ?
              <>
                <Check className="mr-2 inline-block" />
                Added to Waitlist!
              </>
            : "Join Waitlist"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
