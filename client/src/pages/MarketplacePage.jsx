// src/pages/MarketplacePage.jsx
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import ItemCard from "../components/ItemCard";

const MarketplacePage = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ category: "", semester: "" });

  useEffect(() => {
    const fetchItems = async () => {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.semester) params.semester = filters.semester;
      const { data } = await axiosClient.get("/items", { params });
      setItems(data);
    };
    fetchItems();
  }, [filters]);

  return (
    <div className="container">
      <h2>EcoSwap Marketplace</h2>

      <div className="filters">
        <select
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          <option>Textbooks</option>
          <option>Lab Equipment</option>
          <option>Calculators</option>
          <option>Hostel Appliances</option>
          <option>Cycles</option>
          <option>Electronics</option>
          <option>Event Outfits</option>
        </select>

        <select
          value={filters.semester}
          onChange={(e) => setFilters((f) => ({ ...f, semester: e.target.value }))}
        >
          <option value="">All Semesters</option>
          <option>I</option>
          <option>II</option>
          <option>III</option>
          <option>IV</option>
          <option>V</option>
          <option>VI</option>
          <option>VII</option>
          <option>VIII</option>
        </select>
      </div>

      <div className="grid">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
