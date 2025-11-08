import React from "react";

// Props received from HomePage for category and sorting options
interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onSortChange: (sort: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border rounded-md p-2"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      {/* Sort by price */}
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="border rounded-md p-2"
      >
        <option value="">Sort By</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>
    </div>
  );
};

export default FilterBar;
