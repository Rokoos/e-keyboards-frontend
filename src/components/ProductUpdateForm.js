import React from 'react'

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  values,
  categories,
  selectedCategory
}) =>{
  const {
    title, description, price, category, shipping, quantity,  brands, brand, specs} = values

  return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label >Title</label>
    <input
     type="text"
     name="title"
     className="form-control"
     value={title}
     onChange={handleChange}
     />
    </div>

    <div className="form-group">
    <label >Description</label>
    <input
     type="text"
     name="description"
     className="form-control"
     value={description}
     onChange={handleChange}
     />
    </div>

    <div className="form-group">
    <label >Price</label>
    <input
     type="number"
     name="price"
     className="form-control"
     value={price}
     onChange={handleChange}
     />
    </div>

    <div className="form-group">
    <label >Shipping</label>
    <select 
    value={shipping === "Yes" ? 'Yes' : 'No'}
    name="shipping" 
    className="form-control"
    onChange={handleChange}>
      <option value="No">No</option>
      <option value="Yes">Yes</option>
    </select>
    </div>

    <div className="form-group">
    <label >Quantity</label>
    <input
     type="number"
     name="quantity"
     className="form-control"
     value={quantity}
     onChange={handleChange}
     />
    </div>

    <div className="form-group">
    <label >Brand</label>
    <select 
    value={brand}
    name="brand" 
    className="form-control"
    onChange={handleChange}>
      {brands.map(b => <option key={b}>{b}</option>)}
    </select>
    </div>

    <div className="form-group">
      <label >Category</label>
        <select 
        name="category" 
        className="form-control"
        onChange={handleCategoryChange}
        value={selectedCategory ? selectedCategory : category._id}
        >  
            {categories.length > 0  && categories.map(c=> (<option key={c._id} value={c._id}>
                {c.name}
              </option>))}
        </select>
      </div>

      <div className="form-group">
    <label >Specs</label>
    <input
     type="text"
     name="specs"
     className="form-control"
     value={specs}
     onChange={handleChange}
     />
    </div>
      
    <br/>
    <button className="btn btn-outline-info">Save</button>
  </form>
  )
} 


export default ProductUpdateForm
