// app/friends/_types.ts
import { z } from "zod";

export const FriendSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email()
});

export type Friend = z.infer<typeof FriendSchema>;
