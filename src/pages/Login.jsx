import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import usersData from "../datas/users.json";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setuser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loggingUser, setLoggingUser] = useState({});
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const temp = usersData.find((newUser) => newUser.username === user);
    setLoggingUser(temp);
  }, [user]);

  useEffect(() => {
    setUserRoles(loggingUser?.roles);
  }, [loggingUser]);

  console.log("User Roles: ", userRoles);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loggingUser) {
      console.log("User Logged In: ", user, pwd);
      setAuth({ user, pwd, userRoles });
      setuser("");
      setPwd("");
      navigate(from, { replace: true });
    } else {
      console.log("Authentication error");
      setErrMsg("Authentication Error or Please sign up");
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setuser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Sign In</button>
        </form>
        <p>
          Need an account?
          <br />
          <span className="line">
            <Link to={"/register"}>Sign Up</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
