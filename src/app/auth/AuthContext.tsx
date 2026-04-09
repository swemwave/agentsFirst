import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { assertFirebaseConfigured, firebaseConfigError } from "../lib/firebase";
import { type AppRole, type UserProfile } from "./types";

interface SignUpInput {
  email: string;
  password: string;
  fullName: string;
  role: Exclude<AppRole, "admin">;
}

interface SignInInput {
  email: string;
  password: string;
  access: "client" | "admin";
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  configError: string | null;
  signUp: (input: SignUpInput) => Promise<UserProfile>;
  signIn: (input: SignInInput) => Promise<UserProfile>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function toUserProfile(uid: string, data: Record<string, unknown>, fallbackEmail: string) {
  const role = data.role;

  return {
    uid,
    email: typeof data.email === "string" ? data.email : fallbackEmail,
    fullName: typeof data.fullName === "string" ? data.fullName : "",
    role: role === "admin" || role === "seller" ? role : "buyer",
    createdAt: data.createdAt,
  } satisfies UserProfile;
}

async function fetchUserProfile(uid: string, fallbackEmail: string, attempts = 4) {
  const { db } = assertFirebaseConfigured();

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const snapshot = await getDoc(doc(db, "users", uid));

    if (snapshot.exists()) {
      return toUserProfile(snapshot.id, snapshot.data(), fallbackEmail);
    }

    if (attempt < attempts - 1) {
      await sleep(250 * (attempt + 1));
    }
  }

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(!firebaseConfigError);

  useEffect(() => {
    if (firebaseConfigError) {
      setLoading(false);
      return undefined;
    }

    const { auth } = assertFirebaseConfigured();
    let isActive = true;

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      if (!isActive) {
        return;
      }

      setLoading(true);
      setUser(nextUser);

      if (!nextUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const nextProfile = await fetchUserProfile(
          nextUser.uid,
          nextUser.email ?? "",
        );

        if (!isActive) {
          return;
        }

        setProfile(nextProfile);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      configError: firebaseConfigError,
      async signUp({ email, password, fullName, role }) {
        const normalizedEmail = normalizeEmail(email);
        const trimmedName = fullName.trim();
        const { auth, db } = assertFirebaseConfigured();

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          normalizedEmail,
          password,
        );

        try {
          await updateProfile(userCredential.user, {
            displayName: trimmedName,
          });

          await setDoc(doc(db, "users", userCredential.user.uid), {
            fullName: trimmedName,
            email: normalizedEmail,
            role,
            createdAt: serverTimestamp(),
          });
        } catch (error) {
          await deleteUser(userCredential.user).catch(() => undefined);
          throw error;
        }

        const nextProfile: UserProfile = {
          uid: userCredential.user.uid,
          email: normalizedEmail,
          fullName: trimmedName,
          role,
        };

        setUser(userCredential.user);
        setProfile(nextProfile);

        return nextProfile;
      },
      async signIn({ email, password, access }) {
        const normalizedEmail = normalizeEmail(email);
        const { auth } = assertFirebaseConfigured();

        const userCredential = await signInWithEmailAndPassword(
          auth,
          normalizedEmail,
          password,
        );

        const nextProfile = await fetchUserProfile(
          userCredential.user.uid,
          normalizedEmail,
        );

        if (!nextProfile) {
          await firebaseSignOut(auth);
          throw new Error(
            "Your account exists in Firebase Auth, but its profile is missing in Firestore.",
          );
        }

        if (access === "admin" && nextProfile.role !== "admin") {
          await firebaseSignOut(auth);
          throw new Error("This account is not authorized for the admin console.");
        }

        if (access === "client" && nextProfile.role === "admin") {
          await firebaseSignOut(auth);
          throw new Error("Admin accounts must sign in using the Admin Account option.");
        }

        setUser(userCredential.user);
        setProfile(nextProfile);

        return nextProfile;
      },
      async signOut() {
        if (firebaseConfigError) {
          setUser(null);
          setProfile(null);
          return;
        }

        const { auth } = assertFirebaseConfigured();
        await firebaseSignOut(auth);
        setUser(null);
        setProfile(null);
      },
    }),
    [loading, profile, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return value;
}
