import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const fadeInSectionStyles = makeStyles((_: Theme) =>
  createStyles({
    fadeInSection: {
      opacity: '0',
      transform: 'translateY(-25px)',
      visibility: 'hidden',
      transition: 'all 1.5s ease-out',
    },
    fadeInSectionVisible: {
      opacity: '1',
      transform: 'none',
      visibility: 'visible',
    },
  }),
);

interface FadeInSectionProps {
  children: JSX.Element[] | JSX.Element;
}

function FadeInSection(props: FadeInSectionProps) {
  let classes = fadeInSectionStyles();

  const [isVisible, setVisible] = useState(false);
  const domRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisible(entry.isIntersecting);
      });
    });
    observer.observe(domRef.current);

    const currentDomRef = domRef.current;

    return () => observer.unobserve(currentDomRef);
  }, []);

  return (
    <div
      className={[
        classes.fadeInSection,
        isVisible ? classes.fadeInSectionVisible : '',
      ].join(' ')}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default FadeInSection;
