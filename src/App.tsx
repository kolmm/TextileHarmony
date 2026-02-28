import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Placeholder({ name }: { name: string }) {
  return <div className="p-8 text-center text-text">{name} - Coming Soon</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Placeholder name="Home" />} />
        <Route path="/catalog" element={<Placeholder name="Catalog" />} />
        <Route path="/catalog/:category" element={<Placeholder name="Catalog Category" />} />
        <Route path="/product/:id" element={<Placeholder name="Product" />} />
        <Route path="/cart" element={<Placeholder name="Cart" />} />
        <Route path="/contact" element={<Placeholder name="Contact" />} />
        <Route path="/privacy-policy" element={<Placeholder name="Privacy Policy" />} />
        <Route path="/terms-of-use" element={<Placeholder name="Terms of Use" />} />
        <Route path="/return-policy" element={<Placeholder name="Return Policy" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
