import React from 'react';

import { CdsIcon } from '@clr/react/icon';
import { ClarityIcons, cogIcon } from '@clr/core/icon';

ClarityIcons.addIcons(cogIcon);

export default function Test() {
  return (
    <div>
      <CdsIcon shape='cog' />
    </div>
  );
}
