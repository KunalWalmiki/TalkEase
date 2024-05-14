import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/store.js";
import { Provider } from 'react-redux';
import {Toaster} from "react-hot-toast"
// import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Provider store={store}>
    <Toaster/>
    {/* <ChakraProvider> */}
    <App />
    {/* </ChakraProvider> */}
    </Provider>
    </BrowserRouter>
)
