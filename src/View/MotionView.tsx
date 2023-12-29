import React from 'react';
import useMotionViewModel from '../ViewModel/MotionViewModel';

const MotionView: React.FC = () => {
  const { isMoving } = useMotionViewModel();

  return (
    <>
      <p>Movimiento: {isMoving ? 'En movimiento' : 'Sin movimiento'}</p>
    </>
  );
};

export default MotionView;