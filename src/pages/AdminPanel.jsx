import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { products as initialProducts } from '../data/ProductData';

const AdminPanel = () => {
    const [product, setProduct] = useState({ name: '', price: '', stock: '', category: 'Seeds', image: '' });
    const [allProducts, setAllProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const dispatch = useDispatch();

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        
        
        if (savedProducts.length === 0) {
            setAllProducts(initialProducts);
            localStorage.setItem('products', JSON.stringify(initialProducts));
        } else {
            
            setAllProducts(savedProducts);
        }
    }, []);

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = { ...product, id: Date.now() };
        const updatedProducts = [...allProducts, newProduct];

        setAllProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProduct({ name: '', price: '', stock: '', category: 'Seeds', image: '' }); 
        alert("Product added successfully!");
    };

    const handleEditClick = (p) => {
        setEditingProduct(p);
        setIsEditModalOpen(true);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const updatedProducts = allProducts.map((p) =>
            p.id === editingProduct.id ? editingProduct : p
        );
        setAllProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setIsEditModalOpen(false);
        setEditingProduct(null);
        alert("Product updated successfully!");
    };

    const handleDeleteProduct = (id) => {
        if(window.confirm("Are you sure you want to delete this item?")) {
            const filtered = allProducts.filter(p => p.id !== id);
            setAllProducts(filtered);
            localStorage.setItem('products', JSON.stringify(filtered));
        }
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-green-100 dark:border-gray-800">
                <h1 className="text-2xl font-black text-green-800 dark:text-green-500 tracking-tight">AgroMart <span className="text-gray-400 dark:text-gray-500 font-normal text-lg">Admin</span></h1>
                <button onClick={() => dispatch(logout())} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-bold transition shadow-lg shadow-red-100 dark:shadow-none">Logout</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 1. Add Product Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800 sticky top-8">
                        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Add New Product</h2>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-100 dark:border-green-900/30 mb-4">
                                <p className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">Current Category:</p>
                                <p className="text-lg font-black text-green-800 dark:text-green-200">{product.category}</p>
                            </div>

                            <input type="text" placeholder="Product Name" 
                                className="w-full p-3 border dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 dark:bg-gray-800 dark:text-white transition" 
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })} required />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" placeholder="Price" 
                                    className="w-full p-3 border dark:border-gray-700 rounded-xl outline-none bg-gray-50 dark:bg-gray-800 dark:text-white" 
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
                                <input type="number" placeholder="Stock" 
                                    className="w-full p-3 border dark:border-gray-700 rounded-xl outline-none bg-gray-50 dark:bg-gray-800 dark:text-white" 
                                    value={product.stock}
                                    onChange={(e) => setProduct({ ...product, stock: e.target.value })} required />
                            </div>

                            <input type="text" placeholder="Image URL" 
                                className="w-full p-3 border dark:border-gray-700 rounded-xl outline-none bg-gray-50 dark:bg-gray-800 dark:text-white" 
                                value={product.image}
                                onChange={(e) => setProduct({ ...product, image: e.target.value })} required />

                            <select className="w-full p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white font-bold outline-none" 
                                value={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                                <option value="Seeds">Seeds</option>
                                <option value="Plants">Plants</option>
                                <option value="Fertilizers">Fertilizers</option>
                            </select>

                            <button className="w-full bg-green-600 text-white p-4 rounded-2xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-100 dark:shadow-none">Save Product</button>
                        </form>
                    </div>
                </div>

                {/* Product List with Edit/Delete */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Inventory List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {allProducts.map(p => (
                            <div key={p.id} className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex gap-4 hover:shadow-md transition">
                                <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{p.name}</h3>
                                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 w-fit px-2 py-0.5 rounded mt-1">Item: {p.category}</p>
                                    
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="font-black text-green-700 dark:text-green-500">₹{p.price}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">Stock: {p.stock}</p>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-3">
                                        <button onClick={() => handleEditClick(p)} className="text-xs font-bold text-blue-500 dark:text-blue-400 hover:underline">Edit</button>
                                        <span className="text-gray-300 dark:text-gray-700">|</span>
                                        <button onClick={() => handleDeleteProduct(p.id)} className="text-xs font-bold text-red-500 dark:text-red-400 hover:underline">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingProduct && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl w-full max-w-md shadow-2xl border dark:border-gray-800">
                        <h2 className="text-2xl font-bold mb-6 dark:text-white">Update Product</h2>
                        <form onSubmit={handleUpdateProduct} className="space-y-4">
                            
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg mb-4 text-center">
                                <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase">Updating Item Type</p>
                                <p className="font-bold dark:text-white">{editingProduct.category}</p>
                            </div>

                            <input type="text" className="w-full p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white outline-none" 
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} required />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" className="w-full p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white outline-none" 
                                    value={editingProduct.price}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} required />
                                <input type="number" className="w-full p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white outline-none" 
                                    value={editingProduct.stock}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} required />
                            </div>

                            <input type="text" className="w-full p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white outline-none" 
                                value={editingProduct.image}
                                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })} required />

                            <select className="w-full p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white outline-none" 
                                value={editingProduct.category}
                                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}>
                                <option value="Seeds">Seeds</option>
                                <option value="Plants">Plants</option>
                                <option value="Fertilizers">Fertilizers</option>
                            </select>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700">Update</button>
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-gray-200 dark:bg-gray-700 dark:text-white py-3 rounded-xl font-bold">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;