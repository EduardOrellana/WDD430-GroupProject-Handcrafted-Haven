//import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import Header from "./ui/header";


export default function Home() {
  return (
    <div className={styles.app}>
      <Header />
    </div>
  );
}
