import { z } from "zod";

export const projectTypes = [
  "palace",
  "residence",
  "sacred",
  "hospitality",
  "yacht",
  "other",
] as const;

type Messages = {
  nameMin: string;
  emailInvalid: string;
  projectType: string;
  messageMin: string;
};

/**
 * Build the contact schema with localised messages so validation copy
 * respects the active locale.
 */
export function createContactSchema(m: Messages) {
  return z.object({
    name: z.string().trim().min(2, { message: m.nameMin }),
    email: z.string().trim().email({ message: m.emailInvalid }),
    phone: z.string().trim().optional().or(z.literal("")),
    projectType: z.enum(projectTypes, { message: m.projectType }),
    budget: z.string().optional().or(z.literal("")),
    message: z.string().trim().min(10, { message: m.messageMin }),
    // Honeypot — must remain empty (bots fill hidden fields).
    company: z.string().max(0).optional().or(z.literal("")),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

/** Server-side schema with static messages (no translation context). */
export const contactServerSchema = createContactSchema({
  nameMin: "Name is too short.",
  emailInvalid: "Invalid email address.",
  projectType: "Invalid project type.",
  messageMin: "Message is too short.",
});
