import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from "react-toastify";


export default function Navbar() {
 
  let data=useCart();
  const [cartView ,setCartView]=useState(false);
  const navigate=useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem("authToken")
    navigate("/login")
  }
  const handle=()=>{
   

  }
  return (
    <div>
      <nav
        className="navbar  navbar-expand-lg navbar-dark bg-danger  "
        style={{ padding: "0.01rem 0.5rem" }}
      >
        <div className="container-fluid">
         
          <Link className="navbar-brand  fs-bold fs-1" to="/" >
            TOMATO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 ">
              <li className="nav-item mt-3">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                  onClick={toast.success("clicked")}
                >
                  Home
                </Link>

              </li>
             
              {(localStorage.getItem("authToken"))
                ? 
                  
                    <li className="nav-item mt-3">
                      <Link
                        className="nav-link active fs-5"
                        aria-current="page"
                        to="/myOrderData"
                        
                      > 
                        My Orders
                      </Link>
                    </li>
                  
                : ""}
            </ul>{
              (!localStorage.getItem("authToken"))
                ?
            
            <div className="d-flex">
              <Link className="btn bg-white text-danger mx-2" to="/login">
                Login
              </Link>

              <Link className="btn bg-white text-danger mx-2" to="/createuser">
                SignUp
              </Link>
            </div>
            :<div > <div className="btn bg-white text-danger mx-2 mb-2" onClick={()=>{
              setCartView(true)
              
            }}>
            <ShoppingCartIcon/> Cart{" "} <Badge pill bg='danger'>
              
                {data.length}
              </Badge>
            </div>
            {cartView?<Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null}
            <div className="btn bg-white text-danger mx-2 mb-2" onClick={handleLogout} >
                     <LogoutIcon/> Logout
            </div>
            <div className="btn text-white mb-1 fs-7" onClick={handle}  >
                   <AccountCircleIcon/> {localStorage.getItem("name")}
            </div>
            </div> 
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
