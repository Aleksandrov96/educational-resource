import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase.config';
import Loader from '@/components/common/Loader/Loader';

type Props = {
  children: React.ReactElement | JSX.Element | JSX.Element[] | null,
};

function PrivateRoute({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        navigate('/');
      }
    });
  });

  if (loading) {
    return (
      <Loader />
    );
  } return (
    <div>
      {children}
    </div>
  );
}

export default PrivateRoute;
