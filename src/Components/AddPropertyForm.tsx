import React, { useState } from 'react';
import { useProperty } from '../Context/PropertyContext';
import { useTheme } from '../Context/ThemeContext';

const AddPropertyForm: React.FC = () => {
  const { addProperty } = useProperty();
  const { isDark } = useTheme();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type || !price || !location || !description) {
      alert('Please fill all fields!');
      return;
    }

   addProperty({
  name,
  type,
  price: Number(price),
  location,
  description,
} as any); //  use 'as any' only if TS complains


    setName('');
    setType('');
    setPrice('');
    setLocation('');
    setDescription('');
  };

  // ✅ Define styles inside the component
  const formStyle: React.CSSProperties = {
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '2rem',
    backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9',
    color: isDark ? 'white' : 'black'
  };

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: isDark ? '#333' : 'white',
    color: isDark ? 'white' : 'black'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add New Property</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Type (Apartment, Villa, etc.)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...inputStyle, height: '80px' }}
      />
      <button type="submit" style={buttonStyle}>Add Property</button>
    </form>
  );
};

export default AddPropertyForm;
