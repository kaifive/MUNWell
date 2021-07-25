import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const PageNotFound = React.lazy(() => import('./views/pages/page404/Page404'));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" name="Home" render={props => <TheLayout {...props} />} />
            <Route exact path="/dashboard" name="Dashboard" render={props => <TheLayout {...props} />} />
            <Route exact path="/documentation" name="Documentation" render={props => <TheLayout {...props} />} />
            <Route exact path="/settings" name="Settings" render={props => <TheLayout {...props} />} />
            <Route exact path="/registration/registration-data" name="Registration Data" render={props => <TheLayout {...props} />} />
            <Route exact path="/registration/committee-allotments" name="Committee Allotments" render={props => <TheLayout {...props} />} />
            <Route exact path="/registration/payment-invoicing" name="Payment Invoicing" render={props => <TheLayout {...props} />} />
            <Route exact path="/registration/position-invoicing" name="Position Invoicing" render={props => <TheLayout {...props} />} />
            <Route exact path="/committees/committee-roster" name="Committee Roster" render={props => <TheLayout {...props} />} />
            <Route exact path="/committees/:committee" name="Committee Position Assignments" render={props => <TheLayout {...props} />} />
            <Route exact path="/award/:committee" name="Committee Individual Awards" render={props => <TheLayout {...props} />} />
            <Route exact path="/awards/committee-awards" name="Committee Awards" render={props => <TheLayout {...props} />} />
            <Route exact path="/awards/delegation-awards" name="Delegation Awards" render={props => <TheLayout {...props} />} />
            <Route exact path="/awards/participation-awards" name="Participation Awards" render={props => <TheLayout {...props} />} />

            <Route path="*" name="Page 404" render={props => <PageNotFound {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
