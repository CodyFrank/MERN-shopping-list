import React from 'react'
import AppNavbar from './components/AppNavbar'
import { Provider } from 'react-redux'
import { Container } from 'reactstrap'
import { loadUser } from './actions/authActions'
import ContentContainer from './components/ContentContainer'
import store from './store'
import './App.css';

class App extends React.Component {
  componentDidMount(){
    if (localStorage.getItem('token')){
      store.dispatch(loadUser())
    }
  }
  
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ContentContainer />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
