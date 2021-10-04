import React from 'react';
import { isCspMode } from '../constants/common';

/**
 * header doesn't put here cuz we don't want to re-render header when switching route.
 */
export default function ClarityContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <div cds-layout='p:md'>subnav</div>
      <CdsDivider></CdsDivider> */}
      {/* TODO: fix flicker in the AppLoadingSuspense */}
      <main cds-layout='horizontal align:vertical-stretch' style={{ paddingTop: isCspMode ? 0 : '60px' }}>
        {/* <nav cds-layout='p:md p@md:lg'>sidebar</nav>
        <CdsDivider orientation='vertical'></CdsDivider> */}
        <div cds-layout='vertical p:lg align:stretch'>{children}</div>
      </main>
      {/* <CdsDivider></CdsDivider>
      <footer cds-layout='p:md p@md:lg align:shrink' className='footer'>
        footer
      </footer> */}
    </>
  );
}
