import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./components/pages/RegisterPage";

import LoginPage from "./components/pages/LoginPage";

import HomePage from "./components/pages/HomePage";

import AddBook from "./components/pages/AddBook";

import ProtectedRoute from "./components/ProtectecRoute";

import BookDetailsPage from "./components/pages/BookDetailsPage";

import AddReview from './components/pages/AddReview'

import ViewAllReview from "./components/pages/ViewAllReviews";

import './App.css'


const App = () => (
  <BrowserRouter>
     <Route path="/register_user" element={<RegisterPage />} />
    <Routes>
     
      <Route path="/login_user" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute >
          <HomePage />
        </ProtectedRoute>
      }
      />
      <Route path="/add_new_book" element={
        <ProtectedRoute>
          <AddBook />
        </ProtectedRoute>
      }
      />

      <Route path="/view_book_details/book_id/:book_id" element={
        <ProtectedRoute>
          <BookDetailsPage/>
        </ProtectedRoute>
      }
      />
     
   </Routes>
  </BrowserRouter>
)

export default App;