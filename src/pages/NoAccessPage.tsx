import React from 'react';
import { CdsIcon } from '@cds/react/icon';
import { ClarityIcons, idBadgeIcon } from '@cds/core/icon';

ClarityIcons.addIcons(idBadgeIcon);

export default function NoAccessPage() {
  return (
    <div className='center-container'>
      <section className='text-center px-12' aria-label="You don't have access">
        <CdsIcon badge='warning-triangle' size='120' shape='id-badge'></CdsIcon>
        <div>
          <h1 className='py-8' cds-text='title'>
            Either your current organization <b></b>or user does not have access to this service.
          </h1>
          <p cds-text='body' className='px-10 leading-4'>
            We could not find any other organization associated to your account. Please create or join a new
            organization and request access to this service on &nbsp;
            <a title='VMware CloudServices' cds-text='link' href='https://console-stg.cloud.vmware.com'>
              VMware Cloud Services
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
