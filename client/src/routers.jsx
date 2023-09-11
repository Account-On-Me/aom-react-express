import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import { HomePage } from './views/HomePage';


export const RouterProvider = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
};