import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import loader from "./assets/loader/loader.gif";
import EmojiMain from "./EmojiSearch/EmojiMain";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <img src={loader} style={{width:"60px"}}  alt="Loading...." />
      </div>
    );
  }

  return (
    <>
      <EmojiMain />
    </>
  );
};

export default App;
