import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import UserInfoProvider from "./context/UserInfoContext.tsx";
import { useState, useEffect } from "react";
import Error from "./components/Error.tsx";
import Nav from "./components/Nav.tsx";
import svgs from "./utils/svgs.tsx";
import Suggestions from "./components/Suggestions.tsx";

const Index = () => {
  const [suggestions, setSuggestions] = useState({});
  const [err, setErr] = useState({ error: false, msg: "" });

  useEffect(() => {
    const getSuggestions = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "room");
      const data = await response.json();
      setSuggestions(data);
    };
    getSuggestions();
  }, []);

  if (err.error) return <Error msg={err.msg} />;

  return (
    <BrowserRouter>
      <UserInfoProvider>
        <Nav />
        <div className="flex">
          <div className="basis-1/4 hidden md:flex">
            <Suggestions
              name="Popular Rooms"
              items={suggestions.popularRooms}
              svg={svgs.room}
              button={true}
            />
          </div>
          <div className="sm:basis-1 lg:basis-1/2">
            <App setErr={setErr} />
          </div>
          <div className="basis-1/4 hidden md:flex">
            <Suggestions
              name="Tips"
              items={suggestions.tips}
              svg={svgs.tips}
              button={false}
            />
          </div>
        </div>
      </UserInfoProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Index />);
