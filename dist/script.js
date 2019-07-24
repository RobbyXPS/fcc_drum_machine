//dependencies
const { Provider } = ReactRedux;

//single button component receiving props from parent component
class DrumButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { id: this.props.btClipName, onClick: this.props.btClicked, class: "drum-pad" },
      React.createElement("audio", { id: this.props.btKeyChar, src: this.props.btUrl, class: "clip" }), this.props.btKeyChar));


  }}


//main component to hold state, buttons, and current clip
class DrumConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_clip_name: "Press a key or button to start jammin",
      buttonInfo: [
      {
        "keyChar": "Q",
        "clipName": "Heater-1",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },

      {
        "keyChar": "W",
        "clipName": "Heater-2",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },

      {
        "keyChar": "E",
        "clipName": "Heater-3",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },

      {
        "keyChar": "A",
        "clipName": "Heater-4",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },

      {
        "keyChar": "S",
        "clipName": "Heater-6",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },

      {
        "keyChar": "D",
        "clipName": "Dsc_Oh",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },

      {
        "keyChar": "Z",
        "clipName": "Kick_n_Hat",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },

      {
        "keyChar": "X",
        "clipName": "RP4_KICK_1",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },

      {
        "keyChar": "C",
        "clipName": "Cev_H2",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }] };



    this.handlePress = this.handlePress.bind(this);
    this.playSound = this.playSound.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  //add/remove listener for key presses
  componentDidMount() {
    document.addEventListener('keydown', this.handlePress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePress);
  }

  //each keypress produces a keydown event with a keycode, if that matches any known keycodes in our list then play it's sound
  handlePress(event) {
    //use .find to look up the first object that shares a keyChar with the pressed button event
    const currentButton = this.state.buttonInfo.find(item => item.keyChar == event.key.toUpperCase());
    //use the handleAction method to play the sound
    this.handleAction(currentButton.keyChar, currentButton.clipName);
  }

  //set clip name and play sound when button\key is clicked\pressed
  handleAction(keyChar, clipName) {
    this.setState({ current_clip_name: clipName });
    this.playSound(keyChar);
  }

  //search for the audio element via ID in the DOM that matches the key char value and play it's clip
  playSound(keyChar) {
    const clip = document.getElementById(keyChar);
    clip.play();
  }

  //map through the list of button info and generate a new button for each
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "drum-machine" },
      this.state.buttonInfo.map((item) =>
      React.createElement(DrumButton, {
        btClipName: item.clipName,
        btKeyChar: item.keyChar,
        btUrl: item.url,
        btClicked: () => this.handleAction(item.keyChar, item.clipName) }))),



      React.createElement("div", { id: "display" }, "Current Beat: ", this.state.current_clip_name)));


  }}


//container app
class App extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement(DrumConsole, null)));


  }}


//render container app to the DOM
ReactDOM.render(
React.createElement(Provider, null,
React.createElement(App, null)),
document.getElementById('root'));