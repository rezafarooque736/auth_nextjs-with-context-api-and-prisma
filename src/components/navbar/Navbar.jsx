"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/logout");
      const data = await res.json();
      if (data) {
        setUser(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      {!user ? (
        <div className={styles.link}>
          <Link href="/">Register</Link>
          <Link href="/login">Login</Link>
        </div>
      ) : (
        <div className={styles.link}>
          <Link href="/secret">secrert</Link>
          <Link href="/login" onClick={logoutHandler}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
