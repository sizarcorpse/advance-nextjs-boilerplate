import { auth } from "@clerk/nextjs/server";
import { createServerActionProcedure } from "zsa";

const enforceUserIsAuthed = createServerActionProcedure().handler(async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return {
      user: {
        id: userId,
      },
    };
  } catch (error) {
    throw error;
  }
});

export const protectedProcedure = enforceUserIsAuthed.createServerAction();
