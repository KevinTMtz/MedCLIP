import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { ImageListItem, ImageList } from '@mui/material';
import { use100vh } from 'react-div-100vh';

import FadeInSection from '../components/ui/FadeInSection';
import { styles } from '../styles';
import Spacer from '../components/ui/Spacer';
import Divider from '../components/ui/Divider';

const landingpageStyles = makeStyles((_: Theme) =>
  createStyles({
    mainDiv: {
      textAlign: 'center',
      transition: 'all 1s ease-out',
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(50, 50, 50, 0.15)',
      color: 'white',
    },
    mainTitle: {
      fontSize: '16vw',
      margin: '0',
    },
    mainSubtitle: {
      fontSize: '5vw',
      '@media (max-width: 500px)': {
        fontSize: '7vw',
      },
    },
    divMargins: {
      margin: '0 32px',
    },
  }),
);

const srcset = (image: string, size: number, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};

const Landingpage = () => {
  const classes = styles();
  const classesLandingpage = landingpageStyles();

  let screenHeight = use100vh();

  const photosURLArr = [
    {
      img: 'https://images.unsplash.com/photo-1616012480717-fd9867059ca0',
      title: 'X-ray',
    },
    {
      img: 'https://images.unsplash.com/photo-1564725075388-cc8338732289',
      title: 'X-ray',
    },
    {
      img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5',
      title: 'X-ray',
    },
    {
      img: 'https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68',
      title: 'X-ray',
    },
    {
      img: 'https://images.unsplash.com/photo-1576671414121-aa0c81c869e1',
      title: 'X-ray',
    },
    {
      img: 'https://images.unsplash.com/photo-1522849696084-818b29dfe210',
      title: 'X-ray',
    },
    {
      img: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f',
      title: 'X-ray',
    },
    {
      img: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28',
      title: 'X-ray',
    },
  ];

  return (
    <div className={classesLandingpage.mainDiv}>
      <div style={{ height: `calc(${screenHeight || 1000}px - 48px)` }}>
        <img
          alt='Title backgound'
          className={classesLandingpage.mainTitleImg}
          src='https://img.freepik.com/free-vector/abstract-molecules-dark-blue-background-molecular-structures-dna-strand-neural-network-genetic-engineering-scientific-technological-concept_120542-574.jpg'
        />
        <div className={classesLandingpage.mainTitleDiv}>
          <FadeInSection>
            <h1 className={classesLandingpage.mainTitle}>
              <strong>MedCLIP</strong>
            </h1>
            <p className={classesLandingpage.mainSubtitle}>
              Shaping the future
            </p>
          </FadeInSection>
        </div>
      </div>

      <Spacer spaceMultiplier={6} />
      <div
        className={[classesLandingpage.divMargins, classes.displayRows].join(
          ' ',
        )}
      >
        <FadeInSection>
          <h1>What is MedCLIP?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
        </FadeInSection>
        <Divider />
        <FadeInSection>
          <h1>What we offer?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </FadeInSection>
        <Divider />
        <FadeInSection>
          <h1>How it works?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </FadeInSection>
      </div>
      <Spacer spaceMultiplier={6} />
      <FadeInSection>
        <ImageList cols={4} rowHeight={250}>
          {photosURLArr.map((item) => (
            <ImageListItem key={item.img}>
              <img {...srcset(item.img, 250)} alt={item.title} loading='lazy' />
            </ImageListItem>
          ))}
        </ImageList>
      </FadeInSection>
    </div>
  );
};

export default Landingpage;
