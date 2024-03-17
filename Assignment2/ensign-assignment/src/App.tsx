

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import StickyNav from './routes/StickyNav'
import LandingPage from './routes/LandingPage'
import ProductDetail from './routes/ProductDetail'
import ShoppingCart from './routes/ShoppingCart'
import ErrorPage from './routes/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <StickyNav/>,
    children: [{
      path: '/:userid',
      element: <LandingPage/>
    },
    {
      path: '/:userid/product/:itemid',
      element: <ProductDetail/>
    }
    ],
    errorElement: <ErrorPage/>
  } ,
  {
    path: '/:userid/checkout',
    element: <ShoppingCart/>
  }
]

)

function App() {
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
