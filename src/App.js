import React, { Component } from 'react';
import Snake from './snake'
import './App.css';
class App extends Component{
  new=()=>{
    window.location.reload()
  }
  render() {
    return (
      
        <div className="conatiner">
        <div className="row">
        <div className="col s12">
        <Snake/>
        </div>
        </div>
        </div>

      
    )
  }
}
export default App;