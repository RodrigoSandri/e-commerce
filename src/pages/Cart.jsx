import { useContext } from "react";
import { CartContext } from "./contexts/CartContext";

export default function Cart() {
  const { cart, total, removeFromCart } = useContext(CartContext);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Carrinho</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center mt-20 text-xl">Seu carrinho está vazio.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600">Qtd: {item.quantidade}</p>
                <p className="text-green-600 font-bold">R$ {(item.price * item.quantidade).toFixed(2)}</p>
              </div>
              <button
                className="text-red-500 font-bold hover:text-red-700 text-xl"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <p className="text-xl font-bold text-gray-800">Total: R$ {total.toFixed(2)}</p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
              onClick={() => alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}`)}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
