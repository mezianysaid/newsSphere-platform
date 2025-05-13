import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.scss";

const ProductList = ({ products }) => {
  if (!products.length) {
    return (
      <div className="no-results">
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <Grid container spacing={3} className="product-list">
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
