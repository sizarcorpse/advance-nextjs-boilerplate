"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  InsertCommentRHF,
  insertCommentSchemaRHF,
} from "@/drizzle/schema/comment";
import { createCommentAction } from "@/features/shouts/actions/comment";
import { useShoutCommentStore } from "@/features/shouts/store-provider/ShoutCommentProvider";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Reply } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

const ShoutCommentForm = ({ shoutId }: { shoutId: string }) => {
  const t = useTranslations("shout_comment_form");
  const { user } = useUser();
  const { execute, isPending } = useServerAction(createCommentAction);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { addComment } = useShoutCommentStore((store) => store);

  const form = useForm<InsertCommentRHF>({
    resolver: zodResolver(insertCommentSchemaRHF),
    defaultValues: {
      message: "",
    },
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async (values: InsertCommentRHF) => {
    try {
      addComment({
        id: "1",
        message: values.message,
        shoutId: shoutId,
        userId: user?.id as string,
        createdAt: new Date(),
        user: {
          imageUrl: user?.imageUrl as string,
          username: user?.username as string,
          firstName: user?.firstName as string,
          lastName: user?.lastName as string,
          hasImage: user?.hasImage as boolean,
        },
      });
      reset();
      setOpen(false);

      const [_, error] = await execute({
        message: values.message,
        shoutId: shoutId,
        userId: user?.id as string,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("toast.error.title"),
        description: t("toast.error.description"),
      });
    }
  };

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setOpen(false);
    }
    setOpen(true);
  };

  return (
    <Card className="max-w-screen-md border-border p-0 border-none shadow-none mt-2">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Collapsible onOpenChange={onOpenChange} open={open}>
            <CollapsibleTrigger asChild>
              <div className="flex items-start gap-4">
                <Avatar className="rounded-sm">
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

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormControl>
                        <Textarea
                          placeholder={t("fields.message.placeholder")}
                          className="resize-y border-none p-0 rounded-none focus-visible:ring-0 min-h-10 text-base leading-6 placeholder:text-foreground/60 shadow-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="flex justify-end pt-2">
              <Button type="submit" className="w-auto" disabled={isPending}>
                {t("fields.submit.label")}
                <Reply className="h-4 w-4 ml-2" />
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </form>
      </Form>
    </Card>
  );
};

export default ShoutCommentForm;
