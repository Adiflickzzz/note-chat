import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
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
      .query("requests")
      .withIndex("by_sender_reciver", (q) =>
        q.eq("sender", currentUser._id).eq("reciever", reciever._id),
      )
      .unique();

    if (requestAlreadySent) {
      throw new ConvexError("Request has already been sent");
    }
    const requestAlreadyRecieved = await ctx.db
      .query("requests")
      .withIndex("by_sender_reciver", (q) =>
        q.eq("sender", reciever._id).eq("reciever", currentUser._id),
      )
      .unique();

    if (requestAlreadyRecieved) {
      throw new ConvexError("Request already recieved");
    }

    // ToDo Already friends with eachother

    ctx.db.insert("requests", {
      sender: currentUser._id,
      reciever: reciever._id,
    });
  },
});

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unautorized");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const requests = await ctx.db
      .query("requests")
      .withIndex("by_reciver", (q) => q.eq("reciever", currentUser._id))
      .collect();

    const requestsWithSender = await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request.sender);

        if (!sender) {
          throw new ConvexError("Request sender could nbot be found");
        }

        return { sender, request };
      }),
    );

    return requestsWithSender;
  },
});

export const accept = mutation({
  args: {
    id: v.id("requests"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unautorized");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const request = await ctx.db.get(args.id);

    if (!request || request.reciever !== currentUser._id) {
      throw new ConvexError("There was an error accepting this request");
    }

    const conversationId = await ctx.db.insert("conversations", {
      isGroup: false,
    });

    await ctx.db.insert("friends", {
      user1: currentUser._id,
      user2: request.sender,
      conversationId,
    });

    // ToDo add conversationMembers

    await ctx.db.delete(request._id);
  },
});

export const deny = mutation({
  args: {
    id: v.id("requests"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unautorized");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const request = await ctx.db.get(args.id);

    if (!request || request.reciever !== currentUser._id) {
      throw new ConvexError("There was an error denying this request");
    }

    await ctx.db.delete(request._id);
  },
});
