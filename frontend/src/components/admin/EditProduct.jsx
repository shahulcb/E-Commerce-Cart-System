import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { instance } from "../../api/axiosInstance";

const EditProduct = ({
  product,
  setEditMode,
  setIsProductEdited,
  setEditProductId,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(1);
  const [imagePrev, setImagePrev] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setStock(product.stock);
      setImagePrev(`${process.env.REACT_APP_STATIC_FILES_URL}${product.image}`);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isConfirmed = window.confirm("Are you sure to update this product");
      if (isConfirmed) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", image);
        formData.append("stock", stock);
        const response = await instance.put(
          `/admin/products/${product._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Product updated");
        setEditMode(false);
        setIsProductEdited(true);
        setEditProductId("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-72 bg-white p-3 rounded">
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
          />
        </div>
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="product image"
            className="mt-2 w-full h-36"
          />
        ) : (
          <img
            src={imagePrev}
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
            maxLength={1}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-red-400 w-full mt-5 h-9 rounded text-lg text-white"
            onClick={() => setEditMode(false)}
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-400 text-lg w-full mt-5 h-9 rounded text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
