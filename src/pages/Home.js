import React, {Fragment} from 'react'
import View from '../components/home/View'
import BestSellers from '../components/home/BestSellers'
import TWriter from '../components/home/TWriter'
import CategoryList from '../components/category/CategoryList'


const Home = () =>  (
  <Fragment>
    <div className="text-center h3 typeWriter_style view-text" >
      <TWriter text={[
        '<span style="color: #1b7318">e</span>-keyboards.com',
         "keyboards", 
         "workstations", 
         "synthesizers", 
         "second-hand keyboards"]}/>
      </div>
      <View/>
      <h4 className="text-center p-5  mt-3 mb-5 display-4 border-top  border-bottom">
          Categories
        </h4>
      <CategoryList/>
      <BestSellers/>
      </Fragment>
  )



export default Home
