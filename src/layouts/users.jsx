import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUsers";

const UsersPage = () => {
  const { userId, edit } = useParams();

  return (
    <>
    <UserProvider>
      {userId ? edit ? <EditUserPage /> : <UserPage id={userId}/> : <UsersListPage />}
    </UserProvider>
    </>
  );
};

export default UsersPage;
