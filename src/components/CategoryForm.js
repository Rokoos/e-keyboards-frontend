import React from 'react'

const CategoryForm = ({title, handleSubmit, name, setName}) => (
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control mb-3"
                onChange={e => setName(e.target.value)}
                value={name}
                autoFocus
                required
                />
                <button className="btn btn-outline-primary">{title}</button>
            </div>
        </form>
)

export default CategoryForm
