import { Category, Product } from "@/app/services/api";
import { useEffect, useState } from "react";

interface ProductFormProps {
    product: Product | undefined,
    onSubmit: (data: FormDataProduct) => void,
    onCancel: () => void,
    titleForm: string,
    category: Category[],
}
export default function ProductForm ({ product, onCancel, titleForm, category, onSubmit}: ProductFormProps) {
    const [newImage, setNewImage] = useState<string>("");
    const [formData, setFormData] = useState<FormDataProduct>({
        title: product?.title || "",
        price: product?.price || "",
        description: product?.description || "",
        categoryId: product?.category.id || 0,
        images: product?.images || [],
    });
    useEffect(() => {
        setFormData({
            title: product?.title || "",
            price: product?.price || "",
            description: product?.description || "",
            categoryId: product?.category.id || 0,
            images: product?.images || [],
        });
    }, [product]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const index = e.target.dataset.index;
        // setFormData(prev => ({...prev, [name]: value}))
        if(name === "category") {
            setFormData(prev => ({...prev, categoryId: Number(value)}));
        }
        else if (name === "image" && index) {
            const updateImages = [...formData.images];
            updateImages[Number(index)] = value
            setFormData(prev => ({...prev, images: updateImages}))
        }
        else{
            setFormData(prev => ({...prev, [name]: value}))
        }
    }   
    const handleAddImage = () => {
        setFormData(prev => ({...prev, images: [...prev.images, newImage]}))
    }
    const handleDeleteImage = (index: number) => {
        const deleteImages = formData.images.filter((_,i) => i !== index)
        setFormData(prev => ({...prev, images: deleteImages}))
    }
    return(
        <form onSubmit={(e) => {e.preventDefault(); onSubmit(formData);}} className="flex flex-col bg-[#32190c6e] p-[1rem] rounded-[1rem] gap-[0.5rem] 2xl:w-[100%]">
            <h1 className="text-center text-[1.2rem] md:text-[1.5rem] xl:text-[2rem] font-bold">{titleForm}</h1>
                {/* Main section Images */}
            <section className="flex flex-col items-center gap-[1rem] p-[1rem] justify-center border border-gray-300/20 rounded-[1rem]">
                {/* section add image */}
                <section className="flex flex-col items-center gap-[0.5rem]">
                    <img className="border w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] rounded-[50%]" src={newImage}></img>
                    <label>Add New Image url:</label>
                    <div className="flex flex-col md:flex-row gap-[0.5rem] items-center">
                        <input value={newImage} onChange={(e) => setNewImage(e.target.value)} type="text" name="imageNow" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]"/>
                        <button onClick={handleAddImage} type="button" className="bg-emerald-500 p-[0.4rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 max-md:w-[6rem] text-[0.6rem] md:text-[0.8rem]">Add New Image</button>
                    </div>
                </section>
                {/* section List Images */}
                <h2 className="font-bold text-[1rem] md:text-[1.2rem] xl:text-[1.2rem]">List Images</h2>
                <section className="flex flex-row gap-[0.5rem] justify-center flex-wrap">
                    {/* Card Image List */}
                    {formData.images.map ((image, index) => (
                    <div key={index} className="flex flex-col items-center border border-gray-300/20 p-[0.5rem] rounded-[1rem] gap-[0.4rem] bg-[#040414f5]">
                        <img className="border w-[6rem] h-[6rem] md:w-[4rem] md:h-[4rem] rounded-[50%]" src={image}></img>
                        <label>Image url:</label>
                        <input value={image} data-index={index} onChange={handleChange} type="text" name="image" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem] text-[0.9rem]"/>
                        <div className="flex flex-row gap-[0.4rem]">
                            <button onClick={() => handleDeleteImage(index)} type="button" className="bg-red-600 p-[0.2rem] rounded-[0.4rem] hover:bg-red-800 hover:text-white active:scale-95 duration-200 text-[0.8rem]">Delete Image</button>
                        </div>
                    </div>
                    ))}
                </section>
            </section>
            <label>Title:</label>
            <input value={formData.title} onChange={handleChange} type="text" name="title" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]"/>
            <label>Price:</label>
            <input value={formData.price} onChange={handleChange} type="text" name="price" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]"/>
            <label>Description:</label> 
            <textarea value={formData.description} onChange={handleChange} name="description" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]" rows={5} />
            <label>Category:</label>
            <select value={formData?.categoryId} onChange={handleChange} name="category" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]" >
                <option value="0">Select Category</option>
                {category.map((cat) => (
                    <option key={cat.id} value={Number(cat.id)}>{cat.name}</option>
                ))}
            </select>
            {/* button save and cancel */}
            <div className="flex flex-row justify-end gap-[0.5rem]">
                <button onClick={onCancel} type="button" className="bg-emerald-500  p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200">Cancel</button>
                <button disabled={formData.categoryId === 0} type="submit" className={`${(formData.categoryId === 0 || formData.images.length < 1 || formData.title.trim() === "" || formData.description.trim() === "" || formData.price === 0) ? 'bg-gray-500 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-700 hover:text-white active:scale-95 duration-200'} p-[0.5rem] rounded-[0.4rem] `}>Save</button>
            </div>
            {/* <button onClick={onCancel} className="bg-emerald-500 p-[0.2rem] rounded-[0.4rem]">cancel</button> */}
        </form>
    );
}