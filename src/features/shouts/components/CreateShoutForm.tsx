"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { inputStyles } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";
import { InsertShout, insertShoutSchema } from "@/drizzle/schema/shout";
import { createShoutAction } from "@/features/shouts/actions/shout";
import { cn } from "@/libs/utils";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Speech, UserX, Users, VenetianMask } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

const Editor = dynamic(() => import("./ShoutEditor"), { ssr: false });

const CreateShoutForm = () => {
  const { user } = useUser();
  const { execute, isPending, isSuccess } = useServerAction(createShoutAction);
  const { toast } = useToast();
  const t = useTranslations("shout_form");

  const form = useForm<InsertShout>({
    resolver: zodResolver(insertShoutSchema),
    defaultValues: {
      message: "",
      isAnonymous: false,
      allowedComment: "everyone",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = form;

  const onSubmit = async (values: InsertShout) => {
    try {
      const [_, error] = await execute(values);

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: t("toast.success.title"),
        description: t("toast.success.description"),
      });

      reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("toast.error.title"),
        description: t("toast.error.description"),
      });
    }
  };

  return (
    <Card className="max-w-screen-md border-border border-[0.5px] shadow-[inset_0_0_32px_-5px_rgba(75,75,75,0.075)] dark:shadow-[inset_0_0_32px_-5px_rgba(254,254,254,0.07)]">
      <CardContent className="p-2 sm:p-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start justify-between gap-2 min-h-28 sm:gap-4">
              <Avatar>
                <AvatarImage
                  src={user?.imageUrl}
                  asChild
                  className="object-cover"
                >
                  <Image
                    src={user?.imageUrl as string}
                    alt="User Avatar"
                    width={40}
                    height={40}
                  />
                </AvatarImage>
                <AvatarFallback className="animate-pulse"></AvatarFallback>
              </Avatar>
              <Editor form={form} className="flex-1" resetEditor={isSuccess} />
            </div>
            <div className="flex items-start justify-between flex-col gap-2 sm:gap-4 sm:flex-row">
              <div className="flex items-center justify-between gap-2">
                <FormField
                  control={form.control}
                  name="allowedComment"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              inputStyles,
                              `w-36 data-[placeholder]:text-muted-foreground`
                            )}
                          >
                            <SelectValue
                              placeholder={t(
                                "fields.allowed_comment.placeholder"
                              )}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className={inputStyles}>
                          <div className="p-2">
                            <p className="text-sm font-semibold text-primary">
                              {t("fields.allowed_comment.label")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {t("fields.allowed_comment.description")}
                            </p>
                          </div>

                          <SelectItem
                            value={t("fields.allowed_comment.options.0.value")}
                          >
                            <div className="inline-flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span className="text-base">
                                {t("fields.allowed_comment.options.0.label")}
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value={t("fields.allowed_comment.options.1.value")}
                          >
                            <div className="inline-flex items-center gap-2">
                              <UserX className="h-4 w-4" />
                              <span className="text-base">
                                {t("fields.allowed_comment.options.1.label")}
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Toggle
                  name="isAnonymous"
                  onPressedChange={(value) => {
                    form.setValue("isAnonymous", value);
                  }}
                  className={cn(
                    inputStyles,
                    `group bg-primary/5 p-2 text-primary/60 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground aspect-square`
                  )}
                >
                  <VenetianMask className="h-4 w-4" strokeWidth={1.75} />
                </Toggle>

                <Button
                  type="button"
                  className={cn(
                    inputStyles,
                    `bg-primary/5 p-2 text-primary/60 aspect-square hover:bg-muted `
                  )}
                >
                  <ImagePlus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isPending || !isDirty}
              >
                {t("fields.submit.label")}
                <Speech className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateShoutForm;
