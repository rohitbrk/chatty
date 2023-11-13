import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import UserInfoProvider from "./context/UserInfoContext.tsx";
import Suggestions from "./components/Suggestions.tsx";
import Resources from "./components/Resources.tsx";

const Index = () => {
  return (
    <BrowserRouter>
      <UserInfoProvider>
        <div className="flex">
          <div className="basis-1/4 hidden md:flex">
            <Suggestions />
          </div>
          <div className="sm:basis-1 lg:basis-1/2">
            <App />
          </div>
          <div className="basis-1/4 hidden md:flex">
            <Resources />
          </div>
        </div>
      </UserInfoProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Index />);
