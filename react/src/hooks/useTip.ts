import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const tips = [
  'Evita que alguien conozca tu rutina diaria.',
  'Antes de subir a un taxi verifica que la puerta por la que subiste no tiene seguro de niños por lo que puede ser abierta desde adentro.',
  'Evita conversar con desconocidos.',
  'Manten al tanto a tus seres queridos en caso de no contar con la compañía de ningún conocido al trasladarte.',
];

const useTip = () => {
  const [tip, setTip] = useState('');

  const handleTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  };

  useFocusEffect(
    useCallback(() => {
      handleTip();
      return () => setTip('');
    }, []),
  );

  return {
    tip,
  };
};

export default useTip;
