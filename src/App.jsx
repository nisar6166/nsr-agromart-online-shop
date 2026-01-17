import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import SignUp from "./pages/SignUp"
import Login from './pages/Login';
import AdminPanel from "./pages/AdminPanel";
import UserPanel from './pages/UserPanel';
import CartList from "./pages/CartList"
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './components/Checkout';
import OrderHistory from './pages/OrderHistory';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Navbar />
      
      
      <main className="min-h-screen flex flex-col justify-between">
        
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/OrderHistory" element={<OrderHistory />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />


            {/* Protected Admin Routes */}
            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute role="Admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            {/* Protected User Routes */}
            <Route
              path="/user-panel"
              element={
                <ProtectedRoute role="User">
                  <UserPanel />
                </ProtectedRoute>
              }
            />

            {/* Protected Cart Routes */}
            <Route
              path="/cart"  
              element={
                <ProtectedRoute>
                  <CartList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        
        <Footer />
      </main>

    </Router>
  );
}

export default App;