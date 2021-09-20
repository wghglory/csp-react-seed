# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

`npx create-react-app csp-react-seed --template typescript`

- create-react-app: 4.0.3
- node: 16.8.0
- npm: 7.21.0

## Dev Setup

1. Make sure in the /etc/hosts

```
127.0.0.1 pcdl-stg.vmware.com
```

2. Make sure client registry have redirectUris https://pcdl-stg.vmware.com:3300

Postman, `PATCH https://console-stg.cloud.vmware.com/csp/gateway/am/api/orgs/{{service_org_id}}/oauth-apps/{{oauth_client}}` with `csp-auth-token`

Request Body:

```json
{
  "redirectUris": [
    "https://ara-pcdl-dev.hs-portal.eng.vmware.com",
    "https://pcdl-stg.vmware.com",
    "https://pcdl-stg.vmware.com:3300",
    "https://pcdl-stg.vmware.com/auth_callback",
    "https://dev0.pcdl-decc.hs-portal.eng.vmware.com",
    "https://oss-vcd.eng.vmware.com:18889",
    "https://oss-vcd.eng.vmware.com:18889/auth_callback"
  ]
}
```

### PORT

.env.development:

```
HTTPS=true
PORT=3300
HOST=pcdl-stg.vmware.com
DANGEROUSLY_DISABLE_HOST_CHECK=true
REACT_APP_PRODUCTION_HOST=
```

if PORT=443, you have to use `sudo` for any port under 1024. It's not convenient, so we will use 3300

> Make sure browser proxy is disabled.

### SSL

https://stackoverflow.com/questions/10175812/how-to-generate-a-self-signed-ssl-certificate-using-openssl/10176685#10176685

Run below in the project root folder:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

```
Country Name (2 letter code) []:CN
State or Province Name (full name) []:
Locality Name (eg, city) []:
Organization Name (eg, company) []:
Organizational Unit Name (eg, section) []:
Common Name (eg, fully qualified host name) []:pcdl-stg.vmware.com
Email Address []:
```

Another ref:

- https://medium.com/swlh/how-to-make-react-js-use-https-in-development-4ead560eff10
- https://segmentfault.com/a/1190000037611649

## Important Things

`@vmw/csp-header` seems to have a side effect for clarity core.

1. with clarity core v5.4.0, the icons cannot be loaded successfully if csp-header exists
2. with clarity core v5.5.0, UI is broken with "cannot create proxy with a non-object as target or handler" error.

To avoid above issues, please import `@vmw/csp-header` late after any other components who deal with clarity icon. Hence, as you see, in `App.tsx`, the `CspHeader` is imported at last.
