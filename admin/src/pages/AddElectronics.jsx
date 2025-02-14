import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { X } from "lucide-react";

function AddElectronics({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [subCategory, setSubCategory] = useState("Mobiles");
  const [bestSeller, setBestSeller] = useState("");
  const [sizes, setSizes] = useState([]); 
  const [color, setColor] = useState("");
  
  const handleAddColor = (e) => {
    e.preventDefault()
    if (color && !sizes.includes(color)) {
      setSizes([...sizes, color]);
      setColor("");
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setSizes(sizes.filter((c) => c !== colorToRemove));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/v1/products/addproduct",
        formData,
        { headers: { token } }
      );

      if (response.data.sucess) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([])
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 ">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Mobiles">Mobiles</option>
            <option value="Televisions">Televisions</option>
            <option value="Appilances">Appliances</option>
          </select>
        </div>

        <div>
          <p className="mb-2 ">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      <div>

        {subCategory === "Mobiles" && (
          <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Available Phone Colors:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a color..."
            />
            <button
              onClick={handleAddColor}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {sizes.map((c, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-lg">
                <span className="text-gray-700">{c}</span>
                <button onClick={() => handleRemoveColor(c)}>
                  <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
        )}
          

        {subCategory === "Televisions" && (
          <div>
            <p className="mb-2">Product Sizes (in inches)</p>
            <div className="flex gap-3">
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("24")
                      ? prev.filter((item) => item !== "24")
                      : [...prev, "24"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("24") ? "bg-pink-100" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  24
                </p>
              </div>

              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("32")
                      ? prev.filter((item) => item !== "32")
                      : [...prev, "32"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("32") ? "bg-pink-100" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  32
                </p>
              </div>

              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("40")
                      ? prev.filter((item) => item !== "40")
                      : [...prev, "40"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("40") ? "bg-pink-100" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  40
                </p>
              </div>

              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("65")
                      ? prev.filter((item) => item !== "65")
                      : [...prev, "65"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("65") ? "bg-pink-100" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  65
                </p>
              </div>

              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("85")
                      ? prev.filter((item) => item !== "85")
                      : [...prev, "85"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("10") ? "bg-pink-100" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  85
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          id="bestSeller"
        />
        <label className="cursor-pointer" htmlFor="bestSeller">
          Add to bestSeller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
}

export default AddElectronics;