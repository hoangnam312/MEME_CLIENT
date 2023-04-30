import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        path: 'children',
        element: <div>Child Route</div>
      }
    ]
  },   
  {
    path: '/second',
    element: <div>Second Page</div>,
    children: []
  }
])