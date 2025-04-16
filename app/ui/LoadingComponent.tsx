// loading.tsx
import React from 'react';
import './loading.css'; // Importa el archivo CSS para el estilo de la ruedita

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
