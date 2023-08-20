import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UsersLoader from "../components/ui/hoc/userLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const UsersPage = () => {
  const { userId, edit } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
    <UsersLoader>
      {userId ? edit ? (userId === currentUserId ? <EditUserPage /> : <Redirect to={`/users/${currentUserId}/edit`} />) : <UserPage id={userId}/> : <UsersListPage />}
    </UsersLoader>
    </>
  );
};

export default UsersPage;
