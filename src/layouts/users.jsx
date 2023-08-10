import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const UsersPage = () => {
  const { userId, edit } = useParams();
  const { currentUser } = useAuth();
  return (
    <>
    <UserProvider>
      {userId ? edit ? (userId === currentUser._id ? <EditUserPage /> : <Redirect to={`/users/${currentUser._id}/edit`} />) : <UserPage id={userId}/> : <UsersListPage />}
    </UserProvider>
    </>
  );
};

export default UsersPage;
