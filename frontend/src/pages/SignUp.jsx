import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

function SignUp({setLogin, login}) {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [hideShow, setHideShow] = useState(false);
  const [cnfmHideShow, setCnfmHideShow] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  console.log(API_URL);

   useEffect(() => {
    if (login) {
      navigate("/");
    }
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
          const res = await axios.post(`${API_URL}/api/signup`, signupForm);
    if (res.data.success) {
      document.cookie = "token="+res.data.token
      localStorage.setItem("login", signupForm.email);
        setLogin(true); // Update state immediately
        navigate("/");
      // alert(res.data.msg);
      toast.success(res.data.msg);
    } else {
      toast.error(res.data.msg);
      // alert(res.data.msg);
    }
  }catch (err) {
    toast.error(err.response);
  // alert(err.response.data.msg);
}
  };

  return (
    <div className="max-w-xl bg-white rounded-lg shadow-lg mt-16 m-auto p-8">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold">Signup</h1>
        </div>
        <div>
          <label className="text-sm mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="p-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            type="name"
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={handleInput}
            value={signupForm.name}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm mb-2">
            Email
          </label>
          <input
            className="p-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleInput}
            value={signupForm.email}
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm mb-2">
            Password
          </label>
          <div className="relative">
            <input
              className="p-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
              type={hideShow ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleInput}
              value={signupForm.password}
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

        <div>
          <label htmlFor="confirm_password" className="text-sm mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              className="p-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
              type={cnfmHideShow ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              placeholder="Enter your confirm password"
              onChange={handleInput}
              value={signupForm.confirm_password}
            />
            <button
              type="button"
              className="block text-blue-600 hover:text-blue-700 absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setCnfmHideShow(!cnfmHideShow)}
            >
              {cnfmHideShow ? "hide" : "show"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            type="submit"
          >
            Signup
          </button>
        </div>
        <div className="flex items-center justify-center text-gray-500">
          Already have account?{" "}
          <Link
            className="text-blue-600 hover:text-blue-700 hover:underline"
            to="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
