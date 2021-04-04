import React, {Fragment, useState, useEffect, useCallback} from 'react'
import {getProductsByCount} from '../functions/product'
import { getCategories} from '../functions/category'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider, Checkbox, Modal} from 'antd'
import { DownSquareOutlined} from '@ant-design/icons'
import Star from '../components/Star'
import {brands, nums, filterItems} from '../utils'
import Spinner from '../components/Spinner'


const {SubMenu} = Menu

const Shop = () => {
    const [products, setProducts] = useState([])
    const [ loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0,0])
    const [categories, setCategories] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const [shipping, setShipping] = useState('All')
    const [brandNames, setBrandNames] = useState([])
    const [maxPrice, setMaxPrice] = useState('')
    const [starNumbers, setStarNumbes] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const handleModal = () => setModalVisible(true)


    const loadAllProducts = useCallback(() => {
        setLoading(true)
        getProductsByCount(20)
        .then(p => {
            setProducts(p.data)
            productPrices(p.data)
            setLoading(false)
        })
    }, []) 

    useEffect(() => {
        loadAllProducts()
        getCategories()
        .then(res => setCategories(res.data))
    }, [loadAllProducts])

    const productPrices = products => {
        let prices = [] 
        products.map(p => prices.push(p.price))
        setMaxPrice(Math.max(...prices))
    }

    const handleSlider = value => {
        setPrice(value)
    }

    // load products based on category

    const showCategories = () => categories.map(c => 
        <div key={c._id}>
            <Checkbox
            onChange={handleCheck}
            className="pb-2 pl-4 pr-4" value={c._id} name="category"
            checked={categoryIds.includes(c._id)}>
            {c.name}
            </Checkbox> 
            <br/>
        </div>)

    const handleCheck =  e => {
        let inTheState = [...categoryIds]
        let justChecked = e.target.value
        let foundInState = inTheState.indexOf(justChecked)

        if(foundInState === -1){
            inTheState.push(justChecked)
        }else{
            //if found pull out from the array
            inTheState.splice(foundInState, 1)
        }
        setCategoryIds(inTheState)
    }   

    //  show products by star rating

    const handleStarClick = num => {
        let inTheState = [...starNumbers]
        let foundInState = inTheState.indexOf(num)
        if(foundInState === -1){
            inTheState.push(num)
        }else{
            inTheState.splice(foundInState, 1)
        }
        
        setStarNumbes(inTheState)
    }

    const renderStars = () => {
            return (
                <div className="pr-4 pl-4 pb-2"> 
                {
                    nums.map(num => (
                        <Fragment  key={num.id}>            
                            <Star starClick={() => handleStarClick(num.starNum)}  num={num}
                            starEmptyColor={starNumbers.includes(num.starNum) ? 'red' : 'orange'}
                            />
                            <br/>
                        </Fragment>    
                    ) )
                }
                </div>
            )

    }

// show by brands
    const showBrands = () =>  brands.map((b, i) => 
            <div key={i}>
                <Checkbox
                onChange={handleBrandCheck}
                className="pb-2 pl-4 pr-4" 
                value={b} name="brand"
                checked={brandNames.includes(b)}
                >
                {b}
                </Checkbox> 
                <br/>
            </div>)

    const handleBrandCheck =  e => {
        let inTheState = [...brandNames]
        let justChecked = e.target.value
        let foundInState = inTheState.indexOf(justChecked)
        
        if(foundInState === -1){
            inTheState.push(justChecked)
        }else{
            //if found pull out from the array
            inTheState.splice(foundInState, 1)
        }
        setBrandNames(inTheState)
         }   
                 
    // show products based on shipping

    const showShipping = () => (
        <Fragment>
            <Checkbox className="pb-3 pl-4 pr-1"
            onChange={handleShipping}
            value="All"
            checked={shipping === 'All'}
            > All </Checkbox>
            <br/>

            <Checkbox className="pb-3 pl-4 pr-1"
            onChange={handleShipping}
            value="Yes"
            checked={shipping === 'Yes'}
            > Yes </Checkbox>
            <br/>

            <Checkbox
            className="pb-2 pl-4"
            onChange={handleShipping}
            value="No"
            checked={shipping === 'No'}
            > No </Checkbox>
        </Fragment>
    )
          
    const handleShipping = e => {
        setShipping(e.target.value)
    }

    const resetFilters = () => {
        setPrice([0,0])
        setCategoryIds([])
        setStarNumbes([])
        setBrandNames([])
        setShipping('All')
    }

    

    const filteredItems = filterItems(products, brandNames, categoryIds, price, shipping, starNumbers)

  return (
    <Fragment>
    <div className="container-fluid mb-3 mt-5" >
      <div className="row">
        <div className="col-md-3 text-center mt-5 filters-display">
            <h4>Filters</h4>
            <div className="btn btn-success" onClick={resetFilters}>Reset</div>
            <Menu defaultOpenKeys={["1", "2", "3", "4", "5"]} mode="inline">
            {/* price */}
                <SubMenu key="1" title={<span className="h6"><DownSquareOutlined/>Price  </span>}>
                    <div>
                    <Slider className="ml-4 mr-4"
                    tipFormatter={v => `€${v}`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max={maxPrice}
                    />
                    </div>
                </SubMenu>

            {/* category */}
                <SubMenu key="2" title={<span className="h6"><DownSquareOutlined/>Categories  </span>}>
                    <div>
                   {showCategories()}
                    </div>
                </SubMenu>

            {/* rating*/}
                <SubMenu key="3" title={<span className="h6"><DownSquareOutlined/>Rating</span>}>
                    <div>
                   {renderStars()}
                    </div>
                </SubMenu>

                {/* brand*/}
                <SubMenu key="4" title={<span className="h6"><DownSquareOutlined/>Brands </span>}>
                    <div>
                   {showBrands()}
                    </div>
                </SubMenu>

                {/* shipping*/}
                <SubMenu key="5" title={<span className="h6"><DownSquareOutlined/>Shipping </span>}>
                    <div>
                   {showShipping()}
                    </div>
                </SubMenu>

            </Menu>
        </div>

        <div className="col-md-9 mx-auto mt-5">
        {loading ? (
            <Spinner/>
        ) : (
            <Fragment>
            <button
            onClick={handleModal}
            style={{fontSize:"10px"}}
            className="btn btn-raised btn-primary button-display mx-auto mt-3 mb-5">Filters</button>
            {products.length < 1 || filteredItems.length < 1 ? <p>No products found</p> : <div className="row">
            {filteredItems.map(product => (
                <div className="col-md-6 col-lg-6 col-xl-4 d-flex align-items-stretch" key={product._id}>
                   <ProductCard  product={product}/>
                </div>))}
                </div>
            }
            </Fragment>
        )}
      
        </div>
      </div>
    
    </div>
    <Modal 
    className="mt-4"
      title="Filters"
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      >
      <div className="d-flex flex-column">
      <div className="btn btn-success mb-4" onClick={resetFilters}>Reset</div>
      <Menu defaultOpenKeys={["1"]} mode="inline">
            {/* price */}
                <SubMenu key="1" title={<span className="h6"><DownSquareOutlined/>Price  </span>}>
                    <div>
                    <Slider className="ml-4 mr-4"
                    tipFormatter={v => `€${v}`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max={maxPrice}
                    />
                    </div>
                </SubMenu>

            {/* category */}
                <SubMenu key="2" title={<span className="h6"><DownSquareOutlined/>Categories  </span>}>
                    <div>
                   {showCategories()}
                    </div>
                </SubMenu>

            {/* rating*/}
                <SubMenu key="3" title={<span className="h6"><DownSquareOutlined/>Rating</span>}>
                    <div>
                   {renderStars()}
                    </div>
                </SubMenu>

                {/* brand*/}
                <SubMenu key="4" title={<span className="h6"><DownSquareOutlined/>Brands </span>}>
                    <div>
                   {showBrands()}
                    </div>
                </SubMenu>

                {/* shipping*/}
                <SubMenu key="5" title={<span className="h6"><DownSquareOutlined/>Shipping </span>}>
                    <div>
                   {showShipping()}
                    </div>
                </SubMenu>

            </Menu>
            </div>
      </Modal>
    <div className="losFooteros"></div>
    </Fragment>
  )
}

export default Shop
