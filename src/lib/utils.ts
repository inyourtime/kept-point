import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTokenExpired(token: string) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expire = new Date(payload.exp * 1000);
  if (expire < new Date()) {
    return true;
  } else {
    return false;
  }
}
