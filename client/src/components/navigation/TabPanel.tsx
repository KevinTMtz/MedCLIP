import React from 'react';
import { Box } from '@material-ui/core';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default TabPanel;
