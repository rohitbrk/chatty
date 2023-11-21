import { useContext } from "react";
import { MsgsContext } from "../context/MsgsContext";
import { UserInfoContext } from "../context/UserInfoContext";
import ImageMsg from "./common/ImageMsg";
import VideoMsg from "./common/VideoMsg";
import TextMsg from "./common/TextMsg";

const Msgs = () => {
  const { name } = useContext(UserInfoContext);
  const msgs = useContext(MsgsContext);
  return (
    <>
      <div className="mb-2 flex flex-justify-between">
        <div className="mt-1 fixed rounded-md font-semibold">Messages</div>
      </div>
      <div className="flex flex-col flex-grow h-97 max-h-max overflow-auto md:w-full sm:w-screen w-full border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300">
        {msgs.map((item, index) => {
          if (!item.includes(":")) return item;
          const myArray = item.split(" ");
          const myMsgString = item.substring(item.indexOf(":") + 1);
          let flag = false;

          // flag is true mean the msg is of the sender itself
          if (name === myArray[0].slice(0, -1)) flag = true;

          if (item.includes("data:image/"))
            return <ImageMsg index={index} flag={flag} myArray={myArray} />;

          if (item.includes("data:video/"))
            return <VideoMsg index={index} flag={flag} myArray={myArray} />;

          return (
            <TextMsg
              index={index}
              flag={flag}
              myArray={myArray}
              myMsgString={myMsgString}
            />
          );
        })}
      </div>
    </>
  );
};

export default Msgs;
