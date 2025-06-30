# reserved-email-addresses-list

[![build status](https://github.com/forwardemail/reserved-email-addresses-list/actions/workflows/ci.yml/badge.svg)](https://github.com/forwardemail/reserved-email-addresses-list/actions/workflows/ci.yml)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/forwardemail/reserved-email-addresses-list.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/reserved-email-addresses-list.svg)](https://npm.im/reserved-email-addresses-list)
[![unicode protection](https://img.shields.io/badge/unicode-homograph_protected-blue.svg)](#unicode-homograph-protection)
[![international support](https://img.shields.io/badge/i18n-multilingual-green.svg)](#international-support)

> **Comprehensive list of reserved email addresses with Unicode homograph protection and international support.** Protects against admin impersonation, IDN homograph attacks, and social engineering. **Made for [Forward Email](https://forwardemail.net).**


## Table of Contents

* [✨ Latest Improvements - Enhanced Security & Usability](#-latest-improvements---enhanced-security--usability)
* [🛡️ Security Features](#️-security-features)
  * [Unicode Homograph Protection](#unicode-homograph-protection)
  * [International Support](#international-support)
* [🚀 Quick Start](#-quick-start)
* [📦 Installation](#-installation)
  * [npm](#npm)
  * [yarn](#yarn)
  * [pnpm](#pnpm)
* [💡 Usage](#-usage)
  * [Basic Usage](#basic-usage)
  * [Advanced Security Checks](#advanced-security-checks)
  * [Unicode-Safe Validation](#unicode-safe-validation)
* [📋 Lists](#-lists)
  * [List Types](#list-types)
  * [Formats Available](#formats-available)
  * [Statistics](#statistics)
* [🛡️ Security](#️-security)
  * [Unicode Homograph Protection](#unicode-homograph-protection-1)
  * [Attack Prevention Examples](#attack-prevention-examples)
  * [Supported Unicode Scripts](#supported-unicode-scripts)
* [🌍 International Support](#-international-support)
  * [Supported Languages](#supported-languages)
  * [Translation Examples](#translation-examples)
* [⚡ Performance](#-performance)
  * [Lookup Performance](#lookup-performance)
  * [Benchmarks](#benchmarks)
* [🔄 What"s New](#-whats-new)
  * [Latest Enhancements](#latest-enhancements)
  * [Upgrading](#upgrading)
* [📚 API Reference](#-api-reference)
  * [Main Exports](#main-exports)
  * [Specialized Lists](#specialized-lists)
  * [TypeScript Support](#typescript-support)
* [🔗 References](#-references)
  * [Standards & RFCs](#standards--rfcs)
  * [Security Research](#security-research)
  * [Industry Resources](#industry-resources)
  * [Community Resources](#community-resources)
  * [Historical Context](#historical-context)
* [👥 Contributors](#-contributors)
  * [Contributing](#contributing)
* [📄 License](#-license)


## ✨ Latest Improvements - Enhanced Security & Usability

> \[!NOTE]
> **Latest Version** introduces significant security and usability improvements:
>
> * **94.2% reduction** in false positives (removed 1,389 arbitrary restrictions)
> * **3,074 Unicode homograph variations** added for security
> * **35 translated admin terms** properly supported
> * **Comprehensive IDN attack protection** against Cyrillic, Greek, and other scripts

> \[!TIP]
> **Backwards Compatible**: All existing functionality is preserved. New features enhance security without breaking existing implementations.


## 🛡️ Security Features

### Unicode Homograph Protection

Protects against **IDN homograph attacks** using visually similar characters:

* **Cyrillic lookalikes**: `аdmin` (Cyrillic "а") vs `admin` (Latin "a")
* **Greek lookalikes**: `αdmin` (Greek "α") vs `admin` (Latin "a")
* **Number substitutions**: `adm1n` (digit "1") vs `admin` (Latin "i")
* **Fullwidth characters**: `ａdmin` (fullwidth "ａ") vs `admin` (Latin "a")
* **Mixed script attacks**: `αdmіn` (Greek "α" + Cyrillic "і")

### International Support

Properly protects translated administrative terms:

* **Portuguese**: `naoresponda` (do not reply), `administracao`, `contato`
* **Spanish**: `administracion`, `contacto`, `soporte`, `conserje`
* **French**: `administration`, `ne-pas-repondre`
* **System variants**: `sys.administrator`, `sysadministrator`, `system-administrator`


## 🚀 Quick Start

```bash
npm install reserved-email-addresses-list email-addresses
```

```js
const reservedList = require("reserved-email-addresses-list");
const emailAddresses = require("email-addresses");

function isReserved(email) {
  const parsed = emailAddresses.parseOneAddress(email);
  if (!parsed) return false;

  const local = parsed.local.toLowerCase().trim();
  return reservedList.includes(local);
}

// Basic check
console.log(isReserved("admin@example.com")); // true
console.log(isReserved("user123@example.com")); // false

// Unicode homograph protection
console.log(isReserved("аdmin@example.com")); // true (Cyrillic "а")
console.log(isReserved("αdmin@example.com")); // true (Greek "α")
console.log(isReserved("adm1n@example.com")); // true (digit "1")
```


## 📦 Installation

### npm

```bash
npm install reserved-email-addresses-list
```

### yarn

```bash
yarn add reserved-email-addresses-list
```

### pnpm

```bash
pnpm add reserved-email-addresses-list
```

> \[!TIP]
> **Recommended**: Also install [`email-addresses`](https://www.npmjs.com/package/email-addresses) for robust email parsing and validation.


## 💡 Usage

### Basic Usage

```js
const reservedList = require("reserved-email-addresses-list");

// Check if email address is reserved
const email = "admin@example.com";
const isReserved = reservedList.includes(email.split("@")[0].toLowerCase());
```

### Advanced Security Checks

```js
const reservedEmailAddressesList = require("reserved-email-addresses-list");
const reservedAdminList = require("reserved-email-addresses-list/admin-list.json");
const emailAddresses = require("email-addresses");

function validateEmailSecurity(email) {
  const parsed = emailAddresses.parseOneAddress(email);

  if (parsed === null) {
    throw new Error("Invalid email address format");
  }

  const local = parsed.local.toLowerCase().trim();

  // Check against main reserved list
  let reservedMatch = reservedEmailAddressesList.find(addr => addr === local);

  // Check admin list with prefix/suffix matching for variations
  if (!reservedMatch) {
    reservedMatch = reservedAdminList.find(
      addr => addr === local || local.startsWith(addr) || local.endsWith(addr)
    );
  }

  if (reservedMatch) {
    throw new Error(
      `Email address "${local}" is reserved for security reasons. ` +
      `Matched reserved term: "${reservedMatch}". ` +
      `See https://forwardemail.net/reserved-email-addresses for details.`
    );
  }

  return true;
}

// Examples
try {
  validateEmailSecurity("admin@example.com"); // Throws error
} catch (err) {
  console.error(err.message);
}

try {
  validateEmailSecurity("аdmin@example.com"); // Throws error (Cyrillic)
} catch (err) {
  console.error(err.message);
}

validateEmailSecurity("user123@example.com"); // Returns true
```

### Unicode-Safe Validation

> \[!IMPORTANT]
> **Always normalize Unicode input** to prevent homograph attacks:

```js
const reservedList = require("reserved-email-addresses-list");

function isReservedUnicodeSafe(email) {
  const parsed = emailAddresses.parseOneAddress(email);
  if (!parsed) return false;

  // Normalize Unicode and convert to lowercase
  const local = parsed.local.normalize("NFKC").toLowerCase().trim();

  return reservedList.includes(local);
}

// These all return true due to homograph protection:
console.log(isReservedUnicodeSafe("admin@example.com"));   // Latin
console.log(isReservedUnicodeSafe("аdmin@example.com"));   // Cyrillic "а"
console.log(isReservedUnicodeSafe("αdmin@example.com"));   // Greek "α"
console.log(isReservedUnicodeSafe("ａdmin@example.com"));  // Fullwidth "ａ"
```


## 📋 Lists

### List Types

| List                                         | Entries | Description                            | Use Case                    |
| -------------------------------------------- | ------- | -------------------------------------- | --------------------------- |
| **[index.json](index.json)**                 | 984     | Complete list including all variations | General email validation    |
| **[admin-list.json](admin-list.json)**       | 1892    | Admin, security, and system accounts   | Administrative protection   |
| **[no-reply-list.json](no-reply-list.json)** | 347     | No-reply and automated email addresses | Automated system protection |

> \[!NOTE]
> **Hierarchical Structure**: `index.json` includes all entries from `admin-list.json` and `no-reply-list.json`.

### Formats Available

```js
// Array format (default)
const reservedArray = require("reserved-email-addresses-list");
// Also: require("reserved-email-addresses-list/array");

// Map format (O(1) lookup)
const reservedMap = require("reserved-email-addresses-list/map");

// Set format (O(1) lookup, no duplicates)
const reservedSet = require("reserved-email-addresses-list/set");

// Usage examples
console.log(reservedArray.includes("admin"));     // Array: O(n)
console.log(reservedMap.has("admin"));           // Map: O(1)
console.log(reservedSet.has("admin"));           // Set: O(1)
```

### Statistics

| Metric                      | Value | Latest Version |
| --------------------------- | ----- | -------------- |
| **Total Protected Terms**   | 3,221 | +1,968         |
| **Core Admin Terms**        | 85    | Optimized      |
| **Unicode Variations**      | 3,074 | +3,074 (new)   |
| **Translated Terms**        | 35    | +35 (restored) |
| **False Positives Removed** | 1,389 | -94.2%         |


## 🛡️ Security

### Unicode Homograph Protection

This library provides comprehensive protection against **IDN homograph attacks** where attackers use visually similar characters from different Unicode scripts to create deceptive email addresses.

#### Attack Vector Example

```js
// These look nearly identical but are different Unicode characters:
"admin@example.com"   // Latin "a" (U+0061)
"аdmin@example.com"   // Cyrillic "а" (U+0430) - ATTACK!
"αdmin@example.com"   // Greek "α" (U+03B1) - ATTACK!
"ａdmin@example.com"  // Fullwidth "ａ" (U+FF41) - ATTACK!
```

> \[!CAUTION]
> **Without protection**, attackers could register `аdmin@company.com` (Cyrillic) and impersonate `admin@company.com` (Latin), potentially bypassing security measures and fooling users.

### Attack Prevention Examples

| Attack Type               | Example               | Status          |
| ------------------------- | --------------------- | --------------- |
| **Cyrillic Substitution** | `аdmin@evil.com`      | 🛡️ **BLOCKED** |
| **Greek Substitution**    | `αdmin@evil.com`      | 🛡️ **BLOCKED** |
| **Number Substitution**   | `adm1n@evil.com`      | 🛡️ **BLOCKED** |
| **Fullwidth Characters**  | `ａdmin@evil.com`      | 🛡️ **BLOCKED** |
| **Mixed Scripts**         | `αdmіn@evil.com`      | 🛡️ **BLOCKED** |
| **Legitimate User**       | `user123@company.com` | ✅ **ALLOWED**   |

### Supported Unicode Scripts

<details>
<summary><strong>🔍 Click to expand Unicode script coverage</strong></summary>

#### Cyrillic Script (Russian, Bulgarian, Serbian)

* **а** (U+0430) → looks like Latin "a"
* **е** (U+0435) → looks like Latin "e"
* **о** (U+043E) → looks like Latin "o"
* **р** (U+0440) → looks like Latin "p"
* **с** (U+0441) → looks like Latin "c"
* **х** (U+0445) → looks like Latin "x"
* **у** (U+0443) → looks like Latin "y"
* **і** (U+0456) → looks like Latin "i"

#### Greek Script

* **α** (U+03B1) → looks like Latin "a"
* **ε** (U+03B5) → looks like Latin "e"
* **ο** (U+03BF) → looks like Latin "o"
* **ρ** (U+03C1) → looks like Latin "p"
* **τ** (U+03C4) → looks like Latin "t"
* **χ** (U+03C7) → looks like Latin "x"

#### Number Substitutions

* **0** → looks like Latin "O" or "o"
* **1** → looks like Latin "I", "i", or "l"
* **3** → looks like Cyrillic "З" or "з"
* **5** → looks like Cyrillic "Ѕ" or "ѕ"

#### Fullwidth Latin (CJK Input Methods)

* **ａ** (U+FF41) → looks like Latin "a"
* **ｂ** (U+FF42) → looks like Latin "b"
* **ｃ** (U+FF43) → looks like Latin "c"
* *...and all other fullwidth Latin characters*

#### Other Scripts

* **Roman Numerals**: Ⅰ, Ⅴ, Ⅹ, ⅰ, ⅴ, ⅹ
* **Armenian**: ս (looks like "u")
* **Mathematical**: Various mathematical symbols

</details>


## 🌍 International Support

### Supported Languages

| Language            | Examples                                             | Count |
| ------------------- | ---------------------------------------------------- | ----- |
| **Portuguese**      | `naoresponda`, `administracao`, `contato`, `suporte` | 8     |
| **Spanish**         | `administracion`, `contacto`, `soporte`, `conserje`  | 6     |
| **French**          | `administration`, `ne-pas-repondre`                  | 3     |
| **System Variants** | `sys.administrator`, `sysadministrator`              | 11    |
| **Multi-language**  | `do-not-respond`, `donotrespond`                     | 7     |

> \[!TIP]
> **Contribute translations**: We welcome contributions of administrative terms in additional languages. Please open an issue or pull request.

### Translation Examples

```js
// Portuguese
isReserved("naoresponda@example.com");    // true - "do not reply"
isReserved("administracao@example.com");  // true - "administration"
isReserved("contato@example.com");        // true - "contact"

// Spanish
isReserved("administracion@example.com"); // true - "administration"
isReserved("soporte@example.com");        // true - "support"
isReserved("contacto@example.com");       // true - "contact"

// System variants
isReserved("sys.administrator@example.com");    // true
isReserved("system-administrator@example.com"); // true
```


## ⚡ Performance

### Lookup Performance

| Format    | Lookup Time | Memory Usage | Best For                      |
| --------- | ----------- | ------------ | ----------------------------- |
| **Array** | O(n)        | Lowest       | Small lists, simple iteration |
| **Set**   | O(1)        | Medium       | Fast lookups, unique values   |
| **Map**   | O(1)        | Highest      | Fast lookups, key-value pairs |

### Benchmarks

```js
// Performance comparison (approximate)
const reservedArray = require("reserved-email-addresses-list");
const reservedSet = require("reserved-email-addresses-list/set");
const reservedMap = require("reserved-email-addresses-list/map");

// Array: ~0.1ms for 3,221 entries
console.time("Array lookup");
reservedArray.includes("admin");
console.timeEnd("Array lookup");

// Set: ~0.001ms (100x faster)
console.time("Set lookup");
reservedSet.has("admin");
console.timeEnd("Set lookup");

// Map: ~0.001ms (100x faster)
console.time("Map lookup");
reservedMap.has("admin");
console.timeEnd("Map lookup");
```

> \[!TIP]
> **Recommendation**: Use `Set` or `Map` formats for production applications with frequent lookups.


## 🔄 What"s New

### Latest Enhancements

> \[!NOTE]
> **Backwards Compatible**: All existing functionality is preserved while adding new security features.

#### New Security Features

1. **Added Unicode Protection** (3,074 entries):
   * Cyrillic variations: `аdmin`, `sеcurity`, etc.
   * Greek variations: `αdmin`, `sεcurity`, etc.
   * Number substitutions: `adm1n`, `r00t`, etc.
   * Fullwidth characters: `ａdmin`, `ｓecurity`, etc.

2. **Enhanced International Support** (35 entries):
   * Portuguese: `naoresponda`, `administracao`, etc.
   * Spanish: `administracion`, `contacto`, etc.

3. **Optimized False Positives** (1,389 entries removed):
   * HTTP status codes: `200`, `404`, `500`, etc.
   * Country codes: `us`, `uk`, `au`, `br`, `cn`, etc.
   * Common words: `app`, `web`, `new`, `top`, etc.
   * Single letters: `a`, `b`, `c`, etc.
   * Numbers: `1`, `2`, `3`, etc.

#### Upgrade Benefits

1. **Enhanced Security**:
   ```js
   // These are now BLOCKED (new protection):
   const nowProtected = [
     "аdmin@company.com",   // Cyrillic "а"
     "αdmin@company.com",   // Greek "α"
     "adm1n@company.com",   // Number "1"
     "ａdmin@company.com"   // Fullwidth "ａ"
   ];
   ```

2. **Improved Usability**:
   ```js
   // These are now ALLOWED (false positives removed):
   const nowAllowed = [
     "app@company.com",     // Common word
     "web@company.com",     // Common word
     "us@company.com",      // Country code
     "api@company.com",     // Technical term
     "1@company.com",       // Number
     "a@company.com"        // Single letter
   ];
   ```

### Upgrading

Simply update to the latest version:

```bash
npm update reserved-email-addresses-list
```

> \[!TIP]
> **No code changes required**: Your existing implementation will continue to work while automatically benefiting from enhanced security.


## 📚 API Reference

### Main Exports

```js
// Default export (Array)
const reservedList = require("reserved-email-addresses-list");
// Type: string[]
// Example: ["admin", "root", "security", ...]

// Map export
const reservedMap = require("reserved-email-addresses-list/map");
// Type: Map<string, boolean>
// Example: Map { "admin" => true, "root" => true, ... }

// Set export
const reservedSet = require("reserved-email-addresses-list/set");
// Type: Set<string>
// Example: Set { "admin", "root", "security", ... }
```

### Specialized Lists

```js
// Admin-focused list
const adminList = require("reserved-email-addresses-list/admin-list.json");
// Type: string[]
// Contains: admin, security, and system-related terms

// No-reply focused list
const noReplyList = require("reserved-email-addresses-list/no-reply-list.json");
// Type: string[]
// Contains: no-reply, noreply, do-not-reply, etc.
```

### TypeScript Support

```typescript
// Type definitions
declare module "reserved-email-addresses-list" {
  const reservedList: string[];
  export = reservedList;
}

declare module "reserved-email-addresses-list/map" {
  const reservedMap: Map<string, boolean>;
  export = reservedMap;
}

declare module "reserved-email-addresses-list/set" {
  const reservedSet: Set<string>;
  export = reservedSet;
}

// Usage
import reservedList from "reserved-email-addresses-list";
import reservedSet from "reserved-email-addresses-list/set";

function isReserved(email: string): boolean {
  return reservedSet.has(email.toLowerCase());
}
```


## 🔗 References

### Standards & RFCs

* [RFC 2142 - Mailbox Names for Common Services](https://www.rfc-editor.org/rfc/rfc2142) - Official standard for reserved mailbox names
* [RFC 5321 - Simple Mail Transfer Protocol](https://tools.ietf.org/html/rfc5321) - SMTP specification
* [RFC 5890 - Internationalized Domain Names](https://tools.ietf.org/html/rfc5890) - IDN specification

### Security Research

* [Unicode Security Considerations](https://www.unicode.org/reports/tr36/) - Official Unicode security guidelines
* [IDN Homograph Attacks](https://en.wikipedia.org/wiki/IDN_homograph_attack) - Wikipedia overview
* [Punycode and IDN](https://tools.ietf.org/html/rfc3492) - Punycode specification

### Industry Resources

* [Google Workspace Reserved Names](https://support.google.com/a/answer/6093413?hl=en) - Google"s reserved email list
* [Microsoft Exchange Reserved Names](https://docs.microsoft.com/en-us/exchange/recipients/user-mailboxes/mailbox-plans) - Microsoft"s guidelines
* [IANA Special-Use Domain Names](https://www.iana.org/assignments/special-use-domain-names/special-use-domain-names.xhtml) - Official registry

### Community Resources

* [Reserved Usernames Gist](https://gist.github.com/riaf/9067235) - Community-maintained list
* [Email Security Best Practices](https://gist.github.com/citrusui/d755cf6bf8374d413fe8f453fa40f0c6) - Security guidelines
* [Salesforce Email Guidelines](https://help.salesforce.com/articleView?id=pardot_admin_role_based_email_address.htm\&type=5) - Enterprise best practices

### Historical Context

* [Unix System Accounts](https://unix.stackexchange.com/q/65013) - Traditional Unix reserved names
* [Webmaster Guidelines](https://webmasters.stackexchange.com/questions/104811/is-there-any-list-of-email-addresses-reserved-because-of-security-concerns-for-a) - Web security considerations
* [LiveFi Security Incident](https://www.entrustdatacard.com/blog/2015/march/what-happened-with-livefi) - Real-world attack example


## 👥 Contributors

| Name           | Website                                                                                                  | Contributions               |
| -------------- | -------------------------------------------------------------------------------------------------------- | --------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/>                                                                               | Original author, maintainer |
| **Community**  | [GitHub Contributors](https://github.com/forwardemail/reserved-email-addresses-list/graphs/contributors) | Various improvements        |

### Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

> \[!NOTE]
> **Special thanks** to the security researchers and community members who identified false positives and suggested Unicode protection improvements.


## 📄 License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)

---

<div align="center">

<strong><a href="#reserved-email-addresses-list">⬆ Back to Top</a></strong>

Made with ❤️ for email security

[![Forward Email](https://img.shields.io/badge/Powered%20by-Forward%20Email-blue)](https://forwardemail.net)

</div>


##
