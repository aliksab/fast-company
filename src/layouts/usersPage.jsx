import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import Users from "../components/users";

const UsersPage = () => {
  const { userId } = useParams();

  return (
    <>
      {userId ? <UserPage id={userId}/> : <Users />}
    </>
  );
};

export default UsersPage;
