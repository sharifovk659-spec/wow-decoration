import { z } from "zod";

export const projectTypes = [
  "gazebo",
  "interior",
  "mosque",
  "hotel",
  "villa",
  "government",
  "commercial",
  "other",
] as const;

export const contactCountries = [
  "tajikistan",
  "kazakhstan",
  "saudi",
  "uae",
  "qatar",
  "iraq",
  "kuwait",
  "russia",
  "other",
] as const;

type Messages = {
  nameMin: string;
  phoneMin: string;
  country: string;
  projectType: string;
  messageMin: string;
};

export function createContactSchema(m: Messages) {
  return z.object({
    name: z.string().trim().min(2, { message: m.nameMin }),
    phone: z.string().trim().min(6, { message: m.phoneMin }),
    country: z.enum(contactCountries, { message: m.country }),
    projectType: z.enum(projectTypes, { message: m.projectType }),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    company: z.string().max(0).optional().or(z.literal("")),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

export const contactServerSchema = createContactSchema({
  nameMin: "Name is too short.",
  phoneMin: "Phone is too short.",
  country: "Invalid country.",
  projectType: "Invalid project type.",
  messageMin: "",
});
