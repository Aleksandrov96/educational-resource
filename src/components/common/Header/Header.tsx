import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminControl from '../AdminControl/AdminControl';
import signOutFirebase from '@/utils/signOutFirebase';
import { UserContext } from '@/components/app/context/UserContext';
import logo from '@/images/logo.png';
import user_img from '@/images/user.png';
import './header.scss';

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const { user } = useContext(UserContext);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeDropdown = (): void => {
      if (open && dropdownRef.current) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', closeDropdown);

    return () => document.body.removeEventListener('click', closeDropdown);
  });

  return (
    <header>
      <div className="headerLogo">
        <Link className="title" to="/main">
          <img src={logo as string} className="title__logo" alt="Logo" />
          Education
        </Link>
      </div>
      <div className="wrapper">
        <div
          className="avatar"
          aria-hidden="true"
          ref={dropdownRef}
          aria-controls="div-to-be-edited"
          onClick={() => setOpen(!open)}
        >
          <img src={user?.photoURL || user_img as string} alt="UserAvatar" />
        </div>
      </div>
      {open
      && (
        <div className="dropdown">
          <AdminControl>
            <Link to="/admin" className="dropdown__item">Admin account</Link>
          </AdminControl>
          <Link to="/account" className="dropdown__item">Account</Link>
          <button
            className="dropdown__signOut"
            type="button"
            onClick={() => {
              signOutFirebase();
              navigate('/');
            }}
          >
            Sign out
          </button>

        </div>
      )}
    </header>
  );
}

export default Header;
