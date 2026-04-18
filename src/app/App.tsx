import '../App.css'
import { RouterProvider } from 'react-router';
import { router } from './routes';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
        <RouterProvider router={router} />
    </div>
  );
}

export default App
