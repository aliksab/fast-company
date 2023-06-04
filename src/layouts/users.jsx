import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";

const UsersPage = () => {
  const { userId, edit } = useParams();

  return (
    <>
      {userId ? edit ? <EditUserPage /> : <UserPage id={userId}/> : <UsersListPage />}
    </>
  );
};

export default UsersPage;
