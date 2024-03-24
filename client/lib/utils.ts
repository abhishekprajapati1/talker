import { type ClassValue, clsx } from "clsx"
import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDateAccronym = (date: Date) => {
  if (dayjs(date).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY")) return "Today";
  if (dayjs(date).format("DD/MM/YYYY") === dayjs().subtract(1, "day").format("DD/MM/YYYY")) return "Yesterday";
  return dayjs(date).format("MMM DD YYYY");
}