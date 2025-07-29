import React from 'react';
import { Property } from '../Context/PropertyContext';

interface Props {
  property: Property;
  onView: (property: Property) => void;
  isDark: boolean; // ✅ Add this line
}
const PropertyCard: React.FC<Props> = ({ property, onView, isDark }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: isDark ? '#1e1e1e' : '#fff',
    color: isDark ? 'white' : 'black',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '0.75rem'
  };
    return (
    <div style={cardStyle}>
      {property.imageUrl && (
        <img src={property.imageUrl} alt={property.name} style={imageStyle} />
      )}
      <h2>{property.name}</h2>
      <p><strong>Type:</strong> {property.type}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> ₹{property.price}</p>
      <p>{property.description.slice(0, 60)}...</p>
      <button onClick={() => onView(property)} style={{
        marginTop: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: isDark ? '#444' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        View Details
      </button>
    </div>
  );
};


export default PropertyCard;
