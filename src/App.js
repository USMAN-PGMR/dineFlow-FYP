import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Routes from './pages/Routes'
import './config/global'
import './App.scss';
import './config/productData';
import AuthContextProvider from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import CartContextProvider from './context/CartContext';
// import CartContext from './context/CartContext';

function App() {
  return (
    <>
    <AuthContextProvider>
      <CartContextProvider>


    <BrowserRouter>
    <Routes/>
    <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </BrowserRouter>
        </CartContextProvider>
    </AuthContextProvider>
    </>
  );
}

export default App;
