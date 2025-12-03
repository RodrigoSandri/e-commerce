import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando Produtos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-green-600 font-semibold">R$ {product.price}</p>
            <p className="text-sm text-gray-500">Categoria: {product.category}</p>
            <p className="text-sm text-gray-500">Estoque: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
