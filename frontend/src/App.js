import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Signup from "./screens/Signup";
import Orders from "./screens/Orders";
import { CardProvider } from "./components/ContextReducer";
import { Toaster } from 'sonner';
function App() {
  return (
    <CardProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/createuser" element={<Signup />}></Route>
          <Route exact path="/myOrderData" element={<Orders />}></Route>
        </Routes>
        <Toaster position="top-center" richColors="true"/> 
      </Router>
    </CardProvider>
  );
}

export default App;
