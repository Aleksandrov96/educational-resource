import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestEdit from '@/components/pages/CoursePage/components/TestEdit/TestEdit';
import CoursePage from '@/components/pages/CoursePage/CoursePage';
import MainPage from '@/components/pages/MainPage/MainPage';
import CoursesPage from '@/components/pages/CoursesPage/CoursesPage';
import NoMatchPage from '@/components/pages/NoMatchPage/NoMatchPage';
import QuizPage from '@/components/pages/QuizPage/QuizPage';
import SignInPage from '@/components/pages/SignInPage/SignInPage';
import SignUpPage from '@/components/pages/SignUpPage/SignUpPage';
import AdminAccountPage from '@/components/pages/AdminAccountPage/AdminAccountPage';
import AccountPage from '@/components/pages/AccountPage/AccountPage';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import UserContextProvider from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="main"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
          )}
          />
          <Route
            path="admin"
            element={(
              <PrivateRoute>
                <AdminAccountPage />
              </PrivateRoute>
          )}
          />
          <Route
            path="account"
            element={(
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
          )}
          />
          <Route
            path="admin"
            element={(
              <PrivateRoute>
                <AdminAccountPage />
              </PrivateRoute>
          )}
          />
          <Route
            path="courses"
            element={(
              <PrivateRoute>
                <CoursesPage />
              </PrivateRoute>
          )}
          />
          <Route
            path="courses/:courseId"
            element={(
              <PrivateRoute>
                <CoursePage />
              </PrivateRoute>
          )}
          />
          <Route
            path="courses/:courseId/edit-tests"
            element={(
              <PrivateRoute>
                <TestEdit />
              </PrivateRoute>
            )}
          />
          <Route
            path="tests/:testId"
            element={(
              <PrivateRoute>
                <QuizPage />
              </PrivateRoute>
          )}
          />
          <Route
            path="*"
            element={(
              <PrivateRoute>
                <NoMatchPage />
              </PrivateRoute>
          )}
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
