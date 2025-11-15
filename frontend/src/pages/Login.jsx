import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({setLogin}) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [hideShow, setHideShow] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const res = await axios.post(`${API_URL}/api/login`, loginForm);
    if (res.data.success) {
      console.log("login", res.data);
      document.cookie = "token="+res.data.token
      localStorage.setItem("login", loginForm.email);
        setLogin(true); // Update state immediately
        navigate("/");
      alert(res.data.msg);
    } else {
      alert(res.data.msg);
    }
    // alert(loginForm.email);
  }catch (err) {
  alert(err.response.data.msg);
}
  };
  return (
    <>
      <div className="max-w-xl mt-16 m-auto items-center shadow-lg rounded-2xl p-8 bg-white">
        <div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-bold">Login</h1>
            </div>
            <div>
              <label htmlFor="email" className="text-sm mb-2">
                Email
              </label>
              <input
                className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                name="email"
                value={loginForm.email}
                id="email"
                placeholder="Enter your mail"
                onChange={handleInput}
                type="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  name="password"
                  value={loginForm.password}
                  id="password"
                  placeholder="Enter your password"
                  type={hideShow ? "text" : "password"}
                  onChange={handleInput}
                />
                <button
                  type="button"
                  className="block text-blue-600 hover:text-blue-700 absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setHideShow(!hideShow)}
                >
                  {hideShow ? "hide" : "show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="text-center text-gray-600 text-sm">
              Don't have account?{" "}
              <Link
                className="text-blue-600 font-semibold hover:underline"
                to="/signup"
              >
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
