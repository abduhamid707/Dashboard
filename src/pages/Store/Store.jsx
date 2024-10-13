// Store.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores, fetchStoreById, updateStore } from '../../store/storeSlice'; // Redux action'lar
import './style.scss';

const Store = () => {
    const dispatch = useDispatch();
    const { stores, currentStore, loading, error } = useSelector((state) => state.store);

    const [selectedStoreId, setSelectedStoreId] = useState(null);
    const [editStoreData, setEditStoreData] = useState({
        name: { uz: '', ru: '' },
        description: { uz: '', ru: '' },
        phone: '',
        location: '',
        image: null, // Rasm yuklash uchun
    });

    // Barcha do'konlarni olish - faqat birinchi yuklanishda
    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]); // Ikkinchi parametr bo'sh massiv

    // Do'konni ID bo'yicha olish
    const handleEdit = (id) => {
        dispatch(fetchStoreById(id));
        setSelectedStoreId(id);
    };

    // Do'kon ma'lumotlarini formaga yuklash
    useEffect(() => {
        if (currentStore) {
            setEditStoreData({
                name: {
                    uz: currentStore.name?.uz || '',
                    ru: currentStore.name?.ru || '',
                },
                description: {
                    uz: currentStore.description?.uz || '',
                    ru: currentStore.description?.ru || '',
                },
                phone: currentStore.phone || '',
                location: currentStore.location || '',
                image: null,
            });
        }
    }, [currentStore]);

    // Yangilangan do'konni PUT qilish
    const handleUpdate = (e) => {
        e.preventDefault(); // Formani yuborishdan to'xtatish

        const formData = new FormData();
        formData.append('name_uz', editStoreData.name.uz);
        formData.append('name_ru', editStoreData.name.ru);
        formData.append('description_uz', editStoreData.description.uz);
        formData.append('description_ru', editStoreData.description.ru);
        formData.append('phone', editStoreData.phone);
        formData.append('location', editStoreData.location);
        if (editStoreData.image) {
            formData.append('image', editStoreData.image);
        }

        if (selectedStoreId) {
            dispatch(updateStore({ id: selectedStoreId, storeData: formData }));
            setSelectedStoreId(null);
        }
    };

    // Rasm yuklashni boshqarish
    const handleImageChange = (e) => {
        setEditStoreData({ ...editStoreData, image: e.target.files[0] });
    };

    return (
        <div className="store-container">
            <h1>Stores</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && stores && (
                <table>
                    <thead>
                        <tr>
                            <th>Name (UZ)</th>
                            <th>Name (RU)</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map((store) => (
                            <tr key={store._id}>
                                <td>{store.name.uz}</td>
                                <td>{store.name.ru}</td>
                                <td>{store.phone}</td>
                                <td>{store.location}</td>
                                <td>
                                    <button onClick={() => handleEdit(store._id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedStoreId && (
                <form className="edit-form" onSubmit={handleUpdate}>
                    <h2>Edit Store</h2>
                    <label>
                        Name (uz):
                        <input
                            type="text"
                            value={editStoreData.name.uz}
                            onChange={(e) =>
                                setEditStoreData({ ...editStoreData, name: { ...editStoreData.name, uz: e.target.value } })
                            }
                        />
                    </label>
                    <label>
                        Name (ru):
                        <input
                            type="text"
                            value={editStoreData.name.ru}
                            onChange={(e) =>
                                setEditStoreData({ ...editStoreData, name: { ...editStoreData.name, ru: e.target.value } })
                            }
                        />
                    </label>
                    <label>
                        Description (uz):
                        <input
                            type="text"
                            value={editStoreData.description.uz}
                            onChange={(e) =>
                                setEditStoreData({ ...editStoreData, description: { ...editStoreData.description, uz: e.target.value } })
                            }
                        />
                    </label>
                    <label>
                        Description (ru):
                        <input
                            type="text"
                            value={editStoreData.description.ru}
                            onChange={(e) =>
                                setEditStoreData({ ...editStoreData, description: { ...editStoreData.description, ru: e.target.value } })
                            }
                        />
                    </label>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={editStoreData.location}
                            onChange={(e) => setEditStoreData({ ...editStoreData, location: e.target.value })}
                        />
                    </label>

                    <label>
                        Phone:
                        <input
                            type="text"
                            value={editStoreData.phone}
                            onChange={(e) => setEditStoreData({ ...editStoreData, phone: e.target.value })}
                        />
                    </label>
                    <label>
                        Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange} // Rasm yuklashni boshqarish
                        />
                    </label>
                    <button type="submit">Update Store</button>
                </form>
            )}
        </div>
    );
};

export default Store;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './style.scss';

// // API URL
// const API_URL = 'https://surprize.uz/api/store';

// const Store = () => {
//     const [stores, setStores] = useState([]);
//     const [currentStore, setCurrentStore] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedStoreId, setSelectedStoreId] = useState(null);
//     const [editStoreData, setEditStoreData] = useState({
//         name: { uz: '', ru: '' },
//         description: { uz: '', ru: '' },
//         phone: '',
//         location: '',
//         image: null,
//     });

//     // Barcha do'konlarni olish
//     const fetchStores = async () => {
//         try {
//             const response = await axios.get(API_URL);
//             setStores(response.data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Do'konni ID bo'yicha olish
//     const fetchStoreById = async (id) => {
//         try {
//             const response = await axios.get(`${API_URL}/${id}`);
//             setCurrentStore(response.data);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     // Do'kon ma'lumotlarini yangilash
//     const updateStore = async (id, storeData) => {
//         try {
//             const response = await axios.put(`${API_URL}/${id}`, storeData, {
//                 headers: {
//                     token: localStorage.getItem('token'), // Tokenni qo'shish
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             const updatedStore = response.data;

//             // Yangilangan do'konni ro'yxatdan o'rnini yangilang
//             setStores((prevStores) =>
//                 prevStores.map((store) =>
//                     store._id === updatedStore._id ? updatedStore : store
//                 )
//             );
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     useEffect(() => {
//         fetchStores();
//     }, []);

//     // Do'konni ID bo'yicha olish
//     const handleEdit = (id) => {
//         fetchStoreById(id);
//         setSelectedStoreId(id);
//     };

//     // Do'kon ma'lumotlarini formaga yuklash
//     useEffect(() => {
//         if (currentStore) {
//             setEditStoreData({
//                 name: {
//                     uz: currentStore.name?.uz || '',
//                     ru: currentStore.name?.ru || '',
//                 },
//                 description: {
//                     uz: currentStore.description?.uz || '',
//                     ru: currentStore.description?.ru || '',
//                 },
//                 phone: currentStore.phone || '',
//                 location: currentStore.location || '',
//                 image: null,
//             });
//         }
//     }, [currentStore]);

//     // Yangilangan do'konni PUT qilish
//     const handleUpdate = (e) => {
//         e.preventDefault(); // Formani yuborishdan to'xtatish

//         const formData = new FormData();
//         formData.append('name_uz', editStoreData.name.uz);
//         formData.append('name_ru', editStoreData.name.ru);
//         formData.append('description_uz', editStoreData.description.uz);
//         formData.append('description_ru', editStoreData.description.ru);
//         formData.append('phone', editStoreData.phone);
//         formData.append('location', editStoreData.location);
//         if (editStoreData.image) {
//             formData.append('image', editStoreData.image);
//         }

//         if (selectedStoreId) {
//             updateStore(selectedStoreId, formData);
//             setSelectedStoreId(null);
//         }
//     };

//     // Rasm yuklashni boshqarish
//     const handleImageChange = (e) => {
//         setEditStoreData({ ...editStoreData, image: e.target.files[0] });
//     };

//     return (
//         <div className="store-container">
//             <h1>Stores</h1>
//             {loading && <p>Loading...</p>}
//             {error && <p className="error">{error}</p>}
//             {!loading && stores && (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name (UZ)</th>
//                             <th>Name (RU)</th>
//                             <th>Phone</th>
//                             <th>Location</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {stores.map((store) => (
//                             <tr key={store._id}>
//                                 <td>{store.name.uz}</td>
//                                 <td>{store.name.ru}</td>
//                                 <td>{store.phone}</td>
//                                 <td>{store.location}</td>
//                                 <td>
//                                     <button onClick={() => handleEdit(store._id)}>Edit</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {selectedStoreId && (
//                 <form className="edit-form" onSubmit={handleUpdate}>
//                     <h2>Edit Store</h2>
//                     <label>
//                         Name (uz):
//                         <input
//                             type="text"
//                             value={editStoreData.name.uz}
//                             onChange={(e) =>
//                                 setEditStoreData({ ...editStoreData, name: { ...editStoreData.name, uz: e.target.value } })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Name (ru):
//                         <input
//                             type="text"
//                             value={editStoreData.name.ru}
//                             onChange={(e) =>
//                                 setEditStoreData({ ...editStoreData, name: { ...editStoreData.name, ru: e.target.value } })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Description (uz):
//                         <input
//                             type="text"
//                             value={editStoreData.description.uz}
//                             onChange={(e) =>
//                                 setEditStoreData({ ...editStoreData, description: { ...editStoreData.description, uz: e.target.value } })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Description (ru):
//                         <input
//                             type="text"
//                             value={editStoreData.description.ru}
//                             onChange={(e) =>
//                                 setEditStoreData({ ...editStoreData, description: { ...editStoreData.description, ru: e.target.value } })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Location:
//                         <input
//                             type="text"
//                             value={editStoreData.location}
//                             onChange={(e) => setEditStoreData({ ...editStoreData, location: e.target.value })}
//                         />
//                     </label>
//                     <label>
//                         Phone:
//                         <input
//                             type="text"
//                             value={editStoreData.phone}
//                             onChange={(e) => setEditStoreData({ ...editStoreData, phone: e.target.value })}
//                         />
//                     </label>
//                     <label>
//                         Image:
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange} // Rasm yuklashni boshqarish
//                         />
//                     </label>
//                     <button type="submit">Update Store</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default Store;
