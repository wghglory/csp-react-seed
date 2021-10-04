import { l10n } from '../i18n/i18nUtils';
import { UserCds, UserRole } from '../models';
import { PATH_CLOUD_CONNECTION, PATH_TENANTS, PATH_CLOUD_SERVICE, PATH_API_TOKEN, PATH_ABOUT } from './const';

interface NavItem {
  to: string;
  title: string;
  roles: UserRole[];
}

const navMenus: NavItem[] = [
  {
    title: l10n('common.cloudConnection'),
    to: PATH_CLOUD_CONNECTION,
    roles: [UserRole.PROVIDER_ADMIN],
  },
  {
    title: l10n('common.tenants'),
    to: PATH_TENANTS,
    roles: [UserRole.PROVIDER_ADMIN],
  },
  {
    title: l10n('common.cloudServices'),
    to: PATH_CLOUD_SERVICE,
    roles: [UserRole.TENANT_ADMIN, UserRole.TENANT_USER],
  },
  {
    title: l10n('common.apiToken'),
    to: PATH_API_TOKEN,
    roles: [UserRole.TENANT_ADMIN],
  },
  {
    title: l10n('common.about'),
    to: PATH_ABOUT,
    roles: [UserRole.PROVIDER_ADMIN, UserRole.TENANT_ADMIN, UserRole.TENANT_USER],
  },
];

function getNavMenuByUser(user: UserCds) {
  return navMenus.filter((item) => {
    // role-based pages
    // if allowing public pages, update NavItem's roles ? undefined type and use below condition
    // return item.roles === undefined || item.roles.includes(user.role);
    return item.roles.includes(user.role);
  });
}

export { navMenus, getNavMenuByUser };
