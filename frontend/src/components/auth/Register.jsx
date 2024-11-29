import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../api/axiosInstance";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { setIsCartUpdated } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { name, email, password };
    try {
      const response = await instance.post("/register", postData);
      toast.success("User registered");
      login();
      navigate("/");
      setIsCartUpdated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-[400px] mx-auto mt-20">
      <h1 className="text-3xl mb-5">Register</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="border border-gray-500 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="border border-gray-500 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">password</label>
          <input
            type="password"
            className="border border-gray-500 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-lime-400 text-lg text-white w-full mt-5 h-9 rounded "
        >
          Register
        </button>
      </form>
      <Link to="/login" className="underline text-blue-900">
        already have account
      </Link>
    </div>
  );
};

export default Register;
