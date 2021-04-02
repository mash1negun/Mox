import React from 'react';
import NaviBar from '../Components/NaviBar';
import Jumbo from '../Components/Jumbo';
import { Helmet } from "react-helmet-async";

function Start() {
    return (
      <>
          <NaviBar />
          <Helmet>
            <title>Добро пожаловать! | Mox</title>
          </Helmet>
          <Jumbo />
      </>
    );
  }
  
  export default Start;