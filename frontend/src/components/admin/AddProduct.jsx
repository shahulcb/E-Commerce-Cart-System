import React, { useState } from "react";
import { instance } from "../../api/axiosInstance";
import toast from "react-hot-toast";

const AddProduct = ({ setAddProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("stock", stock);
    try {
      const response = await instance.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added");
      setAddProduct(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-72 bg-white shadow-md shadow-stone-200 p-3 rounded mt-3">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="">Product Name</label>
          <input
            type="text"
            className="border border-gray-500 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Price</label>
          <input
            type="text"
            className="border border-gray-500 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Image</label>
          <input
            type="file"
            className="border border-gray-500 rounded"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="product image"
            className="w-full h-36 rounded mt-2"
          />
        )}
        <div className="flex flex-col">
          <label htmlFor="">Stock</label>
          <input
            type="number"
            className="border border-gray-500 rounded"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-red-400 w-full mt-5 h-9 rounded text-lg text-white"
            onClick={() => setAddProduct(false)}
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-400 w-full mt-5 h-9 rounded text-lg text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
