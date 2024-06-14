import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInbox } from "../store/mailActions";

const InboxMessage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInbox());
  }, [dispatch]);
  const { id } = useParams();
  const inboxMessageData = useSelector((state) => state.mail.inboxData);
  const messageData = inboxMessageData.filter((message) => message.id === id);
  return (
    <>
      {messageData &&
        messageData.map((message) => (
          <div key={message.id}>
            <h4 className="text-lg text-gray-800 font-bold pb-2 mb-4 border-b-2">
              {message.subject}
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img className="rounded-full w-8 h-8 border border-gray-500" />
                <div className="flex flex-col ml-2">
                  <span className="text-sm font-semibold">{message.img}</span>
                  <span className="text-s text-gray-400">
                    From: {message.senderEmail}
                  </span>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {message.date + " " + message.time}
              </span>
            </div>
            <div className="py-6 pl-2 text-gray-700">
              <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
            </div>
          </div>
        ))}
    </>
  );
};

export default InboxMessage;
