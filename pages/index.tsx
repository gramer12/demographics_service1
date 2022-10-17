import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Map from "./Map";

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-red-600">test</div>
      <Map></Map>
    </>
  );
};

export default Home;
