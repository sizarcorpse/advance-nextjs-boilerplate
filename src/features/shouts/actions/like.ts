"use server";
import { insertLikeSchema } from "@/drizzle/schema/like";
import { protectedProcedure } from "@/features/shouts/procedures/protected";
import {
  createShoutLikeUseCase,
  deleteShoutLikeUseCase,
  getShoutLikeByUserIdUseCase,
} from "@/features/shouts/use-cases/like";
import { revalidatePath } from "next/cache";

export const createShoutLikeAction = protectedProcedure
  .input(insertLikeSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const isLiked = await getShoutLikeByUserIdUseCase(
        ctx.user.id,
        input.shoutId
      );

      if (isLiked) {
        await deleteShoutLikeUseCase(ctx.user.id, input);
        revalidatePath("/shouts");
        revalidatePath(`/shouts/${input.shoutId}`);
        return;
      }

      await createShoutLikeUseCase(ctx.user.id, input);

      revalidatePath("/shouts");
      revalidatePath(`/shouts/${input.shoutId}`);
    } catch (error) {
      throw error;
    }
  });
