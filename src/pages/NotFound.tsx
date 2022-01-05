import { Link } from "react-router-dom";

function NotFound() {
    return (
    <div>
      <br/>
      <h1>You shouldn't are here, back to the main page:</h1>
      <Link to="/"><button>Back</button></Link>
  
    </div>);
  }
  
  export default NotFound;