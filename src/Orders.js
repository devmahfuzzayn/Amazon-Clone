import React, { useState, useEffect } from "react";
import {
    setDoc,
    doc,
    collection,
    query,
    getDocs,
    orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            const getData = async () => {
                const q = query(
                    collection(db, `users/${user?.uid}/orders`),
                    orderBy("created", "desc")
                );
                const snapshot = await getDocs(q);
                const data = setOrders(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            };

            getData();

            // Sonny's Code
            // db.collection("users")
            //     .doc(user?.uid)
            //     .collection("orders")
            //     .ordeBy("created", "desc")
            //     .onSnapshot((snapshot) => {
            //         setOrders(
            //             snapshot.docs.map((doc) => ({
            //                 id: doc.id,
            //                 data: doc.data(),
            //             }))
            //         );
            //     });
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="order__order">
                {orders?.map((order) => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    );
}

export default Orders;
