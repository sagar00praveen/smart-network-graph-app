import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Register from "./Register";
import Recommend from "./Recommend";
import Search from "./Search";
import GraphView from "./GraphView";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        
        {/* 🏠 HOME / COVER PAGE */}
        {page === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.cover}
          >
            <h1 style={styles.title}>Lokachakra</h1>

            <div style={styles.buttonGroup}>
              <button onClick={() => setPage("register")}>Register</button>
              <button onClick={() => setPage("recommend")}>Recommend</button>
              <button onClick={() => setPage("search")}>Search</button>
              <button onClick={() => setPage("graph")}>Graph</button>
            </div>
          </motion.div>
        )}

        {/* 📄 PAGES */}
        {page !== "home" && (
          <motion.div
            key={page}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={styles.page}
          >
            <button onClick={() => setPage("home")} style={styles.backBtn}>
              ← Back
            </button>

            {page === "register" && <Register />}
            {page === "recommend" && <Recommend />}
            {page === "search" && <Search />}
            {page === "graph" && <GraphView />}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

const styles = {
  cover: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    // 🎨 Gradient background like your image
    background:
      "radial-gradient(circle at 30% 30%, #ff80b5, transparent), radial-gradient(circle at 70% 70%, #80d0ff, transparent), #111",

    color: "#fff",
    textAlign: "center",
  },

  title: {
    fontSize: "64px",
    fontWeight: "bold",
    marginBottom: "30px",
  },

  buttonGroup: {
    display: "flex",
    gap: "15px",
  },

  page: {
    height: "100vh",
    width: "100%",
    padding: "20px",
    background: "#020617",
    color: "#fff",
  },

  backBtn: {
    marginBottom: "20px",
    padding: "8px 12px",
    border: "none",
    background: "#38bdf8",
    color: "#fff",
    cursor: "pointer",
  },
};