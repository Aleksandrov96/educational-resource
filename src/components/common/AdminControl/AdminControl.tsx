import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase.config';
import setToastError from '@/utils/setToastError';

type Props = {
  children: JSX.Element | JSX.Element[];
};

function AdminControl({ children }: Props) {
  const [isAdmin, setIsAdmin] = useState<string | number | object | undefined>();

  useEffect(() => {
    const getClaims = async () => {
      const claims = auth.currentUser?.getIdTokenResult()
        .then((idTokenResult) => idTokenResult.claims.admin)
        .catch((error: Error) => setToastError(error.message));

      await claims?.then((res) => setIsAdmin(res))
        .catch((error: Error) => setToastError(error.message));
    };
    getClaims()
      .catch((error: Error) => setToastError(error.message));
  }, []);

  if (isAdmin) {
    return (
      <div>{children}</div>
    );
  }
  return null;
}

export default AdminControl;
