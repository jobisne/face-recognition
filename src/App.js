import React, { Component } from "react";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Profile from "./components/Profile/Profile";

import Rank from "./components/Rank/Rank";

import "./App.css";


const partclesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: 'signin',
  isSignIn: false,
  user:{
    id: '',
    name:'',
    email: '',
    entries: '',
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }
calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  // console.log(width, height, clarifaiFace)
  return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  // console.log(box)
  this.setState({ box: box})
}
  onChangeInput = (event) => {
    this.setState({ input: [event.target.value] });
  };

  onPictureSubmit = () => {
    console.log("ok");
    this.setState({imageUrl: this.state.input})
    fetch('https://blooming-tundra-23277.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://blooming-tundra-23277.herokuapp.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => this.setState({ user: Object.assign(this.state.user, {entries: count})}))
        .catch(err => console.log)
      }
      

      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    
    .catch(err => console.log(err))
  };

  onRouteChange =(route) => {
    if (route === 'home'){
      this.setState({isSignIn : true})
    } else if (route === 'signin'){
      this.setState(initialState)
    } else if(route === 'profile'){
      this.setState({ isSignIn : true})
    }
    this.setState({route: route});
  }

  loadUser = (userInfo) => {
    this.setState({ user: {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      entries: userInfo.entries,
      joined: userInfo.joined
    }})
  }
  render() {
    return (
      <div className='App' >
        <Particles className="particles" params={partclesOptions} />
        <Navigation isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
          ?(
            <div>
              <Profile  userInfo={this.state.user} />
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm
                onChangeInput={this.onChangeInput}
                onPictureSubmit={this.onPictureSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}  />
            </div>
          )  
            :(
              this.state.route === 'signin'
              ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

            )
          
          } 
           </div>
    );
  }
}

export default App;

