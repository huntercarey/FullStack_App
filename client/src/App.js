import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      newMessage: null
    };

  }

  componentDidMount() {
    this.getDataFromDB();
    // setInterval(this,this.getDataFromDB, 1000);
  }

  getDataFromDB = () => {
    axios({
      url: 'http://localhost:3001/api/getData',
      method: 'GET'
    }).then((response) => {
      console.log(response);
      //Update our state with the data from the backend
      this.setState({ data: response.data.data });
    }).catch((error) => {
      console.log(error);
    })
  };

  postDataToDb = message => {
    //1. Figure out what ID this message needs to have
    //2.Use axios to connect to our API server which will send the data on to our database

    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      idToBeAdded++;
    }


    
    axios({
      url: 'http://localhost:3001/api/postData',
      method: 'POST',
      data: {
        id: idToBeAdded,
        message: message
      }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  };

  deleteFromDB = idToDelete => {
    let objectIdToDelete = null;
    this.state.data.forEach(dat => {
      if (String(dat.id)=== String(idToDelete)) {
        objectIdToDelete =dat.id;
      }
    });
    axios( {
      url: 'http://localhost:3001/api/postData',
      method: 'DELETE',
      data: {
        objectIdToDelete
      }
    }).then((response) => {
      console.log(response);
    }).then((error) => {
      console.log(error);
    });
  }

  renderListItems() {
    //Deconstructing the data from our state object
    const { data }= this.state;

    if (data.length === 0) {
      return 'NO DB ENTRIES YET';
    } else {
      return data.map(dat => (
        <li key={dat}>
          <span> id: {dat.id} </span>
          <br />
          <span> message: {dat.message} </span>
        </li>
      ));
    }
  }

  render() {
    return (
      <div>
        {/* this will display the data that we retrieve from the database */}
        <ul>
      {this.renderListItems()}
        </ul>

        <div>
          <input type='text'
          placeholder='Add a new message to the database'
          // Whenever the inputs value changes do this
          onChange = {event => this.setState({ message: event.target.value})}
          />
          <button onClick = {() => this.postDataToDb(this.state.message)}>ADD</button>
        </div>

        <div>
          <input type='text' placeholder='Enter ID of Item to Delete' onChange={event => this.setState({
            idToDelete: event.target.value})} />
          <button>DELETE</button>
        </div>


        <div>
          <input />
          <button>UPDATE</button>
        </div>

        <div>
          <input />
        </div>

      </div>
    );
  }
}


export default App;
