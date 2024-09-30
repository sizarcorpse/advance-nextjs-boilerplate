// import { utapi } from "@/utils/uploadthing";
// import { z } from "zod";

// import { protectedProcedure } from "@/features/shouts/procedures/protected";
// import { Form } from "react-hook-form";

// export const uploadAttachmentAction = protectedProcedure
//   .input(
//     z.object({
//       files: z.array(z.string()),
//     })
//   )
//   .handler(async ({ input }) => {
//     const formData = new FormData();

//     console.log(input.files);
//   });

// // export const createCommentAction = protectedProcedure
// //   .input(insertCommentSchema)
// //   .handler(async ({ input, ctx }) => {
// //     try {
// //       await createCommentUseCase(ctx.user.id, {
// //         userId: ctx.user.id,
// //         shoutId: input.shoutId,
// //         message: input.message,
// //       });

// //       revalidatePath("/shouts");
// //       revalidatePath(`/shouts/${input.shoutId}`);
// //       revalidatePath(`/shouts/${input.shoutId}`, "layout");
// //     } catch (error) {
// //       throw error;
// //     }
// //   });

// // export async function uploadFiles(formData: FormData) {
// //   const files = formData.getAll("files");

// //   if (!files) {
// //     throw new Error("No files found");
// //   }

// //   const fileEntries = files.filter(
// //     (entry): entry is File => entry instanceof File
// //   );

// //   if (fileEntries.length === 0) {
// //     throw new Error("No valid files found");
// //   }

// //   const response = await utapi.uploadFiles(fileEntries);

// //   return response;
// // }
