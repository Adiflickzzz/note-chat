import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"]),
  request: defineTable({
    sender: v.id("users"),
    reciever: v.id("users"),
  })
    .index("by_reciver", ["reciever"])
    .index("by_sender_reciver", ["sender", "reciever"]),
  conversations: defineTable({
    name: v.optional(v.string()),
    isGroup: v.boolean(),
  }),
  friends: defineTable({
    user1: v.id("users"),
    user2: v.id("users"),
    conversationId: v.id("conversations"),
  }),
});
