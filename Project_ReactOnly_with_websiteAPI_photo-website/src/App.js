import Nav from './components/Nav'
import Footer from './components/Footer'
import Homepage from './pages/Homepage';
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import "./styles/style.css"


function App() {
  return (
    <div className="App">
      <Nav />
      {/* 在這裡把需要router的通通包進來 */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}

//  原本的路徑 
//function App() {
//   return (
//     <div className="App">
//       <Nav></Nav>
//       <Homepage></Homepage>
//       <Footer></Footer>

//     </div>
//   );
// }

export default App;
