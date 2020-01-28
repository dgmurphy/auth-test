import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <div> 
        <h1>Auth Test App </h1>
      </div>
      <br />
      <h2>GET Request: </h2>
        <GetRequestForm />      
      
    </div>
  );
}


function parseQuery(queryString) {
    var query = {}
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
    
}

class GetRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://dog.ceo/api/breeds/list/all?name=bruno",
      resp: 'No response yet'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {

    // text area content: this.state.url
    //var qlist = this.state.url.split('?')
    //var params = parseQuery(qlist[1])
     
    this.getDataAxios(this.state.url)
    event.preventDefault();
  }

  getDataAxios(url){

    var self = this 
    axios.get(url,
      { headers: {
        'Content-Type': 'application/json'
        } 
      }
     ).then(function (response) {
      console.log(response.data)
      self.setState({resp: JSON.stringify(response.data)})
     })
    .catch(function (error) {
      // handle error
      self.setState({resp: JSON.stringify(error)})
    })

  }



  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            
          <textarea rows="5" cols="50" value={this.state.url} onChange={this.handleChange} />
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div>
          <h2> Response: </h2>
          {this.state.resp}
        </div>
      </div>
    );
  }
}



export default App;
