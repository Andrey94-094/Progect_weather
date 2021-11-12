import { PureComponent } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link,  withRouter } from 'react-router-dom';
import Details from '../Details';
import Header from "../Header";
import Weather from "../Weather";

class App extends PureComponent {
  render() {
    return (
      <Router>
        <main>
          <Link to="/"></Link>
          <Link to="/in/"></Link>
          <Switch>
            <Route exact path="/:id?">
              <Header />
              <Weather />
            </Route>
            <Route exact path="/in/:id?" >
              <Details />
            </Route>
          </Switch>
        </main>
      </Router>
    )
  }
}


export default withRouter (App);
