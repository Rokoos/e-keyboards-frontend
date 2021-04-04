

export const roleBasedRedirect = (res,history) => {

    let intended = history.location.state
    if(intended){
        history.push(intended.from)
    }else{
        if(res.data.role === 'admin'){
            history.push('/admin/dashboard')
        }else{
            history.push('/shop')
        }
    }

    
}

export const initState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category:'',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    brands: ['Korg', "Yamaha", "Roland", "Ketron", "Casio", "Medeli"],
    brand: '',
    specs:''
  }

  export const brands = [
  'Korg',
  "Yamaha",
  "Roland",
  "Ketron",
  "Casio",
  "Medeli"]

  export const nums = [
    {id:1,
    starNum:5},
    {id:2,
    starNum:4},
    {id:3,
    starNum:3},
    {id:4,
    starNum:2},
    {id:5,
    starNum:1}]

  export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem._id === cartItemToAdd._id
    );

    let cart
  
    if (existingCartItem) {
      cart = cartItems.map(cartItem =>
        cartItem._id === cartItemToAdd._id
          ? { ...cartItem, count: cartItem.count < cartItem.quantity ? cartItem.count + 1 : cartItem.count }
          : cartItem
      );
    }else {
        cart = [...cartItems, { ...cartItemToAdd, count: 1 }]
    }
    localStorage.setItem('cart', JSON.stringify(cart))
     return cart
     
  };
 

  export const subtractItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem._id === cartItemToRemove._id
    );
  
    let cart
    if (existingCartItem.count === 1) {
      cart =  cartItems.filter(cartItem => cartItem._id !== cartItemToRemove._id);
    }else{
        cart = cartItems.map(cartItem =>
            cartItem._id === cartItemToRemove._id
              ? { ...cartItem, count: cartItem.count - 1 }
              : cartItem
          );
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    return cart
    
  };

  export const removeItemFromCart  = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem._id !== cartItemToRemove._id);

  }

 export const getTotalCount = (cart) => {
    return cart.reduce((acc, cartItem) => acc + cartItem.count, 0)
  }

 export const getTotalPrice = (cart) => {
    return cart.reduce((currentValue, nextValue) => {
          return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  export const checkCart = (cart, product) => {
    let existingItem = cart.find( p=> p._id === product._id)
    return existingItem ? 'In the cart' : 'Add to cart'
  }

  export const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
  };




  export const filterItems = (products, brands, categories, price, shipping, starNumbers) => {
    
    let tempProducts = [...products]

    if(price[0] > 0 || price[1] > 0){
      tempProducts = tempProducts.filter(product => product.price >= price[0] && product.price <= price[1])
    }

    if(brands.length > 0){
      tempProducts = tempProducts.filter(x => brands.includes(x.brand))
    }

    if(categories.length > 0){
      tempProducts = tempProducts.filter(x => categories.includes(x.category._id))
    }

    if(shipping === 'Yes'){
      tempProducts = tempProducts.filter(p => p.shipping === 'Yes')
    }
    if(shipping === 'No'){
      tempProducts = tempProducts.filter(p => p.shipping === 'No')

    }

    if(starNumbers.length > 0){
      tempProducts = tempProducts.filter(x => {
         for(let num of starNumbers){
          if(x.averageRating >= num && x.averageRating < num + 1 ){
            return x
          }
          
        }
        return null
      })
    }

    return tempProducts.sort((a, b) => {
      if(a.price > b.price){
        return -1
      }else if(a.price < b.price){
        return  1
      }else{
        return 0
      }
    } );

  }


  export const checkLoc = loc => {
    if(loc === "/user/history" || loc === "/user/password" || loc === "/user/wishlist"){
      return loc
    }
  }

  export const getUserName = user => {
    return user.email.split('@')[0]
  }

export const saveCheckoutToLS = () => {
  localStorage.setItem('checkout', true)
}

export const deleteCheckoutFromLS = () => {
  const checkout = localStorage.getItem('checkout')
  if(checkout){
    localStorage.removeItem(checkout)
  }
}