import React, { useState } from 'react';
import { useProperty, Property } from '../Context/PropertyContext';
import PropertyCard from '../Components/PropertyCard';
import AddPropertyForm from '../Components/AddPropertyForm';
import PropertyModal from '../Components/PropertyModal';
import { useTheme } from '../Context/ThemeContext';

const Home: React.FC = () => {
  const { properties } = useProperty();
  const { isDark, toggleTheme } = useTheme();

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleView = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const filteredProperties = properties.filter((property) => {
    const matchType = filterType === 'All' || property.type.toLowerCase() === filterType.toLowerCase();
    const matchSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: isDark ? '#121212' : '#f5f5f5',
        color: isDark ? 'white' : 'black',
        transition: 'all 0.3s ease',
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ flex: 1, padding: '2rem', borderRight: '1px solid #ccc' }}>
        <h1>Property Listing</h1>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isDark ? '#444' : '#ddd',
            color: isDark ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          {isDark ? ' Light Mode' : ' Dark Mode'}
        </button>

        {/* Filter Dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label><strong>Filter by Type:</strong></label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              display: 'block',
              padding: '0.5rem',
              width: '100%',
              marginTop: '0.5rem',
              borderRadius: '4px'
            }}
          >
            <option value="All">All</option>
            <option value="Plot">Plot</option>
            <option value="Shed">Shed</option>
            <option value="Retail Store">Retail Store</option>
          </select>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <label><strong>Search:</strong></label>
          <input
            type="text"
            placeholder="Name or Location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              display: 'block',
              padding: '0.5rem',
              width: '100%',
              marginTop: '0.5rem',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Add Form */}
        <AddPropertyForm />
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: 2, padding: '2rem', overflowY: 'auto' }}>
        {filteredProperties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onView={handleView}
              isDark={isDark}
            />
          ))
        )}
      </div>

      {/* MODAL (on top of everything) */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={handleCloseModal}
          isDark={isDark}
        />
      )}
    </div>
  );
};

export default Home;
