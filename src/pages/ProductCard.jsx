import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg shadow-sm p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded mb-2"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/default.jpg"; // imagem padrão em public/images/
        }}
      />

      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-700 mb-2">
        R$ {Number(product.price).toFixed(2)}
      </p>

      {product.stock === 0 ? (
        <p className="text-red-500 font-semibold">Esgotado</p>
      ) : (
        <button
          onClick={() => onAddToCart(product)}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
        >
          Adicionar ao Carrinho
        </button>
      )}

      <button
        onClick={() => navigate(`/produto/${product.id}`)}
        className="mt-1 text-sm text-gray-600 hover:underline"
      >
        Ver Detalhes
      </button>
    </div>
  );
}
