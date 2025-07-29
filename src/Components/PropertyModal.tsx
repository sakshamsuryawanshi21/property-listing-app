import React from 'react';
import { Property } from '../Context/PropertyContext';

interface Props {
  property: Property;
  onClose: () => void;
  isDark: boolean;
}

const PropertyModal: React.FC<Props> = ({ property, onClose, isDark }) => {
  return (
    <div style={overlayStyle}>
<div style={modalStyle(isDark)}>
<button
  onClick={onClose}
  style={{
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: isDark ? 'white' : 'black'
  }}
>
  ×
</button>

        <h2>{property.name}</h2>
        <p><strong>Type:</strong> {property.type}</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Price:</strong> ₹{property.price}</p>
        <p><strong>Description:</strong> {property.description}</p>

        {/* Image placeholder */}
        <img
        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"

          alt="property"
          style={{ width: '100%', marginTop: '1rem', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};


const modalStyle = (isDark: boolean): React.CSSProperties => ({
  backgroundColor: isDark ? '#1e1e1e' : 'white',
  color: isDark ? 'white' : 'black',
  padding: '2rem',
  borderRadius: '8px',
  width: '400px',
  position: 'relative'
});

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer'
};

export default PropertyModal;
