import React from 'react';
import MenuSelector from './MenuSelector';

interface Menu {
  id: string;
  name: string;
}

const index = async () => {
  const res = await fetch('http://localhost:8000/api/v1/menu');
  const menu: Menu[] = await res.json();

  return <MenuSelector data={menu} />;
};

export default index;
