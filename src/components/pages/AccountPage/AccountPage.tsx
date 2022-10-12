import React, { useContext } from 'react';
import Header from '@/components/common/Header/Header';
import user_img from '@/images/user.png';
import { UserContext } from '@/components/app/context/UserContext';
import './accountPage.scss';

function AccountPage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Header />
      <div className="accountPage">
        <div className="accountPage__profile">
          <div className="photo">
            <img src={user?.photoURL || user_img as string} alt="Avatar" />
          </div>
          <div className="userData">
            <div className="userData__email">
              {`Email: ${user?.email as string}`}
            </div>
            {user?.displayName ? <div className="userData__username">{`Name: ${user?.displayName}`}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
