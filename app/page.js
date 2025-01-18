"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import video from "../Video/10715-226624864.mp4"
// import video from "../public/Video/10715-226624864.mp4";

function HomePage() {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "0 20px",
        backgroundColor: "#f5f5f5",

        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        minHeight: "100vh",
      }}
    >
      
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <Image
          src="/logo.svg"
          width={100}
          height={50}
          alt="Logo"
          style={{ cursor: "pointer" }}
        />
      </header>

      <main style={{ textAlign: "center", marginTop: "50px" }}>
        <h1
          style={{
            fontSize: "3rem", // Adjust size based on requirement
            fontWeight: "900", // Extra bold
            color: "#000", // Black color
            // letterSpacing: "-0.5px", // Slight negative spacing for tighter look
            fontFamily: "'Inter', sans-serif", // Use "Inter" font or similar sans-serif
            marginBottom: "20px",
          }}
        >
          Your Personal AI Interview Coach
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#555",
            maxWidth: "600px",
            margin: "0 auto 30px",
            lineHeight: "1.8",
            // fontStyle: "italic",
          }}
        >
          Double your chances of landing that job offer with our AI-powered
          interview coach. (InterVU)
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Link href="/dashboard">
            <button
              style={{
                padding: "15px 25px",
                fontSize: "16px",
                background: "#007acc",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Get Started →
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
