import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => alert("Erro ao carregar o produto!"));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        alert("Produto atualizado com sucesso!");
        navigate("/");
      })
      .catch(() => alert("Erro ao atualizar!"));
  };

  const handleDelete = () => {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Produto deletado!");
        navigate("/");
      })
      .catch(() => alert("Erro ao deletar!"));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Editar Produto</h1>

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

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Salvar
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="bg-red-600 mt-4 text-white p-2 rounded"
      >
        Deletar Produto
      </button>
    </div>
  );
}
