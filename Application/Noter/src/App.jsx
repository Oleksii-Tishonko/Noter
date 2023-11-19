import SearchProducts from "./Assets/Templates/ProductResults/ProductResults"
import './AppStyles.css'
import ProductPage from "./Assets/Templates/ProductPage/ProductPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SearchProducts/>}/>
        <Route path='/products/:id' element={<ProductPage/>}/>
      </Routes>
    </Router>
    // <div>
    //   <SearchProducts/>
    //   {/* <ProductPage/> */}
    // </div>
  )
}

export default App