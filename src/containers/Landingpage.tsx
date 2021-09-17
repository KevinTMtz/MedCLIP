import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';

const landingpageStyles = makeStyles((_: Theme) =>
  createStyles({
    mainDiv: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    mainTitleImg: {
      position: 'absolute',
      width: '100%',
      height: 'calc(100% - 48px)',
      right: '0',
      objectFit: 'cover',
      objectPosition: '75%',
    },
    mainTitleDiv: {
      position: 'absolute',
      width: '100%',
      height: 'calc(100% - 48px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(50, 50, 50, 0.15)',
      color: 'white',
      fontSize: '8vw',
    },
    divMargins: {
      margin: '0 32px',
    },
  }),
);

const Landingpage = () => {
  const classes = landingpageStyles();

  const screenHeight = use100vh();

  return (
    <div className={classes.mainDiv}>
      <div style={{ height: `calc(${screenHeight}px - 48px)` }}>
        <img
          alt='Title backgound'
          className={classes.mainTitleImg}
          src='https://img.freepik.com/free-vector/abstract-molecules-dark-blue-background-molecular-structures-dna-strand-neural-network-genetic-engineering-scientific-technological-concept_120542-574.jpg'
        />
        <div className={classes.mainTitleDiv}>
          <h1>
            <strong>MedCLIP</strong>
          </h1>
        </div>
      </div>
      <div className={classes.divMargins}>
        <h1>What we offer?</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default Landingpage;
