export type AppointmentPurpose = "buying" | "selling";
export type AppointmentStatus = "scheduled" | "cancelled" | "completed";

export interface AppointmentRecord {
  id: string;
  slotId: string;
  dateKey: string;
  timeLabel: string;
  purpose: AppointmentPurpose;
  status: AppointmentStatus;
  agentName: string;
  clientUid: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  propertyAddress: string;
  message: string;
  createdAt?: unknown;
}

export interface AppointmentSlotRecord {
  id: string;
  dateKey: string;
  timeLabel: string;
  bookedByUid: string;
  createdAt?: unknown;
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function formatDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function normalizeTimeLabel(timeLabel: string) {
  return timeLabel
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createSlotId(dateKey: string, timeLabel: string) {
  return `${dateKey}__${normalizeTimeLabel(timeLabel)}`;
}

function parseTimeLabel(timeLabel: string) {
  const [timePart, meridiem] = timeLabel.split(" ");
  const [hoursPart, minutesPart] = timePart.split(":");
  let hours = Number(hoursPart);
  const minutes = Number(minutesPart);

  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  }

  if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

export function compareAppointments(
  left: Pick<AppointmentRecord, "dateKey" | "timeLabel">,
  right: Pick<AppointmentRecord, "dateKey" | "timeLabel">,
) {
  if (left.dateKey === right.dateKey) {
    return parseTimeLabel(left.timeLabel) - parseTimeLabel(right.timeLabel);
  }

  return left.dateKey.localeCompare(right.dateKey);
}
