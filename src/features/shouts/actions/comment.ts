"use server";
import { insertCommentSchema } from "@/drizzle/schema/comment";
import { protectedProcedure } from "@/features/shouts/procedures/protected";
import {
  createCommentUseCase,
  deleteCommentUseCase,
  getCommentsByShoutIdUseCase,
} from "@/features/shouts/use-cases/comment";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createCommentAction = protectedProcedure
  .input(insertCommentSchema)
  .handler(async ({ input, ctx }) => {
    try {
      await createCommentUseCase(ctx.user.id, {
        userId: ctx.user.id,
        shoutId: input.shoutId,
        message: input.message,
      });

      revalidatePath("/shouts");
      revalidatePath(`/shouts/${input.shoutId}`);
      revalidatePath(`/shouts/${input.shoutId}`, "layout");
    } catch (error) {
      throw error;
    }
  });

export const deleteCommentAction = protectedProcedure
  .input(
    z.object({
      commentId: z.string(),
      shoutId: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      await deleteCommentUseCase(ctx.user.id, input.shoutId, input.commentId);

      revalidatePath("/shouts");
      revalidatePath(`/shouts/${input.shoutId}`);
    } catch (error) {
      throw error;
    }
  });

// FIX: find a better way to load more comments
export const loadMoreCommentsAction = protectedProcedure
  .input(
    z.object({
      shoutId: z.string(),
      page: z.number(),
    })
  )
  .handler(async ({ input }) => {
    const comments = await getCommentsByShoutIdUseCase(
      input.shoutId,
      input.page
    );
    return comments;
  });
