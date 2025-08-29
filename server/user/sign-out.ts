'use server';

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    redirect("/login");
  } catch (_error) {
    redirect("/login");
  }
};