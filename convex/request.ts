import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    if (args.email === identity.email) {
      throw new ConvexError("Cannot send request to yourself");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const reciever = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!reciever) {
      throw new ConvexError("User not found");
    }

    const requestAlreadySent = await ctx.db
      .query("request")
      .withIndex("by_sender_reciver", (q) =>
        q.eq("sender", currentUser._id).eq("reciever", reciever._id),
      )
      .unique();

    if (requestAlreadySent) {
      throw new ConvexError("Request has already been sent");
    }
    const requestAlreadyRecieved = await ctx.db
      .query("request")
      .withIndex("by_sender_reciver", (q) =>
        q.eq("sender", reciever._id).eq("reciever", currentUser._id),
      )
      .unique();

    if (requestAlreadyRecieved) {
      throw new ConvexError("Request already recieved");
    }

    // ToDo Already friends with eachother

    ctx.db.insert("request", {
      sender: currentUser._id,
      reciever: reciever._id,
    });
  },
});
