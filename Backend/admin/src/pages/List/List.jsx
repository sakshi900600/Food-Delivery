import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ url, token }) => {
  const [list, setList] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [editData, setEditData] = useState({})
  const [editImage, setEditImage] = useState(false)

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) setList(response.data.data)
    else toast.error("Error fetching list")
  }

  const removeFood = async (foodId, foodName) => {
    if (!window.confirm(`Are you sure you want to delete "${foodName}"? This cannot be undone.`)) return
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId }, { headers: { token } })
    await fetchList()
    if (response.data.success) toast.success(response.data.message)
    else toast.error("Error removing item")
  }

  const openEdit = (item) => {
    setEditItem(item)
    setEditData({ name: item.name, description: item.description, price: item.price, category: item.category })
    setEditImage(false)
  }

  const onEditChange = (e) => {
    setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitEdit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("id", editItem._id)
    formData.append("name", editData.name)
    formData.append("description", editData.description)
    formData.append("price", Number(editData.price))
    formData.append("category", editData.category)
    if (editImage) formData.append("image", editImage)

    const response = await axios.post(`${url}/api/food/edit`, formData, { headers: { token } })
    if (response.data.success) {
      toast.success(response.data.message)
      setEditItem(null)
      fetchList()
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table-format title">
        <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b>Edit</b><b>Remove</b>
      </div>
      {list.map((item, index) => (
        <div key={index} className="list-table-format">
          <img src={`${url}/image/` + item.image} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>${item.price}</p>
          <p onClick={() => openEdit(item)} className='cursor' style={{ color: '#ff6347' }}>Edit</p>
          <p onClick={() => removeFood(item._id, item.name)} className='cursor' style={{ color: 'red' }}>✕</p>
        </div>
      ))}

      {editItem && (
        <div className='edit-modal-overlay' onClick={() => setEditItem(null)}>
          <div className='edit-modal' onClick={e => e.stopPropagation()}>
            <h3>Edit: {editItem.name}</h3>
            <form onSubmit={submitEdit} className='flex-col'>
              <label>Name</label>
              <input name='name' value={editData.name} onChange={onEditChange} required />
              <label>Description</label>
              <textarea name='description' value={editData.description} onChange={onEditChange} rows={3} required />
              <label>Price ($)</label>
              <input name='price' type='number' value={editData.price} onChange={onEditChange} required />
              <label>Category</label>
              <select name='category' value={editData.category} onChange={onEditChange}>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
              <label>New Image (optional)</label>
              <input type='file' onChange={e => setEditImage(e.target.files[0])} />
              <div className='edit-modal-actions'>
                <button type='submit' className='save-btn'>Save Changes</button>
                <button type='button' className='cancel-btn' onClick={() => setEditItem(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default List