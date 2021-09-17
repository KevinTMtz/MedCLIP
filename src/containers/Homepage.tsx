import React from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';

import Cases from './cases/Cases';
import Diagnostics from './diagnostics/Diagnostics';
import TabPanel from '../components/navigation/TabPanel';

const Homepage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderColor: 'primary',
            borderBottom: '1px solid #e8e8e8',
          }}
        >
          <Tabs
            variant='fullWidth'
            indicatorColor='primary'
            value={value}
            onChange={handleChange}
          >
            <Tab label='Diagnostics' />
            <Tab label='My Cases' />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Diagnostics />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Cases />
        </TabPanel>
      </Box>
    </div>
  );
};

export default Homepage;
