import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import axios from 'axios';
import { API_PREFIX } from '../api/api'; // ✅ Central API prefix

//  Define the property type
export interface Property {
  id: string;
  name: string;
  type: string;
  price: number;
  location: string;
  description: string;
  imageUrl?: string; //  optional image field
}


//  Context shape
interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
}

//  Create context
const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

//  Provider implementation
export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  //  Fetch properties from mock API
  const fetchProperties = async () => {
  try {
    const res = await axios.get(`${API_PREFIX}/propeties`);
    setProperties(res.data);
  } catch (error) {
    console.error('Error fetching properties:', error);
  }
};


  useEffect(() => {
    fetchProperties();
  }, []);

  // Add property (POST to mock API)
  const addProperty = async (property: Omit<Property, 'id'>) => {
  try {
    const res = await axios.post(`${API_PREFIX}/propeties`, property);
    setProperties([...properties, res.data]);
  } catch (error) {
    console.error("Add Property Failed", error);
  }
};


  return (
    <PropertyContext.Provider value={{ properties, addProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

//  Hook to access context
export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
