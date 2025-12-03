import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "./contexts/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          navigate("/not-found");
          return;
        }
        setProduct(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });

      alert("Produto removido com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao remover produto.");
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        className="w-64 h-64 object-cover mx-auto rounded mb-6"
      />

      <p className="text-lg text-gray-700 mb-2">
        <strong>Preço:</strong> R$ {product.price}
      </p>

      <p className="text-lg text-gray-700 mb-2">
        <strong>Categoria:</strong> {product.category}
      </p>

      <p className="text-lg text-gray-700 mb-4">
        <strong>Estoque:</strong> {product.stock}
      </p>

      <p className="text-gray-600 mb-6">{product.description}</p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Adicionar ao Carrinho
        </button>

        <button
          onClick={() => navigate(`/editar/${product.id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Editar Produto
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Excluir Produto
        </button>
      </div>
    </div>
  );
}
