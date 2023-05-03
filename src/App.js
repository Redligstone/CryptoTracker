import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Home from "./pages/home";
// import CoinPage from "./pages/coins";

const CoinPage = React.lazy(() => import("./pages/coins"))

function App() {
 
  return (
    <HashRouter>
      <div className='app'>
        <Header className='header__element'/>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/coins/:id" element={
            <Suspense fallback={<div>Loading</div>}>
            <CoinPage/>
          </Suspense>
          }/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
