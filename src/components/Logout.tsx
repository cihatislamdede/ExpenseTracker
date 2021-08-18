import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { logOut } from "../actions/userActions";
import { AppState } from "../store";

function Logout() {
  const { data } = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, []);

  if (!data.username) return <Redirect to="/login" />;

  return <div>Logging out...</div>;
}

export default Logout;