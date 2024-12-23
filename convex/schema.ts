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
  requests: defineTable({
    sender: v.id("users"),
    receiver: v.id("users"),
  })
    .index("by_receiverId", ["receiver"])
    .index("by_receiverId_senderId", ["receiver", "sender"]),
  conversations: defineTable({
    name: v.optional(v.string()),
    isGroup: v.boolean(),
  }),
  friends: defineTable({
    user1: v.id("users"),
    user2: v.id("users"),
    conversationId: v.id("conversations"),
  })
    .index("by_user1", ["user1"])
    .index("by_user2", ["user2"])
    .index("by_conversationId", ["conversationId"]),
  conversationMembers: defineTable({
    memberId: v.id("users"),
    conversationId: v.id("conversations"),
  })
    .index("by_memberId", ["memberId"])
    .index("by_conversationId", ["conversationId"])
    .index("by_memberId_conversationId_", ["memberId", "conversationId"]),
});
