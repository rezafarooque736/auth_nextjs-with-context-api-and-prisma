"use client"

import { useState } from "react";
import styles from "./page.module.css";
import { createUserApi } from "@/services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserApi(name, email, password);
  }

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>)
}