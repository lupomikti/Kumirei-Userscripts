"use strict";
// ==UserScript==
// @name         Wanikani: Omega Reorder
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Reorders n stuff
// @author       Kumirei
// @include      /^https://(www|preview).wanikani.com/((dashboard)?|((review|extra_study)/session))/
// @grant        none
// ==/UserScript==
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Actual script
;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    /* ------------------------------------------------------------------------------------*/
    // Overhead
    /* ------------------------------------------------------------------------------------*/
    function run() {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Initiate WKOF
                    return [4 /*yield*/, confirm_wkof()];
                    case 1:
                        // Initiate WKOF
                        _a.sent();
                        wkof.include('Settings,Menu,ItemData');
                        return [4 /*yield*/, init_settings()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, wkof.ready('ItemData')
                            // Get items
                        ];
                    case 3:
                        _a.sent();
                        items = [];
                        if (!(page === 'extra_study')) return [3 /*break*/, 5];
                        return [4 /*yield*/, wkof.ItemData.get_items('assignments,review_statistics')
                            // Process
                        ];
                    case 4:
                        items = _a.sent();
                        _a.label = 5;
                    case 5:
                        // Process
                        process_queue(items);
                        return [2 /*return*/];
                }
            });
        });
    }
    function process_queue(items) {
        // Filter and sort
        var settings = reorder.settings;
        var preset = settings.presets[settings.active_preset];
        if (!preset)
            return display_message('Invalid Preset'); // Active preset not defined
        var results = process_preset(preset, items);
        var final = results.final.concat(results.keep);
        if (!final.length)
            return display_message('No items in preset');
        console.log('items', final);
        // Load into queue
        transform_and_update(final);
    }
    function process_preset(preset, items) {
        var result = { keep: items, discard: [], final: [] };
        for (var _i = 0, _a = preset.actions; _i < _a.length; _i++) {
            var action = _a[_i];
            result = process_action(action, result);
        }
        return result;
    }
    function process_action(action, items) {
        console.log(action);
        console.log('Intermediary items', items.keep);
        switch (action.type) {
            case 'none':
                return items;
            case 'filter':
                var _a = process_filter(action, items.keep), keep = _a.keep, discard = _a.discard;
                return { keep: keep, discard: items.discard.concat(discard), final: items.final };
            case 'sort':
                return { keep: process_sort_action(action, items.keep), discard: items.discard, final: items.final };
            case 'freeze & restore':
                return { keep: items.discard, discard: [], final: items.keep };
            case 'shuffle':
                return { keep: shuffle(items.keep), discard: items.discard, final: items.final };
            default:
                return items; // Invalid action type
        }
    }
    /* ------------------------------------------------------------------------------------*/
    // Filtering
    /* ------------------------------------------------------------------------------------*/
    function process_filter(action, items) {
        var filter = wkof.ItemData.registry.sources.wk_items.filters[action.filter.filter];
        if (!filter)
            return { keep: items, discard: [] };
        var filter_value = filter.filter_value_map
            ? filter.filter_value_map(action.filter[action.filter.filter])
            : action.filter[action.filter.filter];
        var filter_func = function (item) { return filter.filter_func(filter_value, item); };
        return keep_and_discard(items, filter_func);
    }
    function install_filters() {
        wkof.ItemData.registry.sources.wk_items.filters.omega_reorder_overdue = {
            type: 'number',
            "default": 0,
            label: 'Overdue%',
            hover_tip: 'Items more overdue than this. A percentage.\nNegative: Not due yet\nZero: due now\nPositive: Overdue',
            filter_func: function (value, item) { return calculate_overdue(item) * 100 > value; }
        };
        wkof.ItemData.registry.sources.wk_items.filters.omega_reorder_critical = {
            type: 'checkbox',
            "default": true,
            label: 'Critical',
            hover_tip: 'Filter for items critical to leveling up',
            filter_func: function (value, item) { return value === is_critical(item); }
        };
    }
    // TODO: install more filters
    /* ------------------------------------------------------------------------------------*/
    // Sorting
    /* ------------------------------------------------------------------------------------*/
    function process_sort_action(action, items) {
        var sort;
        switch (action.sort.sort) {
            case 'level':
                sort = function (a, b) { return numerical_sort(a.data.level, b.data.level, action.sort.level); };
                break;
            case 'type':
                var order_1 = parse_short_subject_type_string(action.sort.type);
                sort = function (a, b) { return sort_by_type(a.object, b.object, order_1); };
                break;
            case 'srs':
                sort = function (a, b) {
                    var _a, _b, _c, _d;
                    return numerical_sort((_b = (_a = a.assignments) === null || _a === void 0 ? void 0 : _a.srs_stage) !== null && _b !== void 0 ? _b : -1, (_d = (_c = b.assignments) === null || _c === void 0 ? void 0 : _c.srs_stage) !== null && _d !== void 0 ? _d : -1, action.sort.srs);
                };
                break;
            case 'overdue':
                sort = function (a, b) {
                    return numerical_sort(calculate_overdue(a), calculate_overdue(b), action.sort.overdue);
                };
                break;
            case 'leech':
                sort = function (a, b) {
                    return numerical_sort(calculate_leech_score(a), calculate_leech_score(b), action.sort.leech);
                };
                break;
            default:
                return []; // Invalid sort key
        }
        return double_sort(items, sort);
    }
    function numerical_sort(a, b, order) {
        if (order !== 'asc' && order !== 'desc')
            return 0;
        return a === b ? 0 : xor(order === 'asc', a > b) ? -1 : 1;
    }
    function sort_by_type(a, b, order) {
        if (!order.length || a === b)
            return 0; // No order or same type
        if (a === order[0])
            return -1; // A is first type
        if (b === order[0])
            return 1; // B is first type
        return sort_by_type(a, b, order.slice(1, 3)); // Yay, recursion
    }
    function calculate_overdue(item) {
        // Items without assignments or due dates, and burned items, are not overdue
        if (!item.assignments || !item.assignments.available_at || item.assignments.srs_stage == 9)
            return -1;
        var dueMsAgo = Date.now() - Date.parse(item.assignments.available_at);
        return dueMsAgo / SRS_DURATIONS[item.assignments.srs_stage - 1];
    }
    function is_critical(item) {
        var _a;
        return item.data.level == wkof.user.level && item.object !== 'vocabulary' && ((_a = item.assignments) === null || _a === void 0 ? void 0 : _a.passed_at) == null;
    }
    // Borrowed from Prouleau's Item Inspector script
    function calculate_leech_score(item) {
        if (!item.review_statistics)
            return 0;
        var stats = item.review_statistics;
        function leechScore(incorrect, streak) {
            return Math.round((incorrect / Math.pow(streak || 0.5, 1.5)) * 100) / 100;
        }
        var meaning_score = leechScore(stats.meaning_incorrect, stats.meaning_current_streak);
        var reading_score = leechScore(stats.reading_incorrect, stats.reading_current_streak);
        return Math.max(meaning_score, reading_score);
    }
    function display_loading() {
        var callback = function () {
            var queue = $.jStorage.get(fullQueueKey);
            $.jStorage.set('questionType', 'meaning');
            if ('table' in queue) {
                // Since the url is invalid the queue will contain an error. We must wait
                // until the error is set until we can set our queue
                update_queue([{ type: 'Vocabulary', voc: 'Loading...', id: 0 }]);
            }
            $.jStorage.stopListening(fullQueueKey, callback);
        };
        $.jStorage.listenKeyChange(fullQueueKey, callback);
    }
    function parse_short_subject_type_string(str) {
        var type_map = { rad: 'radical', kan: 'kanji', voc: 'vocabulary' };
        return str
            .replace(/\W/g, '')
            .split(',')
            .map(function (type) { return type_map[type]; });
    }
    /* ------------------------------------------------------------------------------------*/
    // Polymorphic Utility Functions
    /* ------------------------------------------------------------------------------------*/
    function xor(a, b) {
        return (a && !b) || (!a && b);
    }
    // Sorting the array twice keeps the relative order of the sorted items. Example:
    // Original [8, 4, 5, 1, 7, 4, 5, 4, 6, 1].sort((a,b)=>a>5 ? -1 : 1)
    // Sorted   [6, 7, 8, 4, 5, 1, 4, 5, 4, 1].sort((a,b)=>a>5 ? -1 : 1)
    // Final    [8, 7, 6, 4, 5, 1, 4, 5, 4, 1]
    // This is important when chaining multiple sorting actions, so that the results of
    // one sort don't get reversed (front to back) by the next sort
    function double_sort(items, sorter) {
        return items.sort(sorter).sort(sorter);
    }
    function keep_and_discard(items, filter) {
        var results = { keep: [], discard: [] };
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var keep = filter(item);
            results[keep ? 'keep' : 'discard'].push(item);
        }
        return results;
    }
    /**
     * Shuffles array in place.
     * @param {Array} arr items An array containing the items.
     */
    function shuffle(arr) {
        var j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }
    /* ------------------------------------------------------------------------------------*/
    // Queue Management
    /* ------------------------------------------------------------------------------------*/
    function display_message(message) {
        update_queue([{ type: 'Vocabulary', voc: message, id: 0 }]);
    }
    function transform_and_update(items) {
        var transformed_items = transform_items(items);
        update_queue(transformed_items);
    }
    function update_queue(items) {
        var current_item = items[0];
        var active_queue = items.splice(0, 10);
        var rest = items.map(function (item) { return item.id; }); // Only need the ID for these
        if ((current_item === null || current_item === void 0 ? void 0 : current_item.type) === 'Radical')
            $.jStorage.set('questionType', 'meaning'); // has to be set before currentItem
        $.jStorage.set(currentItemKey, current_item);
        $.jStorage.set(activeQueueKey, active_queue);
        $.jStorage.set(fullQueueKey, rest);
    }
    function transform_items(items) {
        // Not all of the data mapped here is needed, but I haven't bothered to figure out exactly what is needed yet
        return items.map(function (item) {
            var _a;
            var _b, _c, _d, _e;
            return (_a = {
                    aud: (_b = item.data.pronunciation_audios) === null || _b === void 0 ? void 0 : _b.map(function (audio) { return ({
                        content_type: audio.content_type,
                        pronunciation: audio.metadata.pronunciation,
                        url: audio.url,
                        voice_actor_id: audio.metadata.voice_actor_id
                    }); }),
                    auxiliary_meanings: item.data.meanings
                        .filter(function (meaning) { return !meaning.primary; })
                        .map(function (meaning) { return meaning.meaning; }),
                    auxiliary_readings: (_c = item.data.readings) === null || _c === void 0 ? void 0 : _c.filter(function (reading) { return !reading.primary; }).map(function (reading) { return reading.reading; }),
                    characters: item.data.characters,
                    en: item.data.meanings.filter(function (meaning) { return meaning.primary; }).map(function (meaning) { return meaning.meaning; }),
                    id: item.id,
                    kana: (_d = item.data.readings) === null || _d === void 0 ? void 0 : _d.filter(function (reading) { return reading.primary; }).map(function (reading) { return reading.reading; }),
                    kanji: [
                        {
                            // Dummy for now
                            characters: '',
                            en: '',
                            id: 0,
                            ja: '',
                            kan: '',
                            type: ''
                        },
                    ],
                    slug: item.data.slug,
                    srs: (_e = item.assignments) === null || _e === void 0 ? void 0 : _e.srs_stage,
                    syn: [],
                    type: (item.object[0].toUpperCase() + item.object.slice(1))
                },
                _a[item.object == 'vocabulary' ? 'voc' : item.object == 'kanji' ? 'kan' : 'rad'] = item.data.characters,
                _a);
        });
    }
    /* ------------------------------------------------------------------------------------*/
    // WKOF setup
    /* ------------------------------------------------------------------------------------*/
    // Makes sure that WKOF is installed
    function confirm_wkof() {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                if (!wkof) {
                    response = confirm("".concat(script_name, " requires WaniKani Open Framework.\nClick \"OK\" to be forwarded to installation instructions."));
                    if (response) {
                        window.location.href =
                            'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549';
                    }
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    }
    function init_settings() {
        return wkof.ready('Settings,Menu').then(load_settings).then(install_menu);
    }
    // Load WKOF settings
    function load_settings() {
        var test_preset_1 = get_preset_defaults();
        test_preset_1.actions[0].name = 'test';
        var test_preset_2 = get_preset_defaults();
        test_preset_2.name = 'test';
        var defaults = {
            disabled: false,
            active_preset: 0,
            active_presets_reviews: 'None',
            active_presets_lessons: 'None',
            active_presets_extra_study: 'None',
            presets: [get_preset_defaults()]
        }; //as Settings.Settings
        return wkof.Settings.load(script_id, defaults).then(function (settings) { return (reorder.settings = settings); });
    }
    function get_preset_defaults() {
        var defaults = {
            name: 'New Preset',
            active_action: 0,
            actions: [get_action_defaults()]
        };
        return defaults;
    }
    function get_action_defaults() {
        var defaults = {
            name: 'New Action',
            type: 'none',
            filter: { filter: 'level', invert: false },
            sort: {
                sort: 'level',
                type: ['rad', 'kan', 'voc']
            }
        };
        for (var _i = 0, _a = Object.entries(wkof.ItemData.registry.sources.wk_items.filters); _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], filter = _b[1];
            defaults.filter[name_1] = filter["default"];
        }
        for (var _c = 0, _d = ['level', 'srs', 'leech', 'overdue', 'critical']; _c < _d.length; _c++) {
            var type = _d[_c];
            defaults.sort[type] = 'asc';
        }
        return defaults;
    }
    // Installs the options button in the menu
    function install_menu() {
        var config = {
            name: script_id,
            submenu: 'Settings',
            title: script_name,
            on_click: open_settings
        };
        wkof.Menu.insert_script_link(config);
    }
    // Opens settings dialogue when button is pressed
    function open_settings() {
        var config = {
            script_id: script_id,
            title: script_name,
            pre_open: settings_pre_open,
            on_refresh: refresh_settings,
            content: {
                // General Tab
                // ------------------------------------------------------------
                general: {
                    type: 'page',
                    label: 'General',
                    content: {
                        disabled: { type: 'checkbox', label: 'Disable', "default": false },
                        // Active Presets
                        // ------------------------------------------------------------
                        active_presets: {
                            type: 'group',
                            label: 'Active Presets',
                            content: {
                                active_preset_reviews: {
                                    type: 'dropdown',
                                    label: 'Review preset',
                                    content: { todo: 'todo' }
                                },
                                active_preset_lessons: {
                                    type: 'dropdown',
                                    label: 'Lesson preset',
                                    content: { todo: 'todo' }
                                },
                                active_preset_extra_study: {
                                    type: 'dropdown',
                                    label: 'Extra Study preset',
                                    content: { todo: 'todo' }
                                }
                            }
                        }
                    }
                },
                // Presets Tab
                // ------------------------------------------------------------
                presets: {
                    type: 'page',
                    label: 'Presets',
                    content: {
                        // Presets list
                        // ------------------------------------------------------------
                        presets: {
                            type: 'group',
                            label: 'Presets List',
                            content: {
                                active_preset: {
                                    type: 'list',
                                    refresh_on_change: true,
                                    hover_tip: 'Filter & Reorder Presets',
                                    content: {}
                                }
                            }
                        },
                        // Selected Preset
                        // ------------------------------------------------------------
                        preset: {
                            type: 'group',
                            label: 'Selected Preset',
                            content: {
                                preset_name: {
                                    type: 'text',
                                    label: 'Edit Preset Name',
                                    on_change: refresh_presets,
                                    path: '@presets[@active_preset].name',
                                    hover_tip: 'Enter a name for the selected preset'
                                },
                                // TODO: Available on pages
                                actions_label: { type: 'section', label: 'Actions' },
                                active_action: {
                                    type: 'list',
                                    refresh_on_change: true,
                                    hover_tip: 'Actions for the selected preset',
                                    path: '@presets[@active_preset].active_action',
                                    content: {}
                                }
                            }
                        },
                        // Selected action
                        // ------------------------------------------------------------
                        action: {
                            type: 'group',
                            label: 'Selected Action',
                            content: {
                                action_name: {
                                    type: 'text',
                                    label: 'Edit Action Name',
                                    on_change: refresh_actions,
                                    path: '@presets[@active_preset].actions[@presets[@active_preset].active_action].name',
                                    hover_tip: 'Enter a name for the selected action'
                                },
                                action_type: {
                                    type: 'dropdown',
                                    label: 'Action Type',
                                    hover_tip: 'Choose what kind of action this is',
                                    "default": 'None',
                                    path: '@presets[@active_preset].actions[@presets[@active_preset].active_action].type',
                                    on_change: refresh_action,
                                    content: {
                                        none: 'None',
                                        sort: 'Sort',
                                        filter: 'Filter',
                                        shuffle: 'Shuffle',
                                        'freeze & restore': 'Freeze & Restore'
                                    }
                                },
                                // Sorts and filters
                                // ------------------------------------------------------------
                                action_label: { type: 'section', label: 'Action Settings' },
                                none_description: {
                                    type: 'html',
                                    html: '<div class="none">Description of None</div>'
                                },
                                sort_description: {
                                    type: 'html',
                                    html: '<div class="sort">Description of sort</div>'
                                },
                                filter_description: {
                                    type: 'html',
                                    html: '<div class="filter">Description of filter</div>'
                                },
                                shuffle_description: {
                                    type: 'html',
                                    html: '<div class="shuffle">Description of shuffle</div>'
                                },
                                freeze_and_restore_description: {
                                    type: 'html',
                                    html: '<div class="freeze_and_restore">Description of freeze and restore</div>'
                                },
                                filter_type: {
                                    type: 'dropdown',
                                    label: 'Filter Type',
                                    hover_tip: 'Choose what kind of filter this is',
                                    "default": 'level',
                                    on_change: refresh_action,
                                    path: '@presets[@active_preset].actions[@presets[@active_preset].active_action].filter.filter',
                                    content: {
                                    // Will be populated
                                    }
                                },
                                sort_type: {
                                    type: 'dropdown',
                                    label: 'Sort Type',
                                    hover_tip: 'Choose what kind of sort this is',
                                    "default": 'level',
                                    on_change: refresh_action,
                                    path: '@presets[@active_preset].actions[@presets[@active_preset].active_action].sort.sort',
                                    content: {
                                        type: 'Type',
                                        level: 'Level',
                                        srs: 'SRS Level',
                                        leech: 'Leech Score',
                                        overdue: 'Overdue',
                                        critical: 'Critical'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }; // as SettingsModule.Config
        var action = config.content.presets.content.action;
        populate_settings(action);
        // TODO: Update filter value input
        // TODO: Update sort order input
        reorder.settings_dialog = new wkof.Settings(config);
        reorder.settings_dialog.open();
    }
    function populate_settings(config) {
        var _a, _b, _c;
        // Populate filters
        for (var _i = 0, _d = Object.entries(wkof.ItemData.registry.sources.wk_items.filters); _i < _d.length; _i++) {
            var _e = _d[_i], name_2 = _e[0], filter = _e[1];
            if (filter.no_ui)
                continue;
            // Add to dropdown
            var filter_type = config.content.filter_type;
            filter_type.content[name_2] = (_a = filter.label) !== null && _a !== void 0 ? _a : 'Filter Value';
            // Add filter values
            config.content["filter_by_".concat(name_2)] = {
                type: filter.type === 'multi' ? 'list' : filter.type,
                multi: filter.type === 'multi',
                "default": filter["default"],
                label: (_b = filter.label) !== null && _b !== void 0 ? _b : 'Filter Value',
                hover_tip: (_c = filter.hover_tip) !== null && _c !== void 0 ? _c : 'Choose a value for your filter',
                placeholder: filter.placeholder,
                content: filter.content,
                path: "@presets[@active_preset].actions[@presets[@active_preset].active_action].filter.".concat(name_2)
            };
        }
        // Add filter inversion so that it comes after all values
        config.content.filter_invert = {
            type: 'checkbox',
            label: 'Invert Filter',
            hover_tip: 'Check this box if you want to invert the effect of this filter.',
            "default": false,
            path: '@presets[@active_preset].actions[@presets[@active_preset].active_action].filter.invert'
        };
        // Populate sort values
        var numerical_sort_config = function (type) {
            return ({
                type: 'dropdown',
                "default": 'asc',
                label: 'Order',
                hover_tip: 'Sort in ascending or descending order',
                path: "@presets[@active_preset][@active_action].sort.".concat(type),
                content: { asc: 'Ascending', desc: 'Descending' }
            });
        };
        config.content.sort_by_type = {
            type: 'text',
            label: 'Order',
            "default": 'rad, kan, voc',
            placeholder: 'rad, kan, voc',
            hover_tip: 'Comma separated list of short subject type names. Eg. "rad, kan, voc" or "kan, rad',
            path: "@presets[@active_preset][@active_action].sort.type"
        };
        for (var _f = 0, _g = ['level', 'srs', 'leech', 'overdue', 'critical']; _f < _g.length; _f++) {
            var type = _g[_f];
            config.content["sort_by_".concat(type)] = numerical_sort_config(type);
        }
    }
    function settings_pre_open(dialog) {
        // Add buttons to the presets and actions lists
        var buttons = function (type) {
            return "<div class=\"list_buttons\">" +
                "<button type=\"button\" ref=\"".concat(type, "\" action=\"new\" class=\"ui-button ui-corner-all ui-widget\" title=\"Create a new ").concat(type, "\"><span class=\"fa fa-plus\"></span></button>") +
                "<button type=\"button\" ref=\"".concat(type, "\" action=\"up\" class=\"ui-button ui-corner-all ui-widget\" title=\"Move the selected ").concat(type, " up in the list\"><span class=\"fa fa-arrow-up\"></span></button>") +
                "<button type=\"button\" ref=\"".concat(type, "\" action=\"down\" class=\"ui-button ui-corner-all ui-widget\" title=\"Move the selected ").concat(type, " down in the list\"><span class=\"fa fa-arrow-down\"></span></button>") +
                "<button type=\"button\" ref=\"".concat(type, "\" action=\"delete\" class=\"ui-button ui-corner-all ui-widget\" title=\"Delete the selected ").concat(type, "\"><span class=\"fa fa-trash\"></span></button>") +
                "</div>";
        };
        var wrap = dialog.find("#".concat(script_id, "_active_preset")).closest('.row').addClass('list_wrap');
        wrap.prepend(buttons('preset')).find('.list_buttons').on('click', 'button', list_button_pressed);
        wrap = dialog.find("#".concat(script_id, "_active_action")).closest('.row').addClass('list_wrap');
        wrap.prepend(buttons('action')).find('.list_buttons').on('click', 'button', list_button_pressed);
        // Set some classes
        dialog.find('[name="filter_type"]').closest('.row').addClass('filter');
        dialog.find('[name="filter_invert"]').closest('.row').addClass('filter');
        dialog.find('[name="sort_type"]').closest('.row').addClass('sort');
        refresh_presets();
        refresh_actions();
    }
    function refresh_settings() {
        refresh_presets();
        refresh_actions();
    }
    function refresh_presets() {
        populate_list($("#".concat(script_id, "_active_preset")), reorder.settings.presets, reorder.settings.active_preset);
    }
    function refresh_actions() {
        var preset = reorder.settings.presets[reorder.settings.active_preset];
        if (!preset)
            return;
        populate_list($("#".concat(script_id, "_active_action")), preset.actions, preset.active_action);
        refresh_action();
    }
    function populate_list(elem, items, active_item) {
        if (!items)
            return;
        var html = '';
        for (var _i = 0, _a = Object.entries(items); _i < _a.length; _i++) {
            var _b = _a[_i], id = _b[0], name_3 = _b[1].name;
            name_3 = name_3.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            html += "<option name=\"".concat(id, "\">").concat(name_3, "</option>");
        }
        elem.html(html);
        elem.children().eq(active_item).prop('selected', true); // Select the active item
    }
    function refresh_action() {
        // Set action type
        var type = $("#".concat(script_id, "_action_type")).val();
        $("#".concat(script_id, "_action")).attr('type', type);
        // Update visible input
        var preset = reorder.settings.presets[reorder.settings.active_preset];
        var action = preset.actions[preset.active_action];
        $('.visible_action_value').removeClass('visible_action_value');
        if (action.type === 'sort' || action.type === 'filter') {
            $("#".concat(script_id, "_").concat(action.type, "_by_").concat(action[action.type][action.type]))
                .closest('.row')
                .addClass('visible_action_value');
        }
    }
    function list_button_pressed(e) {
        var ref = e.currentTarget.attributes.ref.value;
        var btn = e.currentTarget.attributes.action.value;
        var elem = $("#".concat(script_id, "_active_") + ref);
        var default_item, root, list, key;
        if (ref === 'preset') {
            default_item = get_preset_defaults();
            root = reorder.settings;
            list = reorder.settings.presets;
            key = 'active_preset';
        }
        else {
            default_item = get_action_defaults();
            root = reorder.settings.presets[reorder.settings.active_preset];
            list = root.actions;
            key = 'active_action';
        }
        switch (btn) {
            case 'new':
                list.push(default_item);
                root[key] = list.length - 1;
                break;
            case 'delete':
                list.push.apply(list, list.splice(root[key]).slice(1)); // Remove from list by index
                if (root[key] && root[key] >= list.length)
                    root[key]--;
                if (list.length === 0)
                    list.push(default_item);
                break;
            case 'up':
                swap(list, root[key] - 1, root[key]);
                root[key]--;
                break;
            case 'down':
                swap(list, root[key] + 1, root[key]);
                root[key]++;
                break;
        }
        populate_list(elem, list, root[key]);
        reorder.settings_dialog.refresh();
        if (btn === 'new')
            $("#".concat(script_id, "_").concat(ref, "_name")).focus().select();
    }
    function swap(list, i, j) {
        if (list.length <= i || list.length <= j || i < 0 || j < 0)
            return;
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    var wkof, $, script_id, script_name, page, currentItemKey, activeQueueKey, fullQueueKey, reorder, SRS_DURATIONS;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wkof = window.wkof, $ = window.$;
                script_id = 'reorder_omega';
                script_name = 'Reorder Omega';
                currentItemKey = 'currentItem';
                activeQueueKey = 'activeQueue';
                fullQueueKey = 'reviewQueue';
                reorder = {
                    settings: {},
                    settings_dialog: null
                };
                wkof.ready('ItemData.registry').then(install_filters);
                if (!/(DASHBOARD)?$/i.test(window.location.pathname)) return [3 /*break*/, 2];
                return [4 /*yield*/, init_settings()
                    // open_settings()
                ];
            case 1:
                _a.sent();
                return [3 /*break*/, 5];
            case 2:
                if (!/REVIEW/i.test(window.location.pathname)) return [3 /*break*/, 4];
                // Set page variables
                page = 'reviews';
                fullQueueKey = 'reviewQueue';
                return [4 /*yield*/, init_settings()
                    // run()
                ];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                if (/EXTRA_STUDY/i.test(window.location.pathname)) {
                    // Set page variables
                    page = 'extra_study';
                    fullQueueKey = 'practiceQueue';
                    if (window.location.search === '?title=test') {
                        // This has to be done before WK realizes that the queue is empty and redirects
                        display_loading();
                        run();
                    }
                }
                _a.label = 5;
            case 5:
                SRS_DURATIONS = [4, 8, 23, 47, 167, 335, 719, 2879, Infinity].map(function (time) { return time * 60 * 60 * 1000; });
                return [2 /*return*/];
        }
    });
}); })();
module.exports = 0;
