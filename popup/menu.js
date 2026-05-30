var started = 'off';
var config = null;
var currentGroup = 'all';

window.onload = function () {
    I18n.init().then(function () {
        loadFromBrowserStorage(['started', 'config', 'theme', 'menuCurrentGroup'], function (result) {
            started = result.started || 'off';

            if (result.theme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
            }

            if (result.config) {
                config = JSON.parse(result.config);
            } else {
                config = { headers: [], groups: [] };
            }

            currentGroup = result.menuCurrentGroup || 'all';

            renderGroups();
            renderRules();
            updateStats();
            updateStartBtn();
            updatePanelTitle();

            document.getElementById('start_stop').addEventListener('click', startModify);
            document.getElementById('config_btn').addEventListener('click', openConfig);
            document.getElementById('toggle_all_btn').addEventListener('click', toggleAllCurrentGroup);
            document.getElementById('add_rule_btn').addEventListener('click', addNewRule);
        });
    });
};

function updateStartBtn() {
    var btn = document.getElementById('start_stop');
    if (started === 'on') {
        btn.textContent = 'STOP';
        btn.className = 'start-btn on';
    } else {
        btn.textContent = 'START';
        btn.className = 'start-btn off';
    }
}

function startModify() {
    if (started === 'off') {
        storeInBrowserStorage({ started: 'on' }, function () {
            started = 'on';
            if (useManifestV3) applyConfigWithManifestV3();
            else chrome.runtime.sendMessage('on');
            updateStartBtn();
            chrome.tabs.query({ currentWindow: true }, reloadConfigTab);
        });
    } else {
        storeInBrowserStorage({ started: 'off' }, function () {
            if (useManifestV3) removeConfigWithManifestV3(function () {});
            else chrome.runtime.sendMessage('off');
            started = 'off';
            updateStartBtn();
            chrome.tabs.query({ currentWindow: true }, reloadConfigTab);
        });
    }
}

function reloadConfigTab(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].url && tabs[i].url.startsWith(chrome.runtime.getURL(''))) {
            chrome.tabs.reload(tabs[i].id);
            break;
        }
    }
}

function openConfig() {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        var configTab = null;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url && tabs[i].url.startsWith(chrome.runtime.getURL(''))) {
                configTab = tabs[i];
                break;
            }
        }
        if (configTab) chrome.tabs.update(configTab.id, { active: true });
        else chrome.tabs.create({ url: '/popup/config.html' });
        window.close();
    });
}

function getFilteredHeaders() {
    if (!config || !config.headers) return [];
    if (currentGroup === 'all') return config.headers;
    if (currentGroup === 'global') return config.headers.filter(function (h) { return !h.group_id; });
    return config.headers.filter(function (h) { return h.group_id === currentGroup; });
}

function renderGroups() {
    var container = document.getElementById('groups_list');
    var allCount = config.headers ? config.headers.length : 0;
    var globalCount = config.headers ? config.headers.filter(function (h) { return !h.group_id; }).length : 0;
    var html = '';

    // All
    html += '<div class="group-item' + (currentGroup === 'all' ? ' active' : '') + '" data-group="all">';
    html += '  <span class="g-dot" style="background:var(--accent)"></span>';
    html += '  <span class="g-name">All Rules</span>';
    html += '  <span class="g-count">' + allCount + '</span>';
    html += '</div>';

    // Global
    html += '<div class="group-item' + (currentGroup === 'global' ? ' active' : '') + '" data-group="global">';
    html += '  <span class="g-dot" style="background:#999"></span>';
    html += '  <span class="g-name">Global</span>';
    html += '  <span class="g-count">' + globalCount + '</span>';
    html += '</div>';

    // Groups
    if (config.groups) {
        config.groups.forEach(function (group) {
            var count = config.headers.filter(function (h) { return h.group_id === group.id; }).length;
            var color = group.color || '#999';
            var name = escapeHtml(group.name || 'Group');
            var activeClass = currentGroup === group.id ? ' active' : '';

            html += '<div class="group-item' + activeClass + '" data-group="' + group.id + '">';
            html += '  <span class="g-dot" style="background:' + color + '"></span>';
            html += '  <span class="g-name">' + name + '</span>';
            html += '  <span class="g-count">' + count + '</span>';
            html += '</div>';
        });
    }

    container.innerHTML = html;

    // Click events
    container.querySelectorAll('.group-item').forEach(function (item) {
        item.addEventListener('click', function () {
            currentGroup = this.getAttribute('data-group');
            storeInBrowserStorage({ menuCurrentGroup: currentGroup });
            renderGroups();
            renderRules();
            updatePanelTitle();
        });
    });
}

function renderRules() {
    var container = document.getElementById('rules_list');
    var headers = getFilteredHeaders();

    if (headers.length === 0) {
        container.innerHTML = '<div class="empty-msg">No rules</div>';
        return;
    }

    var html = '';
    headers.forEach(function (rule) {
        var isOn = rule.status === 'on';
        var actionClass = rule.action || 'add';
        var headerName = rule.header_name || '(empty)';
        var url = rule.url_contains || '';
        var comment = rule.comment || '';

        html += '<div class="rule-item">';
        html += '  <label class="rule-toggle">';
        html += '    <input type="checkbox" ' + (isOn ? 'checked' : '') + ' data-id="' + rule.id + '">';
        html += '    <span class="slider"></span>';
        html += '  </label>';
        html += '  <div class="rule-info">';
        html += '    <div class="rule-top">';
        html += '      <span class="rule-header">' + escapeHtml(headerName) + (rule.header_value ? ': ' + escapeHtml(rule.header_value) : '') + '</span>';
        html += '      <span class="rule-action ' + actionClass + '">' + actionClass + '</span>';
        html += '    </div>';
        html += '    <div class="rule-meta">';
        if (url) html += '<span>' + escapeHtml(url) + '</span>';
        html += '    </div>';
        if (comment) html += '    <span class="rule-comment">' + escapeHtml(comment) + '</span>';
        html += '  </div>';
        html += '</div>';
    });

    container.innerHTML = html;

    container.querySelectorAll('.rule-toggle input').forEach(function (input) {
        input.addEventListener('change', function () {
            var ruleId = this.getAttribute('data-id');
            var newStatus = this.checked ? 'on' : 'off';
            var rule = config.headers.find(function (h) { return h.id === ruleId; });
            if (rule) {
                rule.status = newStatus;
                storeInBrowserStorage({ config: JSON.stringify(config) }, function () {
                    updateStats();
                    applyConfigIfStarted();
                });
            }
        });
    });
}

function updateStats() {
    if (!config || !config.headers) return;
    var total = config.headers.length;
    var active = config.headers.filter(function (h) { return h.status === 'on'; }).length;
    document.getElementById('stat_active').textContent = active;
    document.getElementById('stat_inactive').textContent = total - active;
    document.getElementById('stat_total').textContent = total;
}

function updatePanelTitle() {
    var title = document.getElementById('panel_title');
    if (currentGroup === 'all') title.textContent = 'All Rules';
    else if (currentGroup === 'global') title.textContent = 'Global Rules';
    else {
        var group = config.groups.find(function (g) { return g.id === currentGroup; });
        title.textContent = group ? group.name : 'Group Rules';
    }
}

function toggleAllCurrentGroup() {
    var headers = getFilteredHeaders();
    if (headers.length === 0) return;
    var allOn = headers.every(function (h) { return h.status === 'on'; });
    var newStatus = allOn ? 'off' : 'on';
    headers.forEach(function (h) { h.status = newStatus; });
    storeInBrowserStorage({ config: JSON.stringify(config) }, function () {
        renderRules();
        updateStats();
        applyConfigIfStarted();
    });
}

function addNewRule() {
    var groupId = currentGroup === 'all' || currentGroup === 'global' ? null : currentGroup;
    var newRule = {
        id: 'rule_' + Date.now(),
        group_id: groupId,
        url_contains: '',
        action: 'add',
        header_name: '',
        header_value: '',
        comment: '',
        apply_on: 'req',
        status: 'off'
    };
    config.headers.push(newRule);
    saveConfig();
    openConfig();
}

function saveConfig() {
    storeInBrowserStorage({ config: JSON.stringify(config) });
}

function applyConfigIfStarted() {
    if (started === 'on') {
        if (useManifestV3) {
            applyConfigWithManifestV3();
        } else {
            chrome.runtime.sendMessage('on');
        }
    }
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
