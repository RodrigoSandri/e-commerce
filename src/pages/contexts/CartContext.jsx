import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * (item.quantidade || 1),
      0
    );

    const newItemCount = cart.reduce(
      (acc, item) => acc + (item.quantidade || 1),
      0
    );

    setTotal(newTotal);
    setItemCount(newItemCount);

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Validação com limite do estoque
  const addToCart = (product, delta = 1) => {
    const estoque = product.stock;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      // Já existe no carrinho
      if (existing) {
        const novaQtd = existing.quantidade + delta;

        if (novaQtd > estoque) {
          alert("Estoque máximo atingido!");
          return prev;
        }

        if (novaQtd <= 0) {
          return prev.filter((item) => item.id !== product.id);
        }

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: novaQtd }
            : item
        );
      }

      // Se estoque é 0, não adiciona
      if (estoque === 0) {
        alert("Produto esgotado!");
        return prev;
      }

      return [...prev, { ...product, quantidade: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        total,
        itemCount,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
