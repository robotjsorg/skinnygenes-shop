import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
    const { quantity } = useParams<{ quantity: string }>();
    const productName = 'Chem 91 x Problem Child';
    const description = `${quantity} '${productName}' seeds. This strain is Chem 91 S1 crossed into Problem Child F2`;

    return (
        <div>
            <h1>{productName}</h1>
            <p>{description}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default ProductDetailPage;