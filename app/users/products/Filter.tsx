"use client";

import React, { useState } from "react";
import styles from "./Filter.module.css";
import { redirect } from "next/navigation";

interface FilterProps {
  categories: { id: string; name: string }[];
  category?: string;
  search?: string;
  maxPrice?: string;
}

const Filter = ({
  categories,
  category: defaultCategory,
  maxPrice: defaultMaxPrice = "0",
  search: defaultSearch,
}: FilterProps) => {
  const [category, setCategory] = useState(defaultCategory || 'default');
  const [search, setSearch] = useState(defaultSearch || "");
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
  const onClick = () => {
    let queryParams = "";
    
    if (category && category !== 'default') {
      queryParams += `&category=${category}`;
    }

    if (search) {
      queryParams += `&search=${search}`;
    }

    if (maxPrice && maxPrice !== "0") {
      queryParams += `&maxPrice=${maxPrice}`;
    }

    redirect(`/users/products?${queryParams}`);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label>Category:</label>
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
             <option key={'default'} value={'default'}>
              ALL
            </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Search:</label>
        <input
          type="string"
          value={search}
          className={styles.input}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
        />
      </div>

      <div className={styles.filterGroup}>
        <label>Max Price:</label>
        <input
          type="number"
          className={styles.input}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button className={styles.submitButton} onClick={() => onClick()}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
