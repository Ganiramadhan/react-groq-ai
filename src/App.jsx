import { useState } from "react";
import { requestGroqAi } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set app element for accessibility

const App = () => {
  const [data, setData] = useState("");
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async () => {
    if (!content.value.trim()) {
      setModalMessage("Message cannot be empty!");
      setIsModalOpen(true);
      return;
    }
  
    setLoading(true);
    const ai = await requestGroqAi(content.value);
    setData(ai);
    setShowData(true);
    setLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">GANIPEDIA AI</h1>
        <input
          type="text"
          id="content"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center justify-center w-full"
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="mr-2">Loading...</span>
              <FontAwesomeIcon icon={faSpinner} spin />
            </>
          ) : (
            <>
              <span className="mr-2">Send Message</span>
              <FontAwesomeIcon icon={faPaperPlane} />
            </>
          )}
        </button>
        {showData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mt-4 p-4 bg-gray-200 rounded-lg"
          >
            <SyntaxHighlight language="swift" style={dracula} wrapLongLines={true} >
              {data}
            </SyntaxHighlight>
          </motion.div>
        )}
       <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2>Error</h2>
            <p>{modalMessage}</p>
          </div>
        </Modal>
      </div>
    </main>
  );
};

export default App;
