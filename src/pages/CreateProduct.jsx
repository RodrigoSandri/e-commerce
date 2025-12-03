import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
})

      .then(() => {
        alert("Produto cadastrado com sucesso!");
        navigate("/");
      })
      .catch(() => alert("Erro ao cadastrar!"));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Cadastrar Produto</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">

        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Categoria"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Estoque"
          value={formData.stock}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
