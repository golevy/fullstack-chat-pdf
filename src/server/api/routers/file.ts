import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const fileRouter = createTRPCRouter({
  fetchAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.file.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),

  fetchFile: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const file = await ctx.db.file.findFirst({
        where: {
          id,
        },
      });

      if (!file) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return file;
    }),

  deleteFile: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const file = await ctx.db.file.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      await ctx.db.file.delete({
        where: {
          id: input.id,
        },
      });

      return file;
    }),

  getFile: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { key } = input;

      const file = await ctx.db.file.findFirst({
        where: {
          key,
          userId,
        },
      });

      if (!file) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return file;
    }),
});
