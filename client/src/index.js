import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import 'rc-drawer/assets/index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "aos/dist/aos.css";
import "aos";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
  
