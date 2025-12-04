import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"; 
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";

import { CartContextProvider } from "./pages/contexts/CartContext";

export default function App() {
  return (
    <CartContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/cadastro" element={<CreateProduct />} /> 
          <Route path="/editar/:id" element={<EditProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartContextProvider>
  );
}
  