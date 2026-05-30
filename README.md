# Modify Headers Plus

> This is a fork of [SimpleModifyHeaders](https://github.com/didierfred/SimpleModifyHeaders) with enhanced UI, group management, and many new features.

This extension, available for [Firefox](https://addons.mozilla.org/firefox/addon/simple-modify-header/) and [Chrome](https://chrome.google.com/webstore/detail/simple-modify-headers/gjgiipmpldkpbdfjkgofildhapegmmic), allows you to rewrite headers based on a rules table with advanced group management.

## New Features (Fork)

- **URL Groups**: Organize rules into named groups with custom colors and URL patterns
- **Global & Group Rules**: Rules can be global (apply to all URLs) or specific to a group
- **Drag & Drop**: Reorder rules, move rules between groups, and reorder groups in the sidebar
- **Auto-Save**: Changes are automatically saved after 1 second of inactivity
- **Search & Filter**: Search rules by header name, value, comment, URL filter, or action
- **Color Picker**: Customize group colors with a full color picker
- **Toggle All**: Enable/disable all rules in a group with one click
- **URL Filters**: Set default and custom URL filters per group with dropdown selection
- **Striped Table**: Alternating row colors for better readability

## Getting Started

1. Install the extension from the browser store
2. Click the extension icon and select "Configure"
3. Create groups to organize your URL patterns
4. Add rules to groups or as global rules
5. Click "Save All" and then "Start" to activate

## Groups

Groups allow you to organize rules by URL patterns:

- **Name**: Descriptive name for the group (e.g., "APIs Production", "Dev Local")
- **Color**: Custom color for visual identification
- **URL Patterns**: Chrome match patterns for the group (e.g., `https://api.example.com/*`)
- **Default URL Filter**: Automatically applied to new rules in the group
- **Others URL Filters**: Dropdown options for quick filter selection in rules
- **Status**: Enable/disable all rules in the group at once

## Rules Table

The rules table consists of the following parameters:

- `URL Filter`: Optional filter to match specific URLs (uses group filters if available)
- `Action`: Specifies whether to add, modify, or delete a header field
- `Header Field Name`: The name of the header field (with autocomplete suggestions)
- `Header Field Value`: The value of the header field
- `Comment`: Any additional comments
- `Apply On`: Determines if the rule applies to request or response headers
- `Status`: Indicates if the rule is active ("on") or inactive ("off")
- `Group`: Shows which group the rule belongs to (for global rules)

## Drag & Drop

- **Reorder Rules**: Drag rules by the grip icon (⋮⋮) to reorder within a section
- **Move to Group**: Drag a rule from Global Rules and drop on a group in the sidebar or on the group section header
- **Move to Global**: Drag a rule from a group and drop on the "Global" filter in the sidebar or on the Global Rules section header
- **Reorder Groups**: Drag groups in the sidebar to change their order

## Search

Use the search bar to filter rules by:
- Header name
- Header value
- Comment
- URL filter
- Action type

## Url Pattern

We can choose the URLs on which the modifications are applied by modifying the URL pattern:
- The URL pattern must follow the syntax defined by https://developer.chrome.com/extensions/match_patterns
- Putting an empty string on the field will select all URLs
- It's possible to select multiple URL patterns using a semicolon (;) separator

## Import/Export

The extension also provides the ability to:
- Export your configuration to a file (in JSON format)
- Import your configuration from a file, supporting the Modifyheaders plugin format
- You can choose to append rules instead of replacing the existing configuration

## Parameters

The parameters button permits to:
- Activate debug mode: shows detailed log messages in the extension debugging console of the browser
- Show comments: show comments field on the config panel

## Firefox-specific Issue

According to the version of Firefox, the addition of a new header behaves differently. In the latest version, when you choose the "add" action and the header exists, it appends the value, while in the old version, it replaces it. If you want to modify an existing header, you should use "modify" instead of "add".

It's not possible to define a specific port number in url pattern, https://stackoverflow.com/questions/11425591/match-port-in-chrome-extension-pattern

## Chrome / Edge Specific Issue

The introduction of Manifest V3, mandatory on Chromium-based browsers starting approximately in June 2024, has imposed restrictions on header modifications (refer to [Chromium Blog](https://developer.chrome.com/blog/resuming-the-transition-to-mv3?hl=en)). Direct access to header and custom request filtering are no longer possible. All modifications must now be done via the declarativeNetRequest API, which has its own limitations, including a cap on the number of filtering rules and the size of regular expressions.

Attempting to maintain similar behavior to Manifest V2 presents several challenges, resulting in the following issues:

- Individual cookie modification is no longer possible so the option to manage cookies has been removed.
- The 'add' and 'modify' options behave identically (modifying a non-existing header will result in it being added).
- You may reach the browser's maximum filtering rules limit. If this occurs, a message will prompt you to deactivate some rules. However, this issue should be rare.
- The previous method of first filtering via global "URL patterns" followed by an "URL contains" filtering is no longer possible. Instead, multiple patterns are used for filtering. For example:
  - `URL pattern = "http://*/*"` and `when URL contains = "test"` results in two rules: `http://*test*/*` and `http://*/*test*`.
  - `URL pattern = "http://test/myurl*"` and `when URL contains = "test"` results in one rule: `http://test/myurl*`.
  - `URL pattern = "http://te*/myurl*"` and `when URL contains = "test"` results in two rules: `http://te*test*/myurl*` and `http://te*/myurl*test*`. This accepts `http://tetest/myurl` but excludes `http://test/myurl`, which was valid with the Manifest V2 version.

## Extension Permissions

The extension requires the following permissions to function properly:

### Firefox
- `storage`: Stores the configuration and rules
- `activeTab`, `tabs`: Displays the configuration screen in the browser tab
- `webRequest`, `webRequestBlocking`, `<all_urls>`: Modifies headers based on the rules table

### Chrome & Edge
- `storage`: Stores the configuration and rules
- `activeTab`, `tabs`: Displays the configuration screen in the browser tab
- `declarativeNetRequest`, `declarativeNetRequestWithHostAccess`: Modifies headers based on the rules table

## Personal Information

The extension does not collect personal information.

## License

The code is Open Source under Mozilla Public License 2.0

## Repository

GitHub: https://github.com/Andersoonalves/ModifyHeadersPlus
