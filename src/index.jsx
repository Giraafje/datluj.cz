import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Stage from './components/Stage';
import StartPage from './components/StartPage';
import './style.css';

const App = () => {
  return (
    <div className="container">
      <h1 style={{textAlign: 'center'}}>Datlování</h1>
      <Outlet/>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h3>There is an error.</h3>,
    children: [
      {
        path: "/",
        element: <StartPage />,
      },
      {
        path: "/game/:type",
        element: <Stage />,
      }
    ]
  }
]);

createRoot(
  document.querySelector('#app'),
).render(<RouterProvider router={router} />);