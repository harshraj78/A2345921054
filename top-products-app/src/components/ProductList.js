import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ProductList = ({ products }) => {
  return (
    <div className="d-flex flex-wrap">
      {products.map((product) => (
        <Card key={product.id} style={{ width: '18rem', margin: '1rem' }}>
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
            <Link to={`/product/${product.id}`}>
              <Button variant="primary">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;