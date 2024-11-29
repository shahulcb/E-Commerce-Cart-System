import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import useUserRoutes from "./components/routes/userRoutes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authContext";
import { CartProvivder } from "./context/cartContext";
import { OrderProvider } from "./context/orderContext";

function App() {
  const userRoutes = useUserRoutes();
  return (
    <AuthProvider>
      <CartProvivder>
        <OrderProvider>
          <Router>
            <Toaster />
            <div className="bg-stone-100">
              <Header />
              <div className="">
                <Routes>{userRoutes}</Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </OrderProvider>
      </CartProvivder>
    </AuthProvider>
  );
}

export default App;
