# Modify Headers ANDIN

This extension, available for [Firefox](https://addons.mozilla.org/firefox/addon/simple-modify-header/) and [Chrome](https://chrome.google.com/webstore/detail/simple-modify-headers/gjgiipmpldkpbdfjkgofildhapegmmic), allows you to rewrite headers based on a rules table with advanced group management.

## Features

- **URL Groups**: Organize rules into named groups with custom colors and URL patterns
- **Global & Group Rules**: Rules can be global (apply to all URLs) or specific to a group
- **Drag & Drop**: Reorder rules, move rules between groups, and reorder groups in the sidebar
- **Auto-Save**: Changes are automatically saved after 1 second of inactivity
- **Search & Filter**: Search rules by header name, value, comment, URL filter, or action
- **Color Picker**: Customize group colors with a full color picker
- **Toggle All**: Enable/disable all rules in a group with one click
- **Import/Export**: Export and import configurations in JSON format
- **URL Filters**: Set default and custom URL filters per group with dropdown selection

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
- **Users URL Filters**: Dropdown options for quick filter selection in rules
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

## URL Patterns

URL patterns must follow the syntax defined by https://developer.chrome.com/extensions/match_patterns

- Putting an empty string on the field will select all URLs
- It's possible to select multiple URL patterns using a semicolon (;) separator

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

## Parameters

The parameters button allows to:
- Activate debug mode: shows detailed log messages in the extension debugging console
- Show comments: show comments field on the config panel

## Chrome / Edge Specific Issues

The introduction of Manifest V3 has imposed restrictions on header modifications. All modifications must now be done via the declarativeNetRequest API, which has its own limitations:

- The 'add' and 'modify' options behave identically
- You may reach the browser's maximum filtering rules limit
- Cookie modification options have been removed in MV3

## Extension Permissions

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

GitHub: https://github.com/anderson/SimpleModifyHeadersNGX
