import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainerWrapper() {
    return (
      <ToastContainer
        autoClose={1000}
        hideProgressBar={true}
        pauseOnHover={false}
      ></ToastContainer>
    );
  }