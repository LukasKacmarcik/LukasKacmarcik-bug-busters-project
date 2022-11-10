import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllItems } from "../../Redux/slices/items";

export default function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div style={{ paddingBottom: "40px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
