import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("Unauthorized");
    }

    if (args.email === currentUser.email) {
      throw new ConvexError("Cannot send request to your self");
    }

    const receiver = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!receiver) {
      throw new ConvexError("Reciever not found");
    }

    const requestAlreadySent = await ctx.db
      .query("requests")
      .withIndex("by_receiverId_senderId", (q) =>
        q.eq("receiver", receiver._id).eq("sender", currentUser._id)
      )
      .unique();

    if (requestAlreadySent) {
      throw new ConvexError("Request already sent");
    }

    const requestAlreadyRecieved = await ctx.db
      .query("requests")
      .withIndex("by_receiverId_senderId", (q) =>
        q.eq("receiver", currentUser._id).eq("sender", receiver._id)
      )
      .unique();

    if (requestAlreadyRecieved) {
      throw new ConvexError("Request already received");
    }

    ctx.db.insert("requests", {
      receiver: receiver._id,
      sender: currentUser._id,
    });
  },
});
