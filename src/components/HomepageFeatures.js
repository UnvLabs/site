import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Syntax sugar',
    icon: '🍬',
    description: (
      <>
        The syntax of Unv language is inspired by Python. So It's nearly similar to English.
        Instead of too many brackets, it depends on whitespaces.
      </>
    ),
  },
  {
    title: 'Universal',
    icon: '🌐',
    description: (
      <>
        Compilers convert Unv language to existing languages.(currently JavaScript, more coming soon).
        Use Unv for your web, mobile, desktop or IOT application.
      </>
    ),
  },
  {
    title: 'Friendly',
    icon: '🤝',
    description: (
      <>
        As Unvlang is universal, It can import your favourite library.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <p className={styles.featureIcon} alt={title}>{icon}</p>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
