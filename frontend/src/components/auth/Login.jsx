import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { instance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { setIsCartUpdated } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { email, password };
    try {
      const response = await instance.post("/login", postData);
      toast.success("Login success");
      login();
      navigate("/");
      setIsCartUpdated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-[400px] mx-auto mt-20">
      <h1 className="text-3xl mb-5">Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="border border-gray-500 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Password</label>
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
          className="bg-lime-400 w-full mt-5 h-9 rounded text-white text-lg"
        >
          Login
        </button>
      </form>
      <Link to="/register" className="underline text-blue-900">
        create an account
      </Link>
    </div>
  );
};

export default Login;
