"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z
    .string()
    .min(2)
    .email()
    .refine(
      (v) => {
        const allowed = [
          "gmail.com",
          "yahoo.com",
          "hotmail.com",
          "outlook.com",
          "icloud.com",
        ];
        const domain = v.split("@")[1];
        if (domain && !allowed.includes(domain)) {
          return false;
        }
        return v;
      },
      {
        message: "Invalid email domain",
      }
    ),
  company: z.string().max(50),
  website: z.union([z.string().url(), z.string().max(0)]),
  service: z.enum([
    "Frontend Development",
    "Backend Development",
    "Fullstack Development",
  ]),
  message: z.string().max(1000),
});

type ContactForm = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const fields = useTranslations("contact_form.fields");
  const texts = useTranslations("contact_form.texts");

  //   const router = useRouter();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
      service: "" as ContactForm["service"],
    },
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async (data: ContactForm) => {
    try {
      console.log(data);
      //   const response = await fetch("/api/send", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Failed to send email");
      //   }

      //   const { status } = await response.json();

      //   if (status === "error") {
      //     throw new Error("Failed to send email");
      //   }

      reset();
      //   router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const inputStyles =
    "min-h-12 text-sm border-none shadow-[inset_0_0_16px_-5px_rgba(75,75,75,0.09)] dark:shadow-[inset_0_0_16px_-5px_rgba(254,254,254,0.07)] cursor-pointer";

  return (
    <div className="group relative max-w-lg p-8 border-border border-[0.5px] rounded-md flex flex-col items-start justify-start gap-10 mx-auto shadow-[inset_0_0_32px_-5px_rgba(75,75,75,0.075)] dark:shadow-[inset_0_0_32px_-5px_rgba(254,254,254,0.07)]">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-50 to-neutral-800 dark:to-neutral-400 bg-opacity-50 ">
          {texts("title")}
        </h2>
        <p className="font-normal text-lg text-neutral-500 dark:text-neutral-300 text-left max-w-screen-md">
          {texts("description")}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={fields("name.placeholder")}
                    className={inputStyles}
                    {...field}
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
                <FormControl>
                  <Input
                    placeholder={fields("email.placeholder")}
                    className={inputStyles}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={fields("company.placeholder")}
                    className={inputStyles}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={fields("website.placeholder")}
                    className={inputStyles}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl
                    className={`${inputStyles} data-[placeholder]:text-muted-foreground`}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={fields("service.placeholder")}
                      />
                      <SelectContent className={inputStyles}>
                        <SelectItem value={fields("service.options.0")}>
                          {fields("service.options.0")}
                        </SelectItem>
                        <SelectItem value={fields("service.options.1")}>
                          {fields("service.options.1")}
                        </SelectItem>
                        <SelectItem value={fields("service.options.2")}>
                          {fields("service.options.2")}
                        </SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </FormControl>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={fields("message.placeholder")}
                    className={inputStyles}
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {fields("submit.label")}
            <SendHorizontal className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
