import "./App.css";
import { AnimatedRoutes } from "./routing/AnimatedRoutes";

import { getOrder } from "./redux/orderSlice/OrderSlice";
function App() {
  getOrder();
  return (
    <div>
      <AnimatedRoutes />
    </div>
  );
}

export default App;
