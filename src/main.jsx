import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Subscriptions from './pages/Subscriptions'
import YourVideos from './pages/YourVideos'
import LikedVideos from './pages/LikedVideos'

const router=createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/subscriptions',
        element: <Subscriptions />,
      },
      {
        path: '/your-videos',
        element: <YourVideos />,
      },
      {
        path: '/liked-videos',
        element: <LikedVideos />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
