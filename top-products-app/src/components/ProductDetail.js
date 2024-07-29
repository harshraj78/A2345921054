import React from 'react';
import { Card } from 'react-bootstrap';

const ProductDetail = ({ product }) => {
  return (
    <Card style={{ width: '100%', margin: '1rem' }}>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <strong>Company:</strong> {product.company}<br />
          <strong>Category:</strong> {product.category}<br />
          <strong>Price:</strong> ${product.price}<br />
          <strong>Rating:</strong> {product.rating}<br />
          <strong>Discount:</strong> {product.discount}%<br />
          <strong>Availability:</strong> {product.availability}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductDetail;