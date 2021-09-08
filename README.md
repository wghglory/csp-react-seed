# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

`npx create-react-app csp-react-seed --template typescript`

- create-react-app: 4.0.3
- node: 16.8.0
- npm: 7.21.0

## Dev Setup

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
