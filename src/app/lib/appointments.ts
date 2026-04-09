import {
  collection,
  doc,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  where,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { type UserProfile } from "../auth/types";
import { assertFirebaseConfigured } from "./firebase";
import {
  compareAppointments,
  createSlotId,
  formatDateKey,
  type AppointmentPurpose,
  type AppointmentRecord,
  type AppointmentSlotRecord,
} from "../appointments/types";

interface CreateAppointmentInput {
  profile: UserProfile;
  phone: string;
  message: string;
  propertyAddress: string;
  purpose: AppointmentPurpose;
  selectedDate: Date;
  selectedTime: string;
}

export class AppointmentSlotConflictError extends Error {
  constructor() {
    super("That appointment time has already been booked. Please choose another slot.");
    this.name = "AppointmentSlotConflictError";
  }
}

function mapAppointment(
  snapshot: QueryDocumentSnapshot,
): AppointmentRecord {
  const data = snapshot.data() as Record<string, unknown>;

  return {
    id: snapshot.id,
    slotId: typeof data.slotId === "string" ? data.slotId : snapshot.id,
    dateKey: typeof data.dateKey === "string" ? data.dateKey : "",
    timeLabel: typeof data.timeLabel === "string" ? data.timeLabel : "",
    purpose: data.purpose === "selling" ? "selling" : "buying",
    status:
      data.status === "cancelled" || data.status === "completed"
        ? data.status
        : "scheduled",
    agentName: typeof data.agentName === "string" ? data.agentName : "Fahad",
    clientUid: typeof data.clientUid === "string" ? data.clientUid : "",
    clientName: typeof data.clientName === "string" ? data.clientName : "",
    clientEmail: typeof data.clientEmail === "string" ? data.clientEmail : "",
    clientPhone: typeof data.clientPhone === "string" ? data.clientPhone : "",
    propertyAddress:
      typeof data.propertyAddress === "string" ? data.propertyAddress : "",
    message: typeof data.message === "string" ? data.message : "",
    createdAt: data.createdAt,
  };
}

function mapSlot(snapshot: QueryDocumentSnapshot): AppointmentSlotRecord {
  const data = snapshot.data() as Record<string, unknown>;

  return {
    id: snapshot.id,
    dateKey: typeof data.dateKey === "string" ? data.dateKey : "",
    timeLabel: typeof data.timeLabel === "string" ? data.timeLabel : "",
    bookedByUid: typeof data.bookedByUid === "string" ? data.bookedByUid : "",
    createdAt: data.createdAt,
  };
}

export async function createAppointment({
  profile,
  phone,
  message,
  propertyAddress,
  purpose,
  selectedDate,
  selectedTime,
}: CreateAppointmentInput) {
  const { db } = assertFirebaseConfigured();
  const dateKey = formatDateKey(selectedDate);
  const slotId = createSlotId(dateKey, selectedTime);
  const slotRef = doc(db, "appointmentSlots", slotId);
  const appointmentRef = doc(db, "appointments", slotId);

  const payload: Omit<AppointmentRecord, "id" | "createdAt"> = {
    slotId,
    dateKey,
    timeLabel: selectedTime,
    purpose,
    status: "scheduled",
    agentName: "Fahad",
    clientUid: profile.uid,
    clientName: profile.fullName,
    clientEmail: profile.email,
    clientPhone: phone.trim(),
    propertyAddress: propertyAddress.trim(),
    message: message.trim(),
  };

  await runTransaction(db, async (transaction) => {
    const existingSlot = await transaction.get(slotRef);

    if (existingSlot.exists()) {
      throw new AppointmentSlotConflictError();
    }

    transaction.set(slotRef, {
      dateKey,
      timeLabel: selectedTime,
      bookedByUid: profile.uid,
      appointmentId: slotId,
      createdAt: serverTimestamp(),
    });

    transaction.set(appointmentRef, {
      ...payload,
      createdAt: serverTimestamp(),
    });
  });

  return {
    id: slotId,
    ...payload,
  } satisfies AppointmentRecord;
}

export function subscribeToUserAppointments(
  userId: string,
  onChange: (appointments: AppointmentRecord[]) => void,
) {
  const { db } = assertFirebaseConfigured();

  return onSnapshot(
    query(collection(db, "appointments"), where("clientUid", "==", userId)),
    (snapshot) => {
      const appointments = snapshot.docs
        .map(mapAppointment)
        .sort(compareAppointments);

      onChange(appointments);
    },
  );
}

export function subscribeToDateSlots(
  dateKey: string,
  onChange: (slots: AppointmentSlotRecord[]) => void,
) {
  const { db } = assertFirebaseConfigured();

  return onSnapshot(
    query(collection(db, "appointmentSlots"), where("dateKey", "==", dateKey)),
    (snapshot) => {
      onChange(snapshot.docs.map(mapSlot));
    },
  );
}
