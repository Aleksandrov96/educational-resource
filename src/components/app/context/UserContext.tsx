import React, {
  useState, useEffect, createContext, useMemo,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase.config';

type Props = {
  children: React.ReactElement | JSX.Element | JSX.Element[],
};

export const UserContext = createContext<{
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}>({ user: undefined, setUser: () => undefined });

function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(undefined);
      }
    });
  });

  const memoized = useMemo(() => ({
    user, setUser,
  }), [user]);

  return (
    <UserContext.Provider value={memoized}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
