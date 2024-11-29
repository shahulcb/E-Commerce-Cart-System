import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import avatar from "./avatar.png";
import { CartContext } from "../../context/cartContext";

const Header = () => {
  const { user, authenticated, logout } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);
  return (
    <div className="w-full bg-white h-16 flex items-center justify-between px-2">
      <div>
        <Link to="/" className="text-lg">
          E-Commerce Cart System
        </Link>
      </div>
      <div className="flex gap-5 text-lg items-center">
        {authenticated && user?.role === "user" && (
          <>
            <Link to="/cart" className="relative">
              <i className="fa fa fa-shopping-cart text-lime-400 text-2xl"></i>
              <p className="absolute -top-1.5 -right-1.5 bg-lime-400 rounded-full w-4 h-4 text-sm flex items-center justify-center border border-white text-white">
                {cartItems?.length}
              </p>
            </Link>
            <Link to="/orders">Orders</Link>
          </>
        )}

        {authenticated && (
          <div className="flex gap-1">
            <img src={avatar} className="h-6 w-6" alt="avatar" />
            <p>{user?.name}</p>
          </div>
        )}
        {authenticated ? (
          <p
            className="text-red-600 cursor-pointer"
            onClick={() => {
              logout();
              clearCart();
            }}
          >
            Logout
          </p>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
