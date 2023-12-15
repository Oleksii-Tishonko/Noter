import SearchResults from "./Assets/Templates/SearchResults/SearchResults";
import "./AppStyles.css";
import ProductPage from "./Assets/Templates/ProductPage/ProductPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Specifications from "./Assets/Templates/Specifications/Specifications";
import ReviewsPage from "./Assets/Templates/ReviewsPage/ReviewsPage";
import QuestionsPage from "./Assets/Templates/QuestionsPage/QuestionsPage";
import Categories from "./Assets/Templates/Categories/Categories";
import { Authentificate, LoadingUserData, CreateUserAccount } from "./Assets/Templates/Authentificate/Authentificate";
import { AuthContextProvider } from "./Assets/Templates/Authentificate/AuthContext";
import UserAccount from "./Assets/Templates/Account/UserAccount";

function App() {

   return (
      <AuthContextProvider>
         <Router>
            <Routes>
               <Route exact path="/" element={<SearchResults />} />
               <Route path="/:params" element={<SearchResults />} />
               <Route path="/products" element={<SearchResults />} />
               <Route path="/products/:params" element={<SearchResults />} />
               <Route path="/product/:id" element={<ProductPage />} />
               <Route path="/product/:id/specifications" element={<Specifications />} />
               <Route path="/product/:productId/reviews" element={<ReviewsPage />} />
               <Route path="/product/:id/questions" element={<QuestionsPage />} />
               <Route path="/categories" element={<Categories />} />
               <Route path="/authentificate" element={<Authentificate />} />
               <Route path="authentificate/loadUserData" element={<LoadingUserData />} />
               <Route path="authentificate/createUser" element={<CreateUserAccount />} />
               <Route path="/userAccount" element={<UserAccount />} />
            </Routes>
         </Router>
      </AuthContextProvider>
      // <div>
      //   <SearchProducts/>
      //   {/* <ProductPage/> */}
      // </div>
   );
}

export default App;
