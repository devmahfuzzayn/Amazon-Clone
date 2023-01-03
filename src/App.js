import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
    "pk_test_51LyUP7GGWvfBrLs7QCR5auscRNRj3lL70wMQ0MXD5rO4wPEQGLI9LN9PuUUVt72DyatteZF49lzG1Cf0nNAzjstI00FMOUcroE"
);

function App() {
    const [{}, dispatch] = useStateValue();
    useEffect(() => {
        // will only run once when the app componenet loads...
        auth.onAuthStateChanged((authUser) => {
            // Signed IN User Information
            // console.log("THE USER IS >>> ", authUser);

            if (authUser) {
                // the user just logged in / the user was logged in
                dispatch({
                    type: "SET_USER",
                    user: authUser,
                });
            } else {
                // the user is logged out
                dispatch({
                    type: "SET_USER",
                    user: null,
                });
            }
        });
    }, []);

    return (
        // BEM
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/orders" element={[<Header />, <Orders />]} />
                    <Route path="/login" element={[<Login />]} />
                    <Route
                        path="/checkout"
                        element={[<Header />, <Checkout />]}
                    />
                    <Route
                        path="/payment"
                        element={[
                            <Header />,
                            <Elements stripe={promise}>
                                <Payment />
                            </Elements>,
                        ]}
                    />
                    <Route path="/" element={[<Header />, <Home />]} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
