import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import Product_List from "./Components/Produc_List/product_List";
import ProductList_01 from "./Components/Product_List_01";

function App() {
  return (
   <Router>
    <Routes>
      <Route Component={Product_List} path="Product_List"></Route>
      <Route Component={ProductList_01} path="ProductList_01"></Route>

    </Routes>
   </Router>
  );
}

export default App;
