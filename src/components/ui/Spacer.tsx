import React from 'react';

interface SpacerProps {
  spaceMultiplier?: number;
}

const Spacer = (props: SpacerProps) => (
  <div
    style={{ width: '100%', height: `${(props.spaceMultiplier || 1) * 8}px` }}
  />
);

export default Spacer;
