
"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createMeetingInDb,
  updateMeetingInDb,
  deleteMeetingFromDb,
} from "@/lib/meetings-postgres";
import type { SacramentMeeting, MeetingType } from "@/lib/types";

const schema = z.object({
  date: z.iso.date(),
  meetingType: z.enum(["testimony", "regular", "stake", "general"]),
  presiding: z.string().trim().min(1, "Presiding officer is required"),
  conducting: z.string().trim().min(1, "Conducting officer is required"),
  openingPrayer: z.string().trim().min(1, "Opening prayer is required"),
  closingPrayer: z.string().trim().min(1, "Closing prayer is required"),
  openingHymnNumber: z.coerce.number<number>().int().positive(),
  openingHymnTitle: z.string().trim().min(1, "Opening hymn title is required"),
  sacramentHymnNumber: z.coerce.number<number>().int().positive(),
  sacramentHymnTitle: z.string().trim().min(1, "Sacrament hymn title is required"),
  closingHymnNumber: z.coerce.number<number>().int().positive(),
  closingHymnTitle: z.string().trim().min(1, "Closing hymn title is required"),
  announcements: z.string(),
  speakers: z.string(),
  wardBusiness: z.string(),
  stakeBusiness: z.boolean(),
});

export type MeetingFormState = {
  message: string;
  errors?: Record<string, string[]>;
};

function parseForm(formData: FormData) {
  return schema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    announcements: formData.get("announcements") ?? "",
    speakers: formData.get("speakers") ?? "",
    wardBusiness: formData.get("wardBusiness") ?? "",
    stakeBusiness: formData.get("stakeBusiness") === "on",
  });
}

type Validated = z.infer<typeof schema>;

function meetingFromInput(input: Validated): Omit<SacramentMeeting, "id"> {
  return {
    date: input.date,
    meetingType: input.meetingType as MeetingType,
    presiding: input.presiding,
    conducting: input.conducting,
    openingPrayer: input.openingPrayer,
    closingPrayer: input.closingPrayer,
    openingHymn: {
      number: input.openingHymnNumber,
      title: input.openingHymnTitle,
    },
    sacramentHymn: {
      number: input.sacramentHymnNumber,
      title: input.sacramentHymnTitle,
    },
    closingHymn: {
      number: input.closingHymnNumber,
      title: input.closingHymnTitle,
    },
    announcements: input.announcements
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    wardBusiness: input.wardBusiness
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((description) => ({ description })),
    speakers: input.speakers
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({
        name,
        topic: "",
        type: "speaker" as const,
      })),
    stakeBusiness: input.stakeBusiness,
  };
}

export async function createMeeting(
  _previous: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const parsed = parseForm(formData);

  if (!parsed.success) {
    return {
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  let id: number;

  try {
    id = await createMeetingInDb(meetingFromInput(parsed.data));
  } catch (error) {
    console.error("Failed to create meeting", error);
    return {
      message: "Unable to save the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  redirect(`/meetings/${id}`);
}

export async function updateMeeting(
  id: number,
  _previous: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const parsed = parseForm(formData);

  if (!parsed.success) {
    return {
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const updated = await updateMeetingInDb(
      id,
      meetingFromInput(parsed.data)
    );

    if (!updated) {
      return { message: "This meeting no longer exists." };
    }
  } catch (error) {
    console.error("Failed to update meeting", error);
    return {
      message: "Unable to save the changes. Please try again.",
    };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect(`/meetings/${id}`);
}

export async function deleteMeeting(id: number): Promise<void> {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid meeting ID");
  }

  await deleteMeetingFromDb(id);

  revalidatePath("/meetings");
  redirect("/meetings");
}
