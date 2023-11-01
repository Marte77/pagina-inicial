import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivacyPolicy } from './components/privacy/privacy';
import { AppAds } from './components/app-ads/appads';
import { Blog } from './components/blog/blog';
const root = ReactDOM.createRoot(document.getElementById('root')!);

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/privacy',
    element:<PrivacyPolicy/>
  },
  {
    path:'/app-ads2.txt',
    element:<AppAds/>
  },
  {
    path:'/blog',
    element:<Blog/>
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
