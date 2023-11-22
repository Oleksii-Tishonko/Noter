import SearchProducts from "./Assets/Templates/ProductResults/ProductResults"
import './AppStyles.css'
import ProductPage from "./Assets/Templates/ProductPage/ProductPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Specifications from "./Assets/Templates/Specifications/Specifications";
import ReviewsPage from "./Assets/Templates/ReviewsPage/ReviewsPage";
import QuestionsPage from "./Assets/Templates/QuestionsPage/QuestionsPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SearchProducts/>}/>
        <Route path='/products/:id' element={<ProductPage/>}/>
        <Route path='/products/:id/specifications' element={<Specifications/>}/>
        <Route path='/products/:id/reviews' element={<ReviewsPage/>}/>
        <Route path='/products/:id/questions' element={<QuestionsPage/>}/>
      </Routes>
    </Router>
    // <div>
    //   <SearchProducts/>
    //   {/* <ProductPage/> */}
    // </div>
  )
}

export default App