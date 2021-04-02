import React, {useEffect} from 'react';
import NaviBarHome from '../Components/NaviBarHome';
import { Helmet } from "react-helmet-async";
import BooksHome from '../Assets/BooksHome.jpg';
import { BrowserRouter as Router, useHistory } from "react-router-dom";

export default function Home() {

  const divStyle = {
    width: '100%',
    height: '900px',
    backgroundImage: `url(${BooksHome})`,
    backgroundSize: 'cover'
  };

  const history = useHistory();

  useEffect(() => {
    var login = window.localStorage.getItem('login');
      if (login === null ) {
        history.replace("/");
      }
  });

  useEffect(() => {
    document.getElementById("bau").className = "book";
  }, []);

    return (
      <>
        <NaviBarHome />
        <Helmet>
          <title>Главная | Mox</title>
        </Helmet>
      </>
    );
  }
  
