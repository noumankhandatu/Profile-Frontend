import { Provider } from "react-redux";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <AppRoutes />
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
