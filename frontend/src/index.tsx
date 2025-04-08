import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AddStudent from './components/pages/AddStudent';
import EditStudent from './components/pages/EditStudent';
import Classroom from './components/pages/Classroom';
import AddClassroom from './components/pages/AddClassroom';
import EditClassroom from './components/pages/EditClassroom';
import RawQuery from './components/pages/RawQuery';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/addStudent",
    element: <AddStudent />
  },
  {
    path: "/editStudent/:studentid",
    element: <EditStudent />
  },
  {
    path: "/classroom",
    element: <Classroom />
  },
  {
    path: "/addClassroom",
    element: <AddClassroom />
  },
  {
    path: "/editClassroom/:classroomid",
    element: <EditClassroom />
  },
  {
    path: "/rawQuery",
    element: <RawQuery />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
