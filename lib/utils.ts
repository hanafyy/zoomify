import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(value: number): string {
  // Convert the value into hours and minutes
  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);

  // Determine AM/PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Format hours for 12-hour clock
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Format minutes with leading zero if needed
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Return the formatted time
  return `${formattedHours}:${formattedMinutes} ${period}`;
}
