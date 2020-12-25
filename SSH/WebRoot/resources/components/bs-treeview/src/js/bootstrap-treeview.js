/* =========================================================
 * bootstrap-treeview.js v1.2.0
 * =========================================================
 * Copyright 2013 Jonathan Miles
 * Project URL : http://www.jondmiles.com/bootstrap-treeview
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

;(function ($, window, document, undefined) {

	/*global jQuery, console*/

	'use strict';

	var pluginName = 'treeview';

	var _default = {};

	_default.settings = {

		injectStyle: true,

		levels: 2,

		expandIcon: 'glyphicon glyphicon-plus',
		collapseIcon: 'glyphicon glyphicon-minus',
		emptyIcon: 'glyphicon',
		nodeIcon: '',
		selectedIcon: '',
		checkedIcon: 'glyphicon glyphicon-check',
		uncheckedIcon: 'glyphicon glyphicon-unchecked',

		color: undefined, // '#000000',
		backColor: undefined, // '#FFFFFF',
		borderColor: undefined, // '#dddddd',
		onhoverColor: '#F5F5F5',
		selectedColor: '#FFFFFF',
		selectedBackColor: '#428bca',
		searchResultColor: '#D9534F',
		searchResultBackColor: undefined, //'#FFFFFF',

		enableLinks: false,
		highlightSelected: true,
		highlightSearchResults: true,
		showBorder: true,
		showIcon: true,
		showCheckbox: false,
		showTags: false,
		multiSelect: false,

		// Event handlers
		onNodeChecked: undefined,
		onNodeCollapsed: undefined,
		onNodeDisabled: undefined,
		onNodeEnabled: undefined,
		onNodeExpanded: undefined,
		onNodeSelected: undefined,
		onNodeUnchecked: undefined,
		onNodeUnselected: undefined,
		onSearchComplete: undefined,
		onSearchCleared: undefined
	};

	_default.options = {
		silent: false,
		ignoreChildren: false
	};

	_default.searchOptions = {
		ignoreCase: true,
		exactMatch: false,
		revealResults: true
	};

	var Tree = function (element, options) {

		this.$element = $(element);
		this.elementId = element.id;
		this.styleId = this.elementId + '-style';

		this.init(options);

		return {

			// Options (public access)
			options: this.options,

			// Initialize / destroy methods
			init: $.proxy(this.init, this),
			remove: $.proxy(this.remove, this),
			
			addNode: $.proxy(this.addNode, this), // cxwg: extended
			deleteNode: $.proxy(this.deleteNode, this),
			editNode: $.proxy(this.editNode, this),
			editNodeWithoutRender: $.proxy(this.editNodeWithoutRender, this),
			getAllNodes: $.proxy(this.getAllNodes, this),
			setOptions: $.proxy(this.setOptions, this),
			switchKhlx: $.proxy(this.switchKhlx, this),
			scanPartialChecked: $.proxy(this.scanPartialChecked, this),

			// Get methods
			getNode: $.proxy(this.getNode, this),
			getParent: $.proxy(this.getParent, this),
			getSiblings: $.proxy(this.getSiblings, this),
			getSelected: $.proxy(this.getSelected, this),
			getUnselected: $.proxy(this.getUnselected, this),
			getExpanded: $.proxy(this.getExpanded, this),
			getCollapsed: $.proxy(this.getCollapsed, this),
			getChecked: $.proxy(this.getChecked, this),
			getUnchecked: $.proxy(this.getUnchecked, this),
			getDisabled: $.proxy(this.getDisabled, this),
			getEnabled: $.proxy(this.getEnabled, this),
			getAncestors: $.proxy(this.getAncestors, this), // cxwg: extended
			getDescendants: $.proxy(this.getDescendants, this),
			getKhLeafs: $.proxy(this.getKhLeafs, this), // 只用于选择客户
			getKhNextLeafs: $.proxy(this.getKhNextLeafs, this), 

			// Select methods
			selectNode: $.proxy(this.selectNode, this),
			unselectNode: $.proxy(this.unselectNode, this),
			toggleNodeSelected: $.proxy(this.toggleNodeSelected, this),

			// Expand / collapse methods
			collapseAll: $.proxy(this.collapseAll, this),
			collapseNode: $.proxy(this.collapseNode, this),
			expandAll: $.proxy(this.expandAll, this),
			expandNode: $.proxy(this.expandNode, this),
			toggleNodeExpanded: $.proxy(this.toggleNodeExpanded, this),
			revealNode: $.proxy(this.revealNode, this),
			openNode: $.proxy(this.openNode, this), // cxwg: extended

			// Expand / collapse methods
			checkAll: $.proxy(this.checkAll, this),
			checkNode: $.proxy(this.checkNode, this),
			uncheckAll: $.proxy(this.uncheckAll, this),
			uncheckNode: $.proxy(this.uncheckNode, this),
			toggleNodeChecked: $.proxy(this.toggleNodeChecked, this),
			hierCheckNode: $.proxy(this.hierCheckNode, this), // cxwg: extended
			hierUncheckNode: $.proxy(this.hierUncheckNode, this),
			hierCheckSelected: $.proxy(this.hierCheckSelected, this), // cxwg: extended

			// Disable / enable methods
			disableAll: $.proxy(this.disableAll, this),
			disableNode: $.proxy(this.disableNode, this),
			enableAll: $.proxy(this.enableAll, this),
			enableNode: $.proxy(this.enableNode, this),
			toggleNodeDisabled: $.proxy(this.toggleNodeDisabled, this),

			// Search methods
			search: $.proxy(this.search, this),
			clearSearch: $.proxy(this.clearSearch, this)
		};
	};

	Tree.prototype.init = function (options) {

		this.tree = [];
		this.nodes = [];

		if (options.data) {
			if (typeof options.data === 'string') {
				options.data = $.parseJSON(options.data);
			}
			this.tree = $.extend(true, [], options.data);
			delete options.data;
		}
		this.options = $.extend({}, _default.settings, options);

		this.destroy();
		this.subscribeEvents();
		this.setInitialStates({ nodes: this.tree }, 0);
		this.render();
	};

	Tree.prototype.remove = function () {
		this.destroy();
		$.removeData(this, pluginName);
		$('#' + this.styleId).remove();
	};

	Tree.prototype.destroy = function () {

		if (!this.initialized) return;

		this.$wrapper.remove();
		this.$wrapper = null;

		// Switch off events
		this.unsubscribeEvents();

		// Reset this.initialized flag
		this.initialized = false;
	};

	Tree.prototype.unsubscribeEvents = function () {

		this.$element.off('click');
		this.$element.off('nodeChecked');
		this.$element.off('nodeCollapsed');
		this.$element.off('nodeDisabled');
		this.$element.off('nodeEnabled');
		this.$element.off('nodeExpanded');
		this.$element.off('nodeSelected');
		this.$element.off('nodeUnchecked');
		this.$element.off('nodeUnselected');
		this.$element.off('searchComplete');
		this.$element.off('searchCleared');
	};

	Tree.prototype.subscribeEvents = function () {

		this.unsubscribeEvents();

		this.$element.on('click', $.proxy(this.clickHandler, this));

		if (typeof (this.options.onNodeChecked) === 'function') {
			this.$element.on('nodeChecked', this.options.onNodeChecked);
		}

		if (typeof (this.options.onNodeCollapsed) === 'function') {
			this.$element.on('nodeCollapsed', this.options.onNodeCollapsed);
		}

		if (typeof (this.options.onNodeDisabled) === 'function') {
			this.$element.on('nodeDisabled', this.options.onNodeDisabled);
		}

		if (typeof (this.options.onNodeEnabled) === 'function') {
			this.$element.on('nodeEnabled', this.options.onNodeEnabled);
		}

		if (typeof (this.options.onNodeExpanded) === 'function') {
			this.$element.on('nodeExpanded', this.options.onNodeExpanded);
		}

		if (typeof (this.options.onNodeSelected) === 'function') {
			this.$element.on('nodeSelected', this.options.onNodeSelected);
		}

		if (typeof (this.options.onNodeUnchecked) === 'function') {
			this.$element.on('nodeUnchecked', this.options.onNodeUnchecked);
		}

		if (typeof (this.options.onNodeUnselected) === 'function') {
			this.$element.on('nodeUnselected', this.options.onNodeUnselected);
		}

		if (typeof (this.options.onSearchComplete) === 'function') {
			this.$element.on('searchComplete', this.options.onSearchComplete);
		}

		if (typeof (this.options.onSearchCleared) === 'function') {
			this.$element.on('searchCleared', this.options.onSearchCleared);
		}
	};

	/*
		Recurse the tree structure and ensure all nodes have
		valid initial states.  User defined states will be preserved.
		For performance we also take this opportunity to
		index nodes in a flattened structure
	*/
	Tree.prototype.setInitialStates = function (node, level) {

		if (!node.nodes) return;
		level += 1;

		var parent = node;
		var _this = this;
		$.each(node.nodes, function checkStates(index, node) {

			// nodeId : unique, incremental identifier
			node.nodeId = _this.nodes.length;

			// parentId : transversing up the tree
			node.parentId = parent.nodeId;

			// if not provided set selectable default value
			if (!node.hasOwnProperty('selectable')) {
				node.selectable = true;
			}

			// where provided we should preserve states
			node.state = node.state || {};

			// set checked state; unless set always false
			if (!node.state.hasOwnProperty('checked')) {
				node.state.checked = false;
			}
			
			if (!node.state.hasOwnProperty('partialChecked')) { // 子节点有部分先选中
				node.state.partialChecked = false;
			}

			// set enabled state; unless set always false
			if (!node.state.hasOwnProperty('disabled')) {
				node.state.disabled = false;
			}

			// set expanded state; if not provided based on levels
			if (!node.state.hasOwnProperty('expanded')) {
				if (!node.state.disabled &&
						(level < _this.options.levels) &&
						(node.nodes && node.nodes.length > 0)) {
					node.state.expanded = true;
				}
				else {
					node.state.expanded = false;
				}
			}

			// set selected state; unless set always false
			if (!node.state.hasOwnProperty('selected')) {
				node.state.selected = false;
			}
			
			// set invalid state; unless set always false
			if (!node.state.hasOwnProperty('invalid')) { // 节点无效，显示成灰色，但仍可以操作
				node.state.invalid = false;
			}
			
			// set deleted state; unless set always false
			if (!node.state.hasOwnProperty('deleted')) { // 标记节点已删除，保留数据但不显示
				node.state.deleted = false;
			}

			// index nodes in a flattened structure for use later
			_this.nodes.push(node);

			// recurse child nodes and transverse the tree
			if (node.nodes) {
				_this.setInitialStates(node, level);
			}
		});
	};

	Tree.prototype.clickHandler = function (event) {

		if (!this.options.enableLinks) event.preventDefault();

		var target = $(event.target);
		if (target.hasClass('treeview')) return; // 点击在treeview容器的空白地方，不是某个li
		var node = this.findNode(target);
		if (!node || node.state.disabled) return;
		
		var classList = target.attr('class') ? target.attr('class').split(' ') : [];
		if ((classList.indexOf('expand-icon') !== -1)) {
			if (node.ajax) {
				if (node.loading) { // this.options.ajaxLoading
					CxMsg.info('请等待正在查询的请求完成');
				} else {
					this.toggleExpandedState(node, _default.options);
					if (node.state.expanded) {
						if (!node.loaded) {
							if (typeof this.options.ajaxHandler === 'function') {
								node.originalIcon = node.icon;
								node.icon = this.options.iconExt.loading;
								node.loading = true;
								// this.options.ajaxLoading = true;
								this.options.ajaxHandler(node, this.options, function(subs) {
									// this.options.ajaxLoading = false;
									node.loading = false;
									node.loaded = true;
									if (this.identifyNode(node)) {
										node.icon = node.originalIcon;
										if (subs && subs.length>0) {
											this.addNode(node, {node: subs, silent: true}); // addNode calls render()
										} else {
											node.nodes = null; //取消展开图标
											this.render();
										}
									}
								}.bind(this));
							}
						}
					}
					this.render();
				}
			} else {
				this.toggleExpandedState(node, _default.options);
				this.render();
			}
		}
		else if ((classList.indexOf('check-icon') !== -1)) {
			if ('hierarchy' == this.options.checkedEventType) {
				this.toggleHierCheckedState(node, this.options);
			} else {
				this.toggleCheckedState(node, _default.options);
				this.render();
			}
		}
		else {
			if (node.selectable) {
				if (this.options.unselectedEnabled) {
					this.toggleSelectedState(node, _default.options);
					this.render();
				} else {
					if (!node.state.selected) {
						this.toggleSelectedState(node, _default.options);
						this.render();
					}
				}
			} else {
				if (node.ajax) {
					if (node.loading) { // this.options.ajaxLoading
						CxMsg.info('请等待前一个正在处理的请求完成');
					} else {
						this.toggleExpandedState(node, _default.options);
						if (node.state.expanded) {
							if (!node.loaded) {
								if (typeof this.options.ajaxHandler === 'function') {
									node.originalIcon = node.icon;
									node.icon = this.options.iconExt.loading;
									node.loading = true;
									// this.options.ajaxLoading = true;
									this.options.ajaxHandler(node, this.options, function(subs) {
										// this.options.ajaxLoading = false;
										node.loading = false;
										node.loaded = true;
										if (this.identifyNode(node)) {
											node.icon = node.originalIcon;
											if (subs && subs.length>0) {
												this.addNode(node, {node: subs, silent: true}); // addNode calls render()
											} else {
												node.nodes = null; //取消展开图标
												this.render();
											}
										}
									}.bind(this));
								}
							}
						}
						this.render();
					}
				} else {
					this.toggleExpandedState(node, _default.options);
					this.render();
				}
				//this.toggleExpandedState(node, _default.options);
				//this.render();
			}

			
			/*if (node.selectable) {
				this.toggleSelectedState(node, _default.options);
			} else {
				this.toggleExpandedState(node, _default.options);
			}

			this.render();*/
		}
	};

	// Looks up the DOM for the closest parent list item to retrieve the
	// data attribute nodeid, which is used to lookup the node in the flattened structure.
	Tree.prototype.findNode = function (target) {

		var nodeId = target.closest('li.list-group-item').attr('data-nodeid');
		var node = this.nodes[nodeId];

		if (!node) {
			console.log('Error: node does not exist');
		}
		return node;
	};

	Tree.prototype.toggleExpandedState = function (node, options) {
		if (!node) return;
		this.setExpandedState(node, !node.state.expanded, options);
	};

	Tree.prototype.setExpandedState = function (node, state, options) {

		if (state === node.state.expanded) return;

		if (state && node.nodes) {

			// Expand a node
			node.state.expanded = true;
			if (node.folder && this.options.iconExt) node.icon = this.options.iconExt.folderOpen;
			if (!options.silent) {
				this.$element.trigger('nodeExpanded', $.extend(true, {}, node));
			}
		}
		else if (!state) {

			// Collapse a node
			node.state.expanded = false;
			if (node.folder && this.options.iconExt) node.icon = this.options.iconExt.folderClosed;
			if (!options.silent) {
				this.$element.trigger('nodeCollapsed', $.extend(true, {}, node));
			}

			// Collapse child nodes
			if (node.nodes && !options.ignoreChildren) {
				$.each(node.nodes, $.proxy(function (index, node) {
					this.setExpandedState(node, false, options);
				}, this));
			}
		}
	};

	Tree.prototype.toggleSelectedState = function (node, options) {
		if (!node) return;
		this.setSelectedState(node, !node.state.selected, options);
	};

	Tree.prototype.setSelectedState = function (node, state, options) {

		if (state === node.state.selected) return;

		if (state) {

			// If multiSelect false, unselect previously selected
			if (!this.options.multiSelect) {
				$.each(this.findNodes('true', 'g', 'state.selected'), $.proxy(function (index, node) {
					this.setSelectedState(node, false, options);
				}, this));
			}

			// Continue selecting node
			node.state.selected = true;
			if (!options.silent) {
				this.$element.trigger('nodeSelected', $.extend(true, {}, node));
			}
		}
		else {

			// Unselect node
			node.state.selected = false;
			if (!options.silent) {
				this.$element.trigger('nodeUnselected', $.extend(true, {}, node));
			}
		}
	};

	Tree.prototype.toggleCheckedState = function (node, options) {
		if (!node) return;
		this.setCheckedState(node, !node.state.checked, options);
	};

	Tree.prototype.setCheckedState = function (node, state, options) {

		if (state === node.state.checked) return;

		if (state) {

			// Check node
			node.state.checked = true;

			if (!options.silent) {
				this.$element.trigger('nodeChecked', $.extend(true, {}, node));
			}
		}
		else {

			// Uncheck node
			node.state.checked = false;
			if (!options.silent) {
				this.$element.trigger('nodeUnchecked', $.extend(true, {}, node));
			}
		}
	};
	
	Tree.prototype.setPartialCheckedState = function (node, state, options) {
		if (state === node.state.partialChecked) return;
		if (state) {
			node.state.partialChecked = true;
		} else {
			node.state.partialChecked = false;
		}
	};

	Tree.prototype.setDisabledState = function (node, state, options) {

		if (state === node.state.disabled) return;

		if (state) {

			// Disable node
			node.state.disabled = true;

			// Disable all other states
			this.setExpandedState(node, false, options);
			this.setSelectedState(node, false, options);
			this.setCheckedState(node, false, options);

			if (!options.silent) {
				this.$element.trigger('nodeDisabled', $.extend(true, {}, node));
			}
		}
		else {

			// Enabled node
			node.state.disabled = false;
			if (!options.silent) {
				this.$element.trigger('nodeEnabled', $.extend(true, {}, node));
			}
		}
	};

	Tree.prototype.render = function () {

		if (!this.initialized) {

			// Setup first time only components
			this.$element.addClass(pluginName);
			this.$wrapper = $(this.template.list);

			this.injectStyle();

			this.initialized = true;
		}

		this.$element.empty().append(this.$wrapper.empty());

		// Build tree
		this.buildTree(this.tree, 0);
	};

	// Starting from the root node, and recursing down the
	// structure we build the tree one node at a time
	Tree.prototype.buildTree = function (nodes, level) {

		if (!nodes) return;
		level += 1;

		var _this = this;
		$.each(nodes, function addNodes(id, node) {
			if (!node.state.deleted) {
				var treeItem = $(_this.template.item)
					.addClass('node-' + _this.elementId)
					.addClass(node.state.checked ? 'node-checked' : '')
					.addClass(node.state.disabled ? 'node-disabled': '')
					.addClass(node.state.selected ? 'node-selected' : '')
					.addClass(node.searchResult ? 'search-result' : '') 
					.attr('data-nodeid', node.nodeId)
					.attr('style', _this.buildStyleOverride(node));
				if (node.state.invalid) treeItem.addClass('tv-invalid');
	
				// Add indent/spacer to mimic tree structure
				for (var i = 0; i < (level - 1); i++) {
					treeItem.append(_this.template.indent);
				}
	
				// Add expand, collapse or empty spacer icons
				var classList = [];
				if (node.nodes) {
					classList.push('expand-icon');
					if (node.state.expanded) {
						classList.push(_this.options.collapseIcon);
					}
					else {
						classList.push(_this.options.expandIcon);
					}
				}
				else {
					classList.push(_this.options.emptyIcon);
				}
	
				treeItem
					.append($(_this.template.icon)
						.addClass(classList.join(' '))
					);
	
	
				// Add node icon
				if (_this.options.showIcon) {
					
					var classList = ['node-icon'];
					if (node.folder && _this.options.iconExt) { // no specific icon & has ext icon
						if (node.state.expanded) classList.push(_this.options.iconExt.folderOpen);
						else classList.push(_this.options.iconExt.folderClosed);
					} else classList.push(node.icon || _this.options.nodeIcon);
					if (!node.folder && node.state.selected) {
						classList.pop();
						classList.push(node.selectedIcon || _this.options.selectedIcon || 
										node.icon || _this.options.nodeIcon);
					}
	
					treeItem
						.append($(_this.template.icon)
							.addClass(classList.join(' '))
						);
				}
	
				// Add check / unchecked icon
				if (_this.options.showCheckbox) {
	
					var classList = ['check-icon'];
					if (node.state.checked) {
						//classList.push(_this.options.checkedIcon); 
						//if (node.state.partialChecked) 
						//	classList.push('tv-cbx-partial-checked');
						if (node.state.partialChecked)
							classList.push(_this.options.partialCheckedIcon); 
						else 
							classList.push(_this.options.checkedIcon); 
					}
					else {
						classList.push(_this.options.uncheckedIcon);
					}
	
					treeItem
						.append($(_this.template.icon)
							.addClass(classList.join(' '))
						);
				}
	
				// Add text
				if (_this.options.enableLinks) {
					// Add hyperlink
					treeItem
						.append($(_this.template.link)
							.attr('href', node.href)
							.append(node.text)
						);
				}
				else {
					// otherwise just text
					treeItem
						.append(node.text);
				}
	
				// Add tags as badges
				if (_this.options.showTags && node.tags) {
					$.each(node.tags, function addTag(id, tag) {
						treeItem
							.append($(_this.template.badge)
								.append(tag)
							);
					});
				}
	
				// Add item to the tree
				_this.$wrapper.append(treeItem);
	
				// Recursively add child ndoes
				if (node.nodes && node.state.expanded && !node.state.disabled) {
					return _this.buildTree(node.nodes, level);
				}
			}
		});
	};

	// Define any node level style override for
	// 1. selectedNode
	// 2. node|data assigned color overrides
	Tree.prototype.buildStyleOverride = function (node) {

		if (node.state.disabled) return '';

		var color = node.color;
		var backColor = node.backColor;

		if (this.options.highlightSelected && node.state.selected) {
			if (this.options.selectedColor) {
				color = this.options.selectedColor;
			}
			if (this.options.selectedBackColor) {
				backColor = this.options.selectedBackColor;
			}
		}

		if (this.options.highlightSearchResults && node.searchResult && !node.state.disabled) {
			if (this.options.searchResultColor) {
				color = this.options.searchResultColor;
			}
			if (this.options.searchResultBackColor) {
				backColor = this.options.searchResultBackColor;
			}
		}

		return 'color:' + color +
			';background-color:' + backColor + ';';
	};

	// Add inline style into head
	Tree.prototype.injectStyle = function () {

		if (this.options.injectStyle && !document.getElementById(this.styleId)) {
			$('<style type="text/css" id="' + this.styleId + '"> ' + this.buildStyle() + ' </style>').appendTo('head');
		}
	};

	// Construct trees style based on user options
	Tree.prototype.buildStyle = function () {

		var style = '.node-' + this.elementId + '{';

		if (this.options.color) {
			style += 'color:' + this.options.color + ';';
		}

		if (this.options.backColor) {
			style += 'background-color:' + this.options.backColor + ';';
		}

		if (!this.options.showBorder) {
			style += 'border:none;';
		}
		else if (this.options.borderColor) {
			style += 'border:1px solid ' + this.options.borderColor + ';';
		}
		style += '}';

		if (this.options.onhoverColor) {
			style += '.node-' + this.elementId + ':not(.node-disabled):hover{' +
				'background-color:' + this.options.onhoverColor + ';' +
			'}';
		}

		return this.css + style;
	};

	Tree.prototype.template = {
		list: '<ul class="list-group"></ul>',
		item: '<li class="list-group-item"></li>',
		indent: '<span class="indent"></span>',
		icon: '<span class="icon"></span>',
		link: '<a href="#" style="color:inherit;"></a>',
		badge: '<span class="badge"></span>'
	};

	Tree.prototype.css = '.treeview .list-group-item{cursor:pointer}.treeview span.indent{margin-left:10px;margin-right:10px}.treeview span.icon{width:12px;margin-right:5px}.treeview .node-disabled{color:silver;cursor:not-allowed}'

	/**
		Returns a single node object that matches the given node id.
		@param {Number} nodeId - A node's unique identifier
		@return {Object} node - Matching node
	*/
	Tree.prototype.getNode = function (nodeId) {
		return this.nodes[nodeId];
	};

	/**
		Returns the parent node of a given node, if valid otherwise returns undefined.
		@param {Object|Number} identifier - A valid node or node id
		@returns {Object} node - The parent node
	*/
	Tree.prototype.getParent = function (identifier) {
		var node = this.identifyNode(identifier);
		return this.nodes[node.parentId];
	};
	
	Tree.prototype.getAncestors = function (identifier) {
		var node = this.identifyNode(identifier);
		var parentNode = this.nodes[node.parentId];
		if (parentNode) {
			var ret = [];
			ret.push(parentNode);
			while (parentNode) {
				parentNode = this.nodes[parentNode.parentId];
				if (parentNode) ret.push(parentNode);
			};
			return ret;
		}
		return null;
	};
	
	Tree.prototype.getDescendants = function (identifier) {
		var node = this.identifyNode(identifier);
		if (node && node.nodes) {
			var ret = [];
			for (var i=0; i<node.nodes.length; i++) {
				ret.push(node.nodes[i]);
				if (node.nodes[i].nodes && node.nodes[i].nodes.length>0) ret = ret.concat(this.getDescendants(node.nodes[i]));
			}
			return ret;
		}
		return null;
	};
	
	Tree.prototype.getKhLeafs = function (identifier) {
		var node = this.identifyNode(identifier);
		if (node && node.nodes) {
			var ret = [];
			for (var i=0; i<node.nodes.length; i++) {
				if (node.nodes[i].data.type == 'kh') { // 客户已是最下一层
					ret.push(node.nodes[i]);
				} else if (node.nodes[i].nodes && node.nodes[i].nodes.length>0) {
					ret = ret.concat(this.getKhLeafs(node.nodes[i]));
				}
			}
			return ret;
		}
		return null;
	};
	
	Tree.prototype.getKhNextLeafs = function (identifier) {
		var node = this.identifyNode(identifier);
		if (node && node.nodes) {
			var ret = [];
			if (node.nodes.length > 0) {
				if (node.nodes[0].data.type == 'kh') { // 客户已是最下一层
					let index = -1;
					for (var i=0; i<node.nodes.length; i++) {
						if (!this.options.presentable || this.options.presentable['kh'] == 'ALL' 
							|| this.options.presentable['kh'] == node.nodes[i].data.sub) { // node sub 数据实际是khlxdm
							index = i; break; // 找到类型第一个客户下标
						}
					}
					for (var i=0; i<node.nodes.length; i++) {
						if (i != index) ret.push(node.nodes[i]);
					}
				} else {
					for (var i=0; i<node.nodes.length; i++) {
						if (node.nodes[i].nodes && node.nodes[i].nodes.length>0) {
							ret = ret.concat(this.getKhNextLeafs(node.nodes[i]));
						}
					}
				}
			}
			return ret;
		}
		return null;
	};
	

	/**
		Returns an array of sibling nodes for a given node, if valid otherwise returns undefined.
		@param {Object|Number} identifier - A valid node or node id
		@returns {Array} nodes - Sibling nodes
	*/
	Tree.prototype.getSiblings = function (identifier, all) {
		var node = this.identifyNode(identifier);
		var parent = this.getParent(node);
		var nodes = parent ? parent.nodes : this.tree;
		return nodes.filter(function (obj) {
			return all===true ? true : obj.nodeId !== node.nodeId;
		});
	};

	/**
		Returns an array of selected nodes.
		@returns {Array} nodes - Selected nodes
	*/
	Tree.prototype.getSelected = function () {
		return this.findNodes('true', 'g', 'state.selected');
	};

	/**
		Returns an array of unselected nodes.
		@returns {Array} nodes - Unselected nodes
	*/
	Tree.prototype.getUnselected = function () {
		return this.findNodes('false', 'g', 'state.selected');
	};

	/**
		Returns an array of expanded nodes.
		@returns {Array} nodes - Expanded nodes
	*/
	Tree.prototype.getExpanded = function () {
		return this.findNodes('true', 'g', 'state.expanded');
	};

	/**
		Returns an array of collapsed nodes.
		@returns {Array} nodes - Collapsed nodes
	*/
	Tree.prototype.getCollapsed = function () {
		return this.findNodes('false', 'g', 'state.expanded');
	};

	/**
		Returns an array of checked nodes.
		@returns {Array} nodes - Checked nodes
	*/
	Tree.prototype.getChecked = function () {
		return this.findNodes('true', 'g', 'state.checked');
	};

	/**
		Returns an array of unchecked nodes.
		@returns {Array} nodes - Unchecked nodes
	*/
	Tree.prototype.getUnchecked = function () {
		return this.findNodes('false', 'g', 'state.checked');
	};

	/**
		Returns an array of disabled nodes.
		@returns {Array} nodes - Disabled nodes
	*/
	Tree.prototype.getDisabled = function () {
		return this.findNodes('true', 'g', 'state.disabled');
	};

	/**
		Returns an array of enabled nodes.
		@returns {Array} nodes - Enabled nodes
	*/
	Tree.prototype.getEnabled = function () {
		return this.findNodes('false', 'g', 'state.disabled');
	};


	/**
		Set a node state to selected
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.selectNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setSelectedState(node, true, options);
		}, this));

		this.render();
	};

	/**
		Set a node state to unselected
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.unselectNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setSelectedState(node, false, options);
		}, this));

		this.render();
	};

	/**
		Toggles a node selected state; selecting if unselected, unselecting if selected.
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.toggleNodeSelected = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.toggleSelectedState(node, options);
		}, this));

		this.render();
	};


	/**
		Collapse all tree nodes
		@param {optional Object} options
	*/
	Tree.prototype.collapseAll = function (options) {
		var identifiers = this.findNodes('true', 'g', 'state.expanded');
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setExpandedState(node, false, options);
		}, this));

		this.render();
	};

	/**
		Collapse a given tree node
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.collapseNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setExpandedState(node, false, options);
		}, this));

		this.render();
	};

	/**
		Expand all tree nodes
		@param {optional Object} options
	*/
	Tree.prototype.expandAll = function (options) {
		options = $.extend({}, _default.options, options);

		if (options && options.levels) {
			this.expandLevels(this.tree, options.levels, options);
		}
		else {
			var identifiers = this.findNodes('false', 'g', 'state.expanded');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setExpandedState(node, true, options);
			}, this));
		}

		this.render();
	};

	/**
		Expand a given tree node
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.expandNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setExpandedState(node, true, options);
			if (node.nodes && (options && options.levels)) {
				this.expandLevels(node.nodes, options.levels-1, options);
			}
		}, this));

		this.render();
	};

	Tree.prototype.expandLevels = function (nodes, level, options) {
		options = $.extend({}, _default.options, options);

		$.each(nodes, $.proxy(function (index, node) {
			this.setExpandedState(node, (level > 0) ? true : false, options);
			if (node.nodes) {
				this.expandLevels(node.nodes, level-1, options);
			}
		}, this));
	};

	/**
		Reveals a given tree node, expanding the tree from node to root.
		@param {Object|Number|Array} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.revealNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			var parentNode = this.getParent(node);
			while (parentNode) {
				this.setExpandedState(parentNode, true, options);
				parentNode = this.getParent(parentNode);
			};
		}, this));

		this.render();
	};

	/**
		Toggles a nodes expanded state; collapsing if expanded, expanding if collapsed.
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.toggleNodeExpanded = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.toggleExpandedState(node, options);
		}, this));
		
		this.render();
	};
	
	Tree.prototype.scanPartialChecked = function (options) { // 只用在初始时扫描整个列表
		let leafs = [];
		for (let i=0; i<this.nodes.length; i++) {
			if (!this.nodes[i].nodes || this.nodes[i].nodes.length == 0) leafs.push(this.nodes[i]);
		}
		for (let i=0; i<leafs.length; i++) {
			let ancestors = this.getAncestors(leafs[i]) || [];
			this.forEachIdentifier(ancestors, options, $.proxy(function (node, options) {
				if (!node.state.partialChecked) {
					let partital = false;
					for (let i=0; i<node.nodes.length; i++) {
						if (!node.nodes[i].state.checked || node.nodes[i].state.partialChecked) { partital = true; break; }
					}
					this.setPartialCheckedState(node, partital, options);
				}
			}, this));
		}
		this.render();
	};
	
	Tree.prototype.hierCheckSelected = function (options) {
		let identifiers = this.findNodes('true', 'g', 'state.checked');
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setCheckedState(node, false, options);
		}, this));

		if (options) {
			if (options.selected) {
				for (let i=0; i<options.selected.length; i++) {
					let khid = options.selected[i].khid;
					if (khid) {
						for (let j=0; j<this.nodes.length; j++) {
							if (this.nodes[j].data.nid == khid) {
								let ancestors = this.getAncestors(this.nodes[j]) || [];
								let descendants = this.getDescendants(this.nodes[j]) || [];
								let nodes = ancestors.concat(descendants); 
								nodes.push(this.nodes[j]);
								
								this.forEachIdentifier(nodes, options, $.proxy(function (node, options) {
									this.setCheckedState(node, true, options);
								}, this));
								
								this.setPartialCheckedState(this.nodes[j], false, options);
								this.forEachIdentifier(ancestors, options, $.proxy(function (node, options) {
									let partital = false;
									for (let i=0; i<node.nodes.length; i++) {
										if (!node.nodes[i].state.checked || node.nodes[i].state.partialChecked) { partital = true; break; }
									}
									this.setPartialCheckedState(node, partital, options);
								}, this));
								this.forEachIdentifier(descendants, options, $.proxy(function (node, options) {
									this.setPartialCheckedState(node, false, options);
								}, this));
								
								break;
							}
						}
					}
				}
			}
			if (options.switchKhlx) {
				let khLeafs = this.getKhLeafs(0); // 取得根目录下所有到客户层节点
				if (khLeafs) {
					for (var i=0; i<khLeafs.length; i++) {
						if (options.switchKhlx == 'ALL' || khLeafs[i].data.sub == options.switchKhlx)
							this.setDisabledState(khLeafs[i], false, options);
						else 
							this.setDisabledState(khLeafs[i], true, options);
					}
				}
			}
		}

		this.render();
	};


	/**
		Check all tree nodes
		@param {optional Object} options
	*/
	Tree.prototype.checkAll = function (options) {
		var identifiers = this.findNodes('false', 'g', 'state.checked');
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setCheckedState(node, true, options);
		}, this));

		this.render();
	};

	/**
		Check a given tree node
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.checkNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setCheckedState(node, true, options);
		}, this));

		this.render();
	};
	
	
	Tree.prototype.toggleHierCheckedState = function (node, options) {
		if (!node) return;
		if (node.state.checked) this.hierUncheckNode(node.nodeId, options);
		else this.hierCheckNode(node.nodeId, options);
	};
	
	Tree.prototype.hierCheckNode = function (identifier, options) {
		var node = this.identifyNode(identifier);
		if (node) {
			var ancestors = this.getAncestors(identifier) || [];
			var descendants = this.getDescendants(identifier) || [];
			var nodes = ancestors.concat(descendants); 
			nodes.push(node);
			
			this.forEachIdentifier(nodes, options, $.proxy(function (node, options) {
				this.setCheckedState(node, true, options);
			}, this));
			
			this.setPartialCheckedState(node, false, options);
			this.forEachIdentifier(ancestors, options, $.proxy(function (node, options) {
				let partital = false;
				for (let i=0; i<node.nodes.length; i++) {
					if (!node.nodes[i].state.checked || node.nodes[i].state.partialChecked) { partital = true; break; }
				}
				this.setPartialCheckedState(node, partital, options);
			}, this));
			this.forEachIdentifier(descendants, options, $.proxy(function (node, options) {
				this.setPartialCheckedState(node, false, options);
			}, this));
			
			if (this.options.showCheckbox && this.options.exclusive) { // 是否有树某层级在显示checkbox时只能选择一个
				if (this.options.exclusive['kh']) { //目前只支持客户级，且客户级在最下层
					if (node.data.type == 'kh') { // 选中客户层节点
						var siblings = this.getSiblings(node.nodeId);
						for (var i=0; i<siblings.length; i++) {
							this.setCheckedState(siblings[i], false, options);
						}
					} else { // 选中客户层上级层的节点
						var khNextLeafs = this.getKhNextLeafs(node);
						if (khNextLeafs) {
							for (var i=0; i<khNextLeafs.length; i++) {
								this.setCheckedState(khNextLeafs[i], false, options);
							}
						}
					}
				}
			}
	
			this.render();
		}
	};
	
	Tree.prototype.hierUncheckNode = function (identifier, options) {
		var node = this.identifyNode(identifier);
		if (node) {
			var nodes = [], tmpNode = node;
			while(tmpNode) {
				var siblings = this.getSiblings(tmpNode.nodeId), hasChecked = false;
				if (siblings) {
					for (var i=0; i<siblings.length; i++) {
						if (siblings[i].state.checked) { hasChecked = true; break; }
					}
				} 
				if (hasChecked) {
					break;
				} else {  //兄弟节点没有选中
					tmpNode = this.getParent(tmpNode.nodeId);
					if (tmpNode && tmpNode.nodeId !== undefined && tmpNode.state) {
						if (tmpNode.state.checked) nodes.push(tmpNode);
					} else break;
				}
			}
			nodes.push(node);
			var ancestors = this.getAncestors(identifier) || [];
			var descendants = this.getDescendants(identifier) || [];
			nodes = nodes.concat(descendants); 
			
			this.forEachIdentifier(nodes, options, $.proxy(function (node, options) {
				this.setCheckedState(node, false, options);
			}, this));
			
			this.setPartialCheckedState(node, false, options);
			this.forEachIdentifier(ancestors, options, $.proxy(function (node, options) {
				let partital = false;
				for (let i=0; i<node.nodes.length; i++) {
					if (!node.nodes[i].state.checked || node.nodes[i].state.partialChecked) { partital = true; break; }
				}
				this.setPartialCheckedState(node, partital, options);
			}, this));
			this.forEachIdentifier(descendants, options, $.proxy(function (node, options) {
				this.setPartialCheckedState(node, false, options);
			}, this));
	
			this.render();
		}
	};

	/**
		Uncheck all tree nodes
		@param {optional Object} options
	*/
	Tree.prototype.uncheckAll = function (options) {
		var identifiers = this.findNodes('true', 'g', 'state.checked');
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setCheckedState(node, false, options);
		}, this));

		this.render();
	};

	/**
		Uncheck a given tree node
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.uncheckNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setCheckedState(node, false, options);
		}, this));

		this.render();
	};

	/**
		Toggles a nodes checked state; checking if unchecked, unchecking if checked.
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.toggleNodeChecked = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.toggleCheckedState(node, options);
		}, this));

		this.render();
	};
	
	/**
	    Add sub nodes to node
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options.node;
	*/
	Tree.prototype.addNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setAddNode(node, options);
		}, this));
		//this.setInitialStates({ nodes: this.tree }, 0);
		this.render();
	};
	Tree.prototype.setAddNode = function (node, options) {
		if (node.nodes == null) node.nodes = [];
		if (options.node) {
			var tmp = {nodeId: node.nodeId, nodes: []};
			if (Array.isArray(options.node)) {
				for (var i=0; i<options.node.length; i++) {
					tmp.nodes.push(options.node[i]);
				}
			} else {
				tmp.nodes.push(options.node);
			}
			let lvl = this.options.expandAddNode === true ? 0 : 100; //100层：实际不会有这么深的树，这里表示节点不展开
			this.setInitialStates(tmp, lvl);
			if (tmp.nodes.length > 1) { // 添加超过1个节点时，不调整其他节点排序号 （这种情况主要是Ajax首次加载到父节点）
				for (var i=0; i<tmp.nodes.length; i++) {
					node.nodes.push(tmp.nodes[i]);
				}
				if (this.options.presentable) {
					let khLeafs = null;
					if (this.options.presentable['kh'] == '00' || this.options.presentable['kh'] == '03') { //只展示业主 / 租客
						khLeafs = this.getKhLeafs(node);
					}
					if (khLeafs) {
						for (var i=0; i<khLeafs.length; i++) {
							if (khLeafs[i].data.sub != this.options.presentable['kh'])
								this.setDisabledState(khLeafs[i], true, options);
						}
					}
				}
				if (this.options.showCheckbox && node.state.checked && this.options.exclusive) { // 是否有树某层级在显示checkbox时只能选择一个
					if (this.options.exclusive['kh']) { //目前只支持客户级，且客户级在最下层
						var descendants = this.getDescendants(node.nodeId);
						for (var i=0; i<descendants.length; i++) {
							this.setCheckedState(descendants[i], true, options);
						}
						var khNextLeafs = this.getKhNextLeafs(node);
						if (khNextLeafs) {
							for (var i=0; i<khNextLeafs.length; i++) {
								this.setCheckedState(khNextLeafs[i], false, options);
							}
						}
					}
				}
			} else if (tmp.nodes.length == 1) { // 添加1个节点时，调整其他节点排序号
				var parent = node, self = tmp.nodes[0];
				if (self.data && self.data.plxh && parent.nodes.length > 0) { // 有排列序号，需要调整队列
    				var index = parent.nodes.length; // 插入队列默认排在最后
    				for (var i=0; i<parent.nodes.length; i++) {
		        		if (parent.nodes[i].data.plxh) {
		        			if (parent.nodes[i].data.plxh >= self.data.plxh) { index = i; break; } // 找到目标位置
		        		}
		        	}
    				if (index < parent.nodes.length) { // 目标位置在队列中间时需要调整后续节点的排序号
    					if (parent.nodes[index].data.plxh == self.data.plxh) { //目标位置的排序号与新节点一样时才需要调整
	    					var s = index, e = s;
	    					for (var i=s+1; i<parent.nodes.length; i++) { // 寻找需要调整的最后一个节点
		        				if (parent.nodes[i].data.plxh) {
		        					if (parent.nodes[i].data.plxh > parent.nodes[e].data.plxh+1) break;
				        			else e = i;
				        		}
		        			}
	    					for (var i=s; i<=e; i++) { // 所有要调整的节点排序号加1
		        				if (parent.nodes[i].data.plxh) parent.nodes[i].data.plxh++;
		        			}
    					}
    				}
    				parent.nodes.splice(index, 0, self); //插入到目标位置
		    	} else parent.nodes.push(self);
			}
		};
	};
	
	Tree.prototype.editNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setEditNode(node, options);
		}, this));
		//this.setInitialStates({ nodes: this.tree }, 0);
		this.render();
	};
	Tree.prototype.setEditNode = function (node, options) {
	    if (options) {
	    	if (options.data && options.data.plxh && options.data.plxh != node.data.plxh) { // 排除序号有改变，需要重新调整队列
	    		var parent = this.getParent(node);
	    		if (parent.nodes.length > 1) { // 多于1个元素时才需要调整
	    			var index = -1;
	    			for (var i=0; i<parent.nodes.length; i++) { //找到当前节点下标
		        		if (parent.nodes[i].data.id == options.data.id) { index = i; break; }
		        	}
	    			if (index != -1) {
	    				var tmp = parent.nodes.splice(index, 1)[0]; // 当前节点暂时移出队列
	    				index = parent.nodes.length; // 重新插入队列默认排在最后
	    				for (var i=0; i<parent.nodes.length; i++) {
			        		if (parent.nodes[i].data.plxh) {
			        			if (parent.nodes[i].data.plxh >= options.data.plxh) { index = i; break; } // 找到目标位置
			        		}
			        	}
	    				if (index < parent.nodes.length) { // 目标位置在队列中间时需要调整后续节点的排序号
	    					if (parent.nodes[index].data.plxh == options.data.plxh) { //目标位置的排序号与新节点一样时才需要调整
		    					var s = index, e = s;
		    					for (var i=s+1; i<parent.nodes.length; i++) { // 寻找需要调整的最后一个节点
			        				if (parent.nodes[i].data.plxh) {
			        					if (parent.nodes[i].data.plxh > parent.nodes[e].data.plxh+1) break;
					        			else e = i;
					        		}
			        			}
		    					for (var i=s; i<=e; i++) { // 所有要调整的节点排序号加1
			        				if (parent.nodes[i].data.plxh) parent.nodes[i].data.plxh++;
			        			}
	    					}
	    				}
	    				parent.nodes.splice(index, 0, tmp); //插入到目标位置
	    			}
	    		}
	    	}
	        $.extend(node, options);
	    };  
	};
	
	Tree.prototype.editNodeWithoutRender = function (identifiers, options) { // 设置节点是否可以选中，不用重新生成树，否则用editNode
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setEditNode(node, options);
		}, this));
	};
	
	Tree.prototype.getAllNodes = function () {
		return this.nodes;
	};
	
	Tree.prototype.deleteNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setDeleteNode( node, options);
		}, this));
		this.render();
	};
	Tree.prototype.setDeleteNode = function (node, options) {
		let deletable = true, recursive = (options && options.recursive === true) ? true : false;
		if (node.nodes) {
			if (recursive) {
				for (let i=0; i<node.nodes.length; i++) {
					this.setDeleteNode(node.nodes[i], options);
				}
			} else {
				for (let i=0; i<node.nodes.length; i++) 
					if (!node.nodes[i].state.deleted) { deletable = false; break; }
			}
		}
		if (deletable) { // 不删除数据，保证添加节点时生成nodeId不会重复
			node.state.selected = false;
			node.state.checked = false; // 删除后需要设置上级checked状态，暂不实现
			node.state.deleted = true;
		} else CxMsg.info('下级有数据不能删除');
		/*var parentNode = this.getParent(node);
		if(parentNode){
			for(var i =0; i < parentNode.nodes.length; i++){
				if(parentNode.nodes[i].nodeId == node.nodeId){
					parentNode.nodes.splice(i, 1);
				}
			}
		} else {
			var sibNodes = this.getSiblings(node,true);
			if (sibNodes != null){
				for(var i=0;i<sibNodes.length; i ++){
					if(node.nodeId == sibNodes[i].nodeId){
						this.tree.splice(i, 1);
					}
				}
			}
		}*/
		//this.setInitialStates({ nodes: this.tree }, 0);
	};
	
	Tree.prototype.openNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			var parentNode = this.getParent(node);
			while (parentNode) {
				this.setExpandedState(parentNode, true, options);
				parentNode = this.getParent(parentNode);
			};
		}, this));

		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setExpandedState(node, true, options);
			if (node.nodes && (options && options.levels)) {
				this.expandLevels(node.nodes, options.levels-1, options);
			}
		}, this));
		
		options.silent = false; // 触发选中事件
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setSelectedState(node, true, options);
		}, this));
		
		this.render();
	};
	
	Tree.prototype.setOptions = function (options) {
		Object.assign(this.options, options);
		if (!options.silent) this.render();
	};
	
	Tree.prototype.switchKhlx = function (options) {
		Object.assign(this.options, options);
		if (this.options.presentable && this.options.presentable['kh']) {
			let khLeafs = this.getKhLeafs(0); // 取得根目录下所有到客户层节点
			if (khLeafs) {
				for (var i=0; i<khLeafs.length; i++) {
					if (this.options.presentable['kh'] == 'ALL' || khLeafs[i].data.sub == this.options.presentable['kh'])
						this.setDisabledState(khLeafs[i], false, options);
					else 
						this.setDisabledState(khLeafs[i], true, options);
				}
			}
		}
		// 清除已选中的项
		var identifiers = this.findNodes('true', 'g', 'state.checked');
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setCheckedState(node, false, options);
		}, this));
		this.render();
	};
	
	

	/**
		Disable all tree nodes
		@param {optional Object} options
	*/
	Tree.prototype.disableAll = function (options) {
		var identifiers = this.findNodes('false', 'g', 'state.disabled');
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setDisabledState(node, true, options);
		}, this));

		this.render();
	};

	/**
		Disable a given tree node
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.disableNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setDisabledState(node, true, options);
		}, this));

		this.render();
	};

	/**
		Enable all tree nodes
		@param {optional Object} options
	*/
	Tree.prototype.enableAll = function (options) {
		var identifiers = this.findNodes('true', 'g', 'state.disabled');
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setDisabledState(node, false, options);
		}, this));

		this.render();
	};

	/**
		Enable a given tree node
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.enableNode = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setDisabledState(node, false, options);
		}, this));

		this.render();
	};

	/**
		Toggles a nodes disabled state; disabling is enabled, enabling if disabled.
		@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
		@param {optional Object} options
	*/
	Tree.prototype.toggleNodeDisabled = function (identifiers, options) {
		this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
			this.setDisabledState(node, !node.state.disabled, options);
		}, this));

		this.render();
	};


	/**
		Common code for processing multiple identifiers
	*/
	Tree.prototype.forEachIdentifier = function (identifiers, options, callback) {

		options = $.extend({}, _default.options, options);

		if (!(identifiers instanceof Array)) {
			identifiers = [identifiers];
		}

		$.each(identifiers, $.proxy(function (index, identifier) {
			callback(this.identifyNode(identifier), options);
		}, this));	
	};

	/*
		Identifies a node from either a node id or object
	*/
	Tree.prototype.identifyNode = function (identifier) {
		return ((typeof identifier) === 'number') ?
						this.nodes[identifier] :
						identifier;
	};

	/**
		Searches the tree for nodes (text) that match given criteria
		@param {String} pattern - A given string to match against
		@param {optional Object} options - Search criteria options
		@return {Array} nodes - Matching nodes
	*/
	Tree.prototype.search = function (pattern, options) {
		options = $.extend({}, _default.searchOptions, options);

		this.clearSearch({ render: false });

		var results = [];
		if (pattern && pattern.length > 0) {

			if (options.exactMatch) {
				pattern = '^' + pattern + '$';
			}

			var modifier = 'g';
			if (options.ignoreCase) {
				modifier += 'i';
			}

			results = this.findNodes(pattern, modifier);

			// Add searchResult property to all matching nodes
			// This will be used to apply custom styles
			// and when identifying result to be cleared
			$.each(results, function (index, node) {
				node.searchResult = true;
			})
		}

		// If revealResults, then render is triggered from revealNode
		// otherwise we just call render.
		if (options.revealResults) {
			this.revealNode(results);
		}
		else {
			this.render();
		}

		this.$element.trigger('searchComplete', $.extend(true, {}, results));

		return results;
	};

	/**
		Clears previous search results
	*/
	Tree.prototype.clearSearch = function (options) {

		options = $.extend({}, { render: true }, options);

		var results = $.each(this.findNodes('true', 'g', 'searchResult'), function (index, node) {
			node.searchResult = false;
		});

		if (options.render) {
			this.render();	
		}
		
		this.$element.trigger('searchCleared', $.extend(true, {}, results));
	};

	/**
		Find nodes that match a given criteria
		@param {String} pattern - A given string to match against
		@param {optional String} modifier - Valid RegEx modifiers
		@param {optional String} attribute - Attribute to compare pattern against
		@return {Array} nodes - Nodes that match your criteria
	*/
	Tree.prototype.findNodes = function (pattern, modifier, attribute) {

		modifier = modifier || 'g';
		attribute = attribute || 'text';

		var _this = this;
		return $.grep(this.nodes, function (node) {
			var val = _this.getNodeValue(node, attribute);
			if (typeof val === 'string') {
				return val.match(new RegExp(pattern, modifier));
			}
		});
	};

	/**
		Recursive find for retrieving nested attributes values
		All values are return as strings, unless invalid
		@param {Object} obj - Typically a node, could be any object
		@param {String} attr - Identifies an object property using dot notation
		@return {String} value - Matching attributes string representation
	*/
	Tree.prototype.getNodeValue = function (obj, attr) {
		var index = attr.indexOf('.');
		if (index > 0) {
			var _obj = obj[attr.substring(0, index)];
			var _attr = attr.substring(index + 1, attr.length);
			return this.getNodeValue(_obj, _attr);
		}
		else {
			if (obj.hasOwnProperty(attr)) {
				return obj[attr].toString();
			}
			else {
				return undefined;
			}
		}
	};

	var logError = function (message) {
		if (window.console) {
			window.console.error(message);
		}
	};

	// Prevent against multiple instantiations,
	// handle updates and method calls
	$.fn[pluginName] = function (options, args) {

		var result;

		this.each(function () {
			var _this = $.data(this, pluginName);
			if (typeof options === 'string') {
				if (!_this) {
					logError('Not initialized, can not call method : ' + options);
				}
				else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
					logError('No such method : ' + options);
				}
				else {
					if (!(args instanceof Array)) {
						args = [ args ];
					}
					result = _this[options].apply(_this, args);
				}
			}
			else if (typeof options === 'boolean') {
				result = _this;
			}
			else {
				$.data(this, pluginName, new Tree(this, $.extend(true, {}, options)));
			}
		});

		return result || this;
	};

})(jQuery, window, document);