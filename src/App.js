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
      <h2>POST Request: </h2>
       <PostRequestForm />  
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
      url: "https://sts.tradoc.army.mil/adfs/oauth2/authorize?response_type=id_token&scope=openid&client_id=c603cd5b-fc77-441f-8156-ba8adc29f83b&state=QeSNiWqq6s0wwfDDrjBpxhlkGws&redirect_uri=https%3A%2F%2Foedata.tradoc.army.mil%2Fsecure%2Fredirect_uri&nonce=2qwPs4sWKUGjrt89CP3zCBe-uH1Jg-Oc0dWPTquAm5Y&response_mode=form_post&client-request-id=696d9edc-2af7-4f91-7902-0080000000fa&RedirectToIdentityProvider=AD+AUTHORITY\r\n",
      resp: 'No response yet',
      resp_headers: 'no headers'
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
      { 
        headers: {
          'Content-Type': 'application/json'
          },
        withCredentials: false
      }
     ).then(function (response) {
      console.log(response.data)
      self.setState({resp: JSON.stringify(response.data)})
      self.setState({resp_headers: JSON.stringify(response.headers)})
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
            
          <textarea rows="8" cols="80" value={this.state.url} onChange={this.handleChange} />
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div>
          <h2> Response: </h2>
          {this.state.resp}
          <h2> Headers: </h2>
          {this.state.resp_headers}
        </div>
      </div>
    );
  }
}




class PostRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://sts.tradoc.army.mil/adfs/oauth2/authorize?response_type=id_token&scope=openid&client_id=c603cd5b-fc77-441f-8156-ba8adc29f83b&state=QeSNiWqq6s0wwfDDrjBpxhlkGws&redirect_uri=https%3A%2F%2Foedata.tradoc.army.mil%2Fsecure%2Fredirect_uri&nonce=2qwPs4sWKUGjrt89CP3zCBe-uH1Jg-Oc0dWPTquAm5Y&response_mode=form_post&client-request-id=696d9edc-2af7-4f91-7902-0080000000fa&RedirectToIdentityProvider=AD+AUTHORITY\r\n",
      data: '{\n"name": "value",\n"name2": "value2"\n}',
      resp: 'No response yet'
    };

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }
  
  handleDataChange(event) {
    this.setState({data: event.target.value});
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

    var body = this.state.data.replace(/(\r\n|\n|\r)/gm, "")

    var jsonBody = JSON.parse(body)
    console.log(jsonBody)

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      "accept": "*/*"
    }

    axios({
      method: 'post',
      url: 'https://postman-echo.com/post',
      headers: headers,
      data: jsonBody
     }).then(function (response) {
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
            
          <textarea id="url" rows="8" cols="80" value={this.state.url} onChange={this.handleUrlChange} />
          <p>Data:</p>
          <textarea id="data" rows="8" cols="80" value={this.state.data} onChange={this.handleDataChange} />
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
