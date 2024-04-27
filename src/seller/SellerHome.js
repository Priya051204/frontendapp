import React, { useEffect, useState } from 'react';
import config from '../config'

export default function SellerHome() {
  const [sellerData, setSellerData] = useState("");

  useEffect(() => {
    const storedSellerData = localStorage.getItem('retailer');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData)
    }
  }, []);

  return (
    <div>
      {sellerData && (
        <div>
          <h4>Welcome {sellerData.fullname}</h4>
        </div>
      )}
    </div>
  );
}