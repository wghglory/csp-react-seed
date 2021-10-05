import React, { FC } from 'react';
import { l10n } from '../i18n/i18nUtils';

import mspSvg from '../static/images/msp.svg';
import cloudSvg from '../static/images/cloud.svg';
import numerousSvg from '../static/images/numerous.svg';
import cashSvg from '../static/images/cash.svg';

export default function HomePage() {
  return (
    <main className='flex flex-col justify-center items-center flex-1 p-9 bg-cds-light dark:bg-cds-dark'>
      <h1 cds-text='display' className='mb-4'>
        {l10n('home.title')}
      </h1>
      <h2 cds-text='subtitle' className='mb-12 sm:mb-24'>
        {l10n('home.subtitle')}
      </h2>
      <section className='grid gap-x-14 gap-y-10 sm:gap-y-28 sm:grid-cols-2 md:px-16 pb-10'>
        <FeatureCard svgSrc={mspSvg} title={l10n('home.section1Title')} content={l10n('home.section1Content')} />
        <FeatureCard svgSrc={cloudSvg} title={l10n('home.section2Title')} content={l10n('home.section2Content')} />
        <FeatureCard svgSrc={numerousSvg} title={l10n('home.section3Title')} content={l10n('home.section3Content')} />
        <FeatureCard svgSrc={cashSvg} title={l10n('home.section4Title')} content={l10n('home.section4Content')} />
      </section>
    </main>
  );
}

type FeatureCardProps = { svgSrc: string; title: string; content: string };

const FeatureCard: FC<FeatureCardProps> = ({ svgSrc, title, content }) => {
  return (
    <div className='flex gap-4'>
      <img src={svgSrc} alt={title} className='w-14'></img>
      <div className='flex flex-col justify-center'>
        <h3 cds-text='subtitle' className='mb-6'>
          {title}
        </h3>
        <p cds-text='body'>{content}</p>
      </div>
    </div>
  );
};
