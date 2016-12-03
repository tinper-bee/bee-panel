'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeTransition = require('bee-transition');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  //是否添加折叠
  collapsible: _react2["default"].PropTypes.bool,
  onSelect: _react2["default"].PropTypes.func,
  //头部组件
  header: _react2["default"].PropTypes.node,
  id: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number]),
  //footer组件
  footer: _react2["default"].PropTypes.node,
  //默认是否打开
  defaultExpanded: _react2["default"].PropTypes.bool,
  //是否打开
  expanded: _react2["default"].PropTypes.bool,
  //每个panel的标记
  eventKey: _react2["default"].PropTypes.any,
  headerRole: _react2["default"].PropTypes.string,
  panelRole: _react2["default"].PropTypes.string,
  //颜色
  colors: _react2["default"].PropTypes.oneOf(['primary', 'accent', 'success', 'info', 'warning', 'danger', 'default', 'bordered']),

  // From Collapse.的扩展动画
  onEnter: _react2["default"].PropTypes.func,
  onEntering: _react2["default"].PropTypes.func,
  onEntered: _react2["default"].PropTypes.func,
  onExit: _react2["default"].PropTypes.func,
  onExiting: _react2["default"].PropTypes.func,
  onExited: _react2["default"].PropTypes.func
};

var defaultProps = {
  defaultExpanded: false,
  clsPrefix: "u-panel",
  colors: "default"
};

var Panel = function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel(props, context) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleClickTitle = _this.handleClickTitle.bind(_this);

    _this.state = {
      expanded: _this.props.defaultExpanded
    };
    return _this;
  }

  //头部点击事件


  Panel.prototype.handleClickTitle = function handleClickTitle(e) {
    // 不让事件进入事件池
    e.persist();
    e.selected = true;

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, e);
    } else {
      e.preventDefault();
    }

    if (e.selected) {
      this.setState({ expanded: !this.state.expanded });
    }
  };

  //渲染panelheader


  Panel.prototype.renderHeader = function renderHeader(collapsible, header, id, role, expanded, clsPrefix) {
    var titleClassName = clsPrefix + '-title';

    if (!collapsible) {
      if (!_react2["default"].isValidElement(header)) {
        return header;
      }

      return (0, _react.cloneElement)(header, {
        className: (0, _classnames2["default"])(header.props.className, titleClassName)
      });
    }

    if (!_react2["default"].isValidElement(header)) {
      return _react2["default"].createElement(
        'h4',
        { role: 'presentation', className: titleClassName },
        this.renderAnchor(header, id, role, expanded)
      );
    }

    return (0, _react.cloneElement)(header, {
      className: (0, _classnames2["default"])(header.props.className, titleClassName),
      children: this.renderAnchor(header.props.children, id, role, expanded)
    });
  };

  //如果使用链接，渲染为a标签


  Panel.prototype.renderAnchor = function renderAnchor(header, id, role, expanded) {
    return _react2["default"].createElement(
      'a',
      {
        role: role,
        href: id && '#' + id,
        onClick: this.handleClickTitle,
        'aria-controls': id,
        'aria-expanded': expanded,
        'aria-selected': expanded,
        className: expanded ? null : 'collapsed'
      },
      header
    );
  };

  //如果有折叠动画，渲染折叠动画


  Panel.prototype.renderCollapsibleBody = function renderCollapsibleBody(id, expanded, role, children, clsPrefix, animationHooks) {
    return _react2["default"].createElement(
      _beeTransition.Collapse,
      _extends({ 'in': expanded }, animationHooks),
      _react2["default"].createElement(
        'div',
        {
          id: id,
          role: role,
          className: clsPrefix + '-collapse',
          'aria-hidden': !expanded
        },
        this.renderBody(children, clsPrefix)
      )
    );
  };

  //渲染panelbody


  Panel.prototype.renderBody = function renderBody(rawChildren, clsPrefix) {
    var children = [];
    var bodyChildren = [];

    var bodyClassName = clsPrefix + '-body';

    //添加到body的children中
    function maybeAddBody() {
      if (!bodyChildren.length) {
        return;
      }

      // 给子组件添加key，为了之后触发事件时使用
      children.push(_react2["default"].createElement(
        'div',
        { key: children.length, className: bodyClassName },
        bodyChildren
      ));

      bodyChildren = [];
    }

    //转换为数组，方便复用
    _react2["default"].Children.toArray(rawChildren).forEach(function (child) {
      if (_react2["default"].isValidElement(child) && child.props.fill) {
        maybeAddBody();

        //将标示fill设置为undefined
        children.push((0, _react.cloneElement)(child, { fill: undefined }));

        return;
      }

      bodyChildren.push(child);
    });

    maybeAddBody();

    return children;
  };

  Panel.prototype.render = function render() {
    var _props = this.props,
        collapsible = _props.collapsible,
        header = _props.header,
        id = _props.id,
        footer = _props.footer,
        propsExpanded = _props.expanded,
        headerRole = _props.headerRole,
        panelRole = _props.panelRole,
        className = _props.className,
        colors = _props.colors,
        children = _props.children,
        onEnter = _props.onEnter,
        onEntering = _props.onEntering,
        onEntered = _props.onEntered,
        clsPrefix = _props.clsPrefix,
        onExit = _props.onExit,
        onExiting = _props.onExiting,
        onExited = _props.onExited,
        defaultExpanded = _props.defaultExpanded,
        eventKey = _props.eventKey,
        onSelect = _props.onSelect,
        props = _objectWithoutProperties(_props, ['collapsible', 'header', 'id', 'footer', 'expanded', 'headerRole', 'panelRole', 'className', 'colors', 'children', 'onEnter', 'onEntering', 'onEntered', 'clsPrefix', 'onExit', 'onExiting', 'onExited', 'defaultExpanded', 'eventKey', 'onSelect']);

    var expanded = propsExpanded != null ? propsExpanded : this.state.expanded;

    var classes = {};
    classes['' + clsPrefix] = true;
    classes[clsPrefix + '-' + colors] = true;

    return _react2["default"].createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2["default"])(className, classes),
        id: collapsible ? null : id
      }),
      header && _react2["default"].createElement(
        'div',
        { className: clsPrefix + '-heading' },
        this.renderHeader(collapsible, header, id, headerRole, expanded, clsPrefix)
      ),
      collapsible ? this.renderCollapsibleBody(id, expanded, panelRole, children, clsPrefix, { onEnter: onEnter, onEntering: onEntering, onEntered: onEntered, onExit: onExit, onExiting: onExiting, onExited: onExited }) : this.renderBody(children, clsPrefix),
      footer && _react2["default"].createElement(
        'div',
        { className: clsPrefix + '-footer' },
        footer
      )
    );
  };

  return Panel;
}(_react2["default"].Component);

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

exports["default"] = Panel;
module.exports = exports['default'];