import React from 'react';

import { l10n } from '../i18n/i18nUtils';

export default function NotFoundPage() {
  return (
    <div cds-layout='vertical gap:md align:center'>
      <h1 cds-text='title' className='mb-8'>
        {l10n('common.notFound')}
      </h1>
    </div>
  );
}
