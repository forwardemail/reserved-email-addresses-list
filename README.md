# reserved-email-addresses-list

[![build status](https://img.shields.io/travis/com/forwardemail/reserved-email-addresses-list.svg)](https://travis-ci.com/forwardemail/reserved-email-addresses-list)
[![code coverage](https://img.shields.io/codecov/c/github/forwardemail/reserved-email-addresses-list.svg)](https://codecov.io/gh/forwardemail/reserved-email-addresses-list)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/forwardemail/reserved-email-addresses-list.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/reserved-email-addresses-list.svg)](https://npm.im/reserved-email-addresses-list)

> List of 1250+ email addresses reserved for security concerns


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [List](#list)
* [References](#references)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install reserved-email-addresses-list validator nodemailer
```

[yarn][]:

```sh
yarn add reserved-email-addresses-list email-addresses
```


## Usage

The string you are comparing with must be converted to lowercase and trimmed of whitespace. The reason we are converting to lowercase is because the dictionary of words we are comparing with are all lowercase, and in order to compare for strict equality, we must have matching case.

It is also highly recommended that you check for strict equality, and for a list of admin-related usernames, you should check for strict equality, starts with, or ends with comparisons as well.

```js
const reservedEmailAddressesList = require('reserved-email-addresses-list');
const reservedAdminList = require('reserved-email-addresses-list/admin-list.json');
const emailAddresses = require('email-addresses');

const email = '"Admin***!!!"@example.com';
const parsed = emailAddresses.parseOneAddress(email);

if (parsed === null)
  throw new Error('Email was not a valid address');

const str = parsed.local.toLowerCase();

let reservedMatch = reservedEmailAddressesList.find(addr => addr === str);

if (!reservedMatch)
  reservedMatch = reservedAdminList.find(
    addr => addr === str || str.startsWith(addr) || str.endsWith(addr)
  );

if (reservedMatch)
  throw new Error(
    'User must be a domain admin to create an alias with a reserved word (see https://forwardemail.net/reserved-email-addresses).'
  );
```


## List

See [index.json](index.json) for the complete list of all reserved email addresses, and [admin-list.json](admin-list.json) for the list of all reserved admin names.


## References

* <https://webmasters.stackexchange.com/questions/104811/is-there-any-list-of-email-addresses-reserved-because-of-security-concerns-for-a?noredirect=1&lq=1>
* <https://support.google.com/a/answer/6093413?hl=en>
* <https://docs.google.com/spreadsheets/d/1Gj1LidTJgA1TgOjhxTaoQKaZTvV2-xZlvo9XEsBnZ5I/edit#gid=0>
* <https://gist.github.com/riaf/9067235>
* <https://gist.github.com/citrusui/d755cf6bf8374d413fe8f453fa40f0c6>
* <https://www.npmjs.com/package/reserved-usernames>
* <https://help.salesforce.com/articleView?id=pardot_admin_role_based_email_address.htm&type=5>
* <https://www.entrustdatacard.com/blog/2015/march/what-happened-with-livefi>


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
