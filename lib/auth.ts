import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "./firebase";

type CustomUser = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

type UserState = CustomUser | null;

const userState = atom<UserState>({
  key: "userState",
  default: null,
});

export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  return new Promise(async (resolve) => {
    await signOut(auth);
    resolve();
  });
};

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  // authを監視して変更されていればstate更新
  useEffect(() => {
    console.log("通過");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // FirebaseのUserオブジェクトから必要なデータだけを取り出し
        const safeUser: CustomUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          // 必要に応じて他のプロパティも追加できます
        };
        setUser(safeUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  });

  return isLoading;
};

export const useUser = (): UserState => {
  return useRecoilValue(userState);
};
