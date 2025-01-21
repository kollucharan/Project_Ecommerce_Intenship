import { configureStore } from '@reduxjs/toolkit'
// import countReducer from '../Slices/countslice'
import categoriesReducer from '../Slices/categoryslice'
import cartReducer from '../Slices/cartslice'
import productsReducer from '../Slices/productsslice'
import hasRunReducer from '../Slices/hasRunslice'
import runnReducer from '../Slices/runnslice'

export const store = configureStore({
  reducer: {
    // cart:cartReducer,
    categories:categoriesReducer,
    // count:countReducer,
    cart:cartReducer,
    products:productsReducer,
    hasRun:hasRunReducer,
    runn:runnReducer
  },
  
})