import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { User } from "@/types";
import React, { createContext, useEffect, useState } from "react";
interface IAuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
  refetchUser: () => void;
  login: (userData: User) => void;
  logOut: () => void;
}
export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error, refetch } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
  });
  console.log(data);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (data?.data) setUser(data?.data);
    else setUser(null);
  }, [data]);

  const login = (userData: any) => setUser(userData);
  const logOut = () => setUser(null);

  const userInfo = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    refetchUser: refetch,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};
