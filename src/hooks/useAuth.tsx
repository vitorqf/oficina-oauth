import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
  session: any;
  user: any;
  isLoading?: boolean;
  signIn: () => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signIn: () => {
    console.error("no AuthContext provided");
  },
});

const REDIRECT_URL = process.env.NEXT_PUBLIC_SOCIAL_REDIRECT_URL || "";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  const signIn = () => {
    router.push(`/api/auth/signin?redirect_uri=${REDIRECT_URL}`);
  };

  useEffect(() => {
    const cookieSession = getCookie("session");
    if (!cookieSession) return;
    const decodedSession = decodeURIComponent(cookieSession);
    const parsedSession = JSON.parse(decodedSession);
    setSession(parsedSession.session);
    setUser(parsedSession.user);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, signIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
