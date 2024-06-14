import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInbox, updateReadStatus } from "../store/mailActions";
import { useEffect } from "react";

// import { useEffect } from "react";
// import { fetchInbox } from "../store/mailActions";

const Inbox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInbox());
  }, [dispatch]);

  const data = useSelector((state) => state.mail.inboxData);

  const readHandler = (mail) => {
    dispatch(updateReadStatus(mail));
    navigate(`inbox-message/${mail.id}`);
  };

  console.log(data, "inbox data");
  return (
    <ul>
      {data &&
        data.map((item) => (
          <li
            onClick={() => readHandler(item)}
            key={item.id}
            className="flex items-center border-y hover:bg-gray-200 px-2"
          >
            <input
              type="checkbox"
              className="focus:ring-0 border-2 border-gray-400"
            />
            <div className="w-full flex items-center justify-between p-1 my-1 cursor-pointer">
              <div className="flex items-center">
                <div className="flex items-center mr-3 ml-4 space-x-1">
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-700 "></span>
                  )}
                </div>
                <span className="w-56 pr-2 truncate">{item.senderEmail}</span>
                <span className="w-64 truncate">{item.subject}</span>
                <span className="mx-1">-</span>
                <span
                  className="w-96 text-gray-600 text-sm truncate"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></span>
              </div>
              <div className="w-32 flex items-center justify-end">
                <div
                  className="flex items-center space-x-2"
                  style={{ display: "none" }}
                >
                  <button title="Archive">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500 hover:text-gray-900 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                      />
                    </svg>
                  </button>
                  <button title="Delete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500 hover:text-gray-900 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  <button title="Mark As Unread">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500 hover:text-gray-900 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button title="Snooze">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500 hover:text-gray-900 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-gray-500">{item.time}</span>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Inbox;
