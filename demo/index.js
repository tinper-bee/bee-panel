
import { Con, Row, Col } from 'bee-layout';
import { Panel, PanelGroup } from '../src';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


/**
 *
 * @title 默认的展示板
 * @description 默认的展示板由header,body和footer组成。
 *
 */

class Demo1 extends Component {
    render () {
        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    <Panel header="Panel header" footer='Panel footer'>
                      Panel content
                    </Panel>
                </Col>
            </Row>

        )
    }
}
/**
 *
 * @title 手风琴效果的展示板组
 * @description 使用PanelGroup组件的accordion属性设置手风琴效果
 *
 */

class Demo2 extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        activeKey: '1'
      };
      this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(activeKey) {
      this.setState({ activeKey });
    }

    render () {
        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                      <Panel header="Panel 1" eventKey="1">Panel 1 content</Panel>
                      <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
                    </PanelGroup>
                </Col>
            </Row>
        )
    }
}
/**
 *
 * @title 可折叠的展示板
 * @description 设置展示板Panel的collapsible属性设置可折叠
 *
 */

class Demo3 extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        open: true
      };
    }
    render () {
        return (

            <Row>
                <Col md={4} mdOffset={2}>
                    <Button colors="primary" onClick={ ()=> this.setState({ open: !this.state.open })}>
                      click
                    </Button>
                    <Panel collapsible expanded={this.state.open}>
                        "来玩躲猫猫啊~~"
                    </Panel>
                </Col>
            </Row>
        )
    }
}
var DemoArray = [{"example":<Demo1 />,"title":" 默认的展示板","code":"/**\r\n *\r\n * @title 默认的展示板\r\n * @description 默认的展示板由header,body和footer组成。\r\n *\r\n */\r\n\r\nclass Demo1 extends Component {\r\n    render () {\r\n        return (\r\n            <Row>\r\n                <Col md={8} mdOffset={2}>\r\n                    <Panel header=\"Panel header\" footer='Panel footer'>\r\n                      Panel content\r\n                    </Panel>\r\n                </Col>\r\n            </Row>\r\n\r\n        )\r\n    }\r\n}\r\n","desc":" 默认的展示板由header,body和footer组成。"},{"example":<Demo2 />,"title":" 手风琴效果的展示板组","code":"/**\r\n *\r\n * @title 手风琴效果的展示板组\r\n * @description 使用PanelGroup组件的accordion属性设置手风琴效果\r\n *\r\n */\r\n\r\nclass Demo2 extends Component {\r\n    constructor(...args) {\r\n      super(...args);\r\n      this.state = {\r\n        activeKey: '1'\r\n      };\r\n      this.handleSelect = this.handleSelect.bind(this);\r\n    }\r\n    handleSelect(activeKey) {\r\n      this.setState({ activeKey });\r\n    }\r\n\r\n    render () {\r\n        return (\r\n            <Row>\r\n                <Col md={8} mdOffset={2}>\r\n                    <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>\r\n                      <Panel header=\"Panel 1\" eventKey=\"1\">Panel 1 content</Panel>\r\n                      <Panel header=\"Panel 2\" eventKey=\"2\">Panel 2 content</Panel>\r\n                    </PanelGroup>\r\n                </Col>\r\n            </Row>\r\n        )\r\n    }\r\n}\r\n","desc":" 使用PanelGroup组件的accordion属性设置手风琴效果"},{"example":<Demo3 />,"title":" 可折叠的展示板","code":"/**\r\n *\r\n * @title 可折叠的展示板\r\n * @description 设置展示板Panel的collapsible属性设置可折叠\r\n *\r\n */\r\n\r\nclass Demo3 extends Component {\r\n    constructor(...args) {\r\n      super(...args);\r\n      this.state = {\r\n        open: true\r\n      };\r\n    }\r\n    render () {\r\n        return (\r\n\r\n            <Row>\r\n                <Col md={4} mdOffset={2}>\r\n                    <Button colors=\"primary\" onClick={ ()=> this.setState({ open: !this.state.open })}>\r\n                      click\r\n                    </Button>\r\n                    <Panel collapsible expanded={this.state.open}>\r\n                        \"来玩躲猫猫啊~~\"\r\n                    </Panel>\r\n                </Col>\r\n            </Row>\r\n        )\r\n    }\r\n}\r\n","desc":" 设置展示板Panel的collapsible属性设置可折叠"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );


        return (
            <Col md={12}>
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible headerContent expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0, borderColor: "transparent"}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
