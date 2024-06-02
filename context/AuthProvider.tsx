"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

import { BASEURL } from "@/constant/constant";
import { IActivityRequestDataProps } from "@/types/activity/activity.types";

interface AuthContextProps {
  userInfo: userContextData | null;
  setUserInfo: (userInfo: userContextData | null) => void;
  isActivated: boolean | null;
  setIsActivated: (isPublicView: boolean) => void;
  fetchUserInfo: () => Promise<void>;
  userActivites: IActivityRequestDataProps[];
  activites: IActivityRequestDataProps[];
  getActivites: () => Promise<void>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

interface userContextData {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  branch: string;
  phone: string;
  email: string;
  token: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // _Router
  const router = useRouter();
  const pathName = usePathname();

  // _State
  const [userInfo, setUserInfo] = useState<userContextData | null>(null);
  const [isActivated, setIsActivated] = useState<boolean | null>(null);
  const [activites, setActivites] = useState<IActivityRequestDataProps[]>([]);
  const [userActivites, setUserActivites] = useState<
    IActivityRequestDataProps[]
  >([]);
  const [reload, setReload] = useState<boolean>(false);

  // _Action
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/users/me/`);
      setUserInfo(response.data);
      setIsActivated(true);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const getActivites = async () => {
    const response = await axios.get(`${BASEURL}/api/activity/`);

    setActivites(response.data);
  };

  // _Effect
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");

    if (storedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      fetchUserInfo();
      getActivites();
    } else {
      console.error("No token found in Local Storage");
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.role === "Admin" && !pathName.includes("admin")) {
        router.push("/admin/");
      }
      if (userInfo?.role === "Personnel" && !pathName.includes("personnel")) {
        router.push("/personnel/");
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (activites && userInfo) {
      const filterActivity = activites
        .filter((activity) => activity.activityUser == userInfo.id)
        .map((activity) => {
          return activity;
        });
      setUserActivites(filterActivity);
    }
  }, [activites]);

  useEffect(() => {
    if (userInfo) {
      getActivites();
    }
  }, [userInfo]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isActivated,
        setIsActivated,
        fetchUserInfo,
        userActivites,
        activites,
        getActivites,
        reload,
        setReload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a AuthProvider");
  }

  return context;
};
