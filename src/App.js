import { RouterProvider } from 'react-router-dom';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { routes } from './Routes/Routes';

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes}>

      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;