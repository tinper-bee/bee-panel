import classnames from 'classnames';
import React, { cloneElement } from 'react';

import { Collapse } from 'bee-transition';




const propTypes = {
    //是否添加折叠
  collapsible: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  //头部组件
  header: React.PropTypes.node,
  headerStyle: React.PropTypes.object,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string, React.PropTypes.number,
  ]),
  headerContent: React.PropTypes.bool,
  //footer组件
  footer: React.PropTypes.node,
  footerStyle: React.PropTypes.object,
  //默认是否打开
  defaultExpanded: React.PropTypes.bool,
  //是否打开
  expanded: React.PropTypes.bool,
  //每个panel的标记
  eventKey: React.PropTypes.any,
  headerRole: React.PropTypes.string,
  panelRole: React.PropTypes.string,
  //颜色
  colors: React.PropTypes.oneOf(['primary', 'accent', 'success', 'info', 'warning', 'danger','default','bordered']),

  // From Collapse.的扩展动画
  onEnter: React.PropTypes.func,
  onEntering: React.PropTypes.func,
  onEntered: React.PropTypes.func,
  onExit: React.PropTypes.func,
  onExiting: React.PropTypes.func,
  onExited: React.PropTypes.func,
};

const defaultProps = {
  defaultExpanded: false,
  clsPrefix: "u-panel",
  colors: "default"
};

class Panel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClickTitle = this.handleClickTitle.bind(this);

    this.state = {
      expanded: this.props.defaultExpanded,
    };
  }

 //头部点击事件
  handleClickTitle(e) {
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
  }

//渲染panelheader
  renderHeader(collapsible, header, id, role, expanded, clsPrefix) {
    const titleClassName = `${clsPrefix}-title`;

    if (!collapsible) {
      if (!React.isValidElement(header)) {
        return header;
      }

      return cloneElement(header, {
        className: classnames(header.props.className, titleClassName),
      });
    }

    if (!React.isValidElement(header)) {
      return (
        <h4 role="presentation" className={titleClassName}>
          {this.renderAnchor(header, id, role, expanded)}
        </h4>
      );
    }
    if(this.props.headerContent){
        return cloneElement(header, {
          className: classnames(header.props.className, titleClassName),
        });
    }

    return cloneElement(header, {
      className: classnames(header.props.className, titleClassName),
      children: this.renderAnchor(header.props.children, id, role, expanded),
    });
  }

//如果使用链接，渲染为a标签
  renderAnchor(header, id, role, expanded) {
    return (
      <a
        role={role}
        href={id && `#${id}`}
        aria-controls={id}
        aria-expanded={expanded}
        aria-selected={expanded}
        className={expanded ? null : 'collapsed' }
      >
        {header}
      </a>
    );
  }

  //如果有折叠动画，渲染折叠动画
  renderCollapsibleBody(
    id, expanded, role, children, clsPrefix, animationHooks
  ) {
    return (
      <Collapse in={expanded} {...animationHooks}>
        <div
          id={id}
          role={role}
          className={`${clsPrefix}-collapse`}
          aria-hidden={!expanded}
        >
          {this.renderBody(children, clsPrefix)}
        </div>
      </Collapse>
    );
  }

  //渲染panelbody
  renderBody(rawChildren, clsPrefix) {
    const children = [];
    let bodyChildren = [];

    const bodyClassName = `${clsPrefix}-body`;

    //添加到body的children中
    function maybeAddBody() {
      if (!bodyChildren.length) {
        return;
      }

      // 给子组件添加key，为了之后触发事件时使用
      children.push(
        <div key={children.length} className={bodyClassName}>
          {bodyChildren}
        </div>
      );

      bodyChildren = [];
    }

    //转换为数组，方便复用
    React.Children.toArray(rawChildren).forEach(child => {
      if (React.isValidElement(child) && child.props.fill) {
        maybeAddBody();

        //将标示fill设置为undefined
        children.push(cloneElement(child, { fill: undefined }));

        return;
      }

      bodyChildren.push(child);
    });

    maybeAddBody();

    return children;
  }

  render() {
    const {
      collapsible,
      header,
      id,
      footer,
      expanded: propsExpanded,
      footerStyle,
      headerStyle,
      headerRole,
      panelRole,
      className,
      colors,
      children,
      onEnter,
      onEntering,
      onEntered,
      clsPrefix,
      onExit,
      headerContent,
      style,
      onExiting,
      onExited,
      defaultExpanded,
      eventKey,
      onSelect,
      ...props
    } = this.props;


    const expanded = propsExpanded != null ?
      propsExpanded : this.state.expanded;

    const classes ={};
    classes[`${clsPrefix}`] = true;
    classes[`${clsPrefix}-${colors}`] = true;

    const headerClass = {
        [`${clsPrefix}-heading`] : true
    }

    return (
      <div
        {...props}
        className={classnames(className, classes)}
        id={collapsible ? null : id}
      >
        {header && (
          <div className={classnames(headerClass)} style={headerStyle} onClick={ this.handleClickTitle }>
            {this.renderHeader(
              collapsible, header, id, headerRole, expanded, clsPrefix
            )}
          </div>
        )}

        {collapsible ?
          this.renderCollapsibleBody(
            id, expanded, panelRole, children, clsPrefix,
            { onEnter, onEntering, onEntered, onExit, onExiting, onExited }
          ) :
          this.renderBody(children, clsPrefix)
        }

        {footer && (
          <div className={`${clsPrefix}-footer`} style={footerStyle}>
            {footer}
          </div>
        )}
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
