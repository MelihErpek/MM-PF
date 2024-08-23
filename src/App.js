import Popup from "./Components/Popup";
import Chat from "./Components/Chat";
import gif from "./Components/Back_To_School_Ai_Gif.gif";

const validate = localStorage.getItem("validate");
function App() {
  if (validate === "true") {
    return (
      <div>
        <div className="sm:flex h-screen">
          <img
            className="max-h-screen sm:w-72 w-0"
            src={gif}
            alt="loading..."
          />
          <Chat />
          <img
            className="max-h-screen  sm:w-72 w-0"
            src={gif}
            alt="loading..."
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="sm:flex h-screen">
          <img
            className="max-h-screen sm:w-72 w-0"
            src={gif}
            alt="loading..."
          />
          <Chat />
          <img
            className="max-h-screen  sm:w-72 w-0"
            src={gif}
            alt="loading..."
          />
        </div>
        <Popup />
      </div>
    );
  }
}

export default App;
