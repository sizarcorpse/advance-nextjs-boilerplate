import { dark } from "@clerk/themes";
import { cookies } from "next/headers";

export default function getClerkTheme() {
  const cookie = cookies();
  const theme = cookie.get("theme");

  if (!theme) return undefined;

  if (theme.value.toString() === "dark") {
    return dark;
  }

  return undefined;
}
