import SearchResults from "./Assets/Templates/SearchResults/SearchResults";
import "./AppStyles.css";
import ProductPage from "./Assets/Templates/ProductPage/ProductPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Specifications from "./Assets/Templates/Specifications/Specifications";
import ReviewsPage from "./Assets/Templates/ReviewsPage/ReviewsPage";
import QuestionsPage from "./Assets/Templates/QuestionsPage/QuestionsPage";

function App() {
   return (
      <Router>
         <Routes>
            <Route exact path="/" element={<SearchResults />} />
            <Route path = '/products' element={<SearchResults/>}/>
            <Route path = '/products/:params' element={<SearchResults/>}/>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/product/:id/specifications"element={<Specifications />}/>
            <Route path="/product/:id/reviews" element={<ReviewsPage />} />
            <Route path="/product/:id/questions" element={<QuestionsPage />} />
         </Routes>
      </Router>
      // <div>
      //   <SearchProducts/>
      //   {/* <ProductPage/> */}
      // </div>
   );
}

export default App;
