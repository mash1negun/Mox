import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Pages/Home.js';
import Books from './Pages/Books.js';
import Movies from './Pages/Movies.js';
import Start from './Pages/Start.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


function App() {
  return (
    <React.Fragment>
        <Router>
          <Switch>
            <Route path="/Start" component={Start}/>
            <Route path="/Home" component={Home} />
            <Route path="/Books" component={Books} />
            <Route path="/Movies" component={Movies} />
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;

{/* <Route path='/Books' exact={true} component={bookList}/> */}
