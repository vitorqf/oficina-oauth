import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";
import { Login } from "@/components/Login";
import Head from "next/head";


export default function Home() {
    return (
        <>
            <Head>
                <title>Login - Supera</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Login />
        </>
    );
}