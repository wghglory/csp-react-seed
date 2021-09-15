import React, { useEffect } from 'react';

import { CdsIcon } from '@clr/react/icon';
import { ClarityIcons, cogIcon } from '@clr/core/icon';

ClarityIcons.addIcons(cogIcon);

export default function Test() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <CdsIcon shape='cog' />
    </div>
  );
}
