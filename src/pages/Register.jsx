import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const firstInvalidRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.description.trim()) newErrors.description = "Descrição é obrigatória";
    if (!formData.category.trim()) newErrors.category = "Categoria é obrigatória";

    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) newErrors.price = "Preço inválido";

    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0) newErrors.stock = "Estoque inválido";

    if (!formData.image.trim()) newErrors.image = "URL da imagem é obrigatória";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstField = Object.keys(newErrors)[0];
      firstInvalidRef.current = document.querySelector(`[name="${firstField}"]`);
      firstInvalidRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    setLoading(true);
    try {
      await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      alert("Produto cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao cadastrar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Cadastrar Novo Produto</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Nome */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Nome:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            ref={firstInvalidRef}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Descrição */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Descrição:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.description ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Preço */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Preço:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.price ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Imagem */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Imagem (URL):</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.image ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 max-w-full rounded shadow-sm"
            />
          )}
        </div>

        {/* Categoria */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Categoria:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.category ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Estoque */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Estoque:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.stock ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 py-2 px-4 rounded font-bold text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
