/**
 *
 * @title 代码示例展示板
 * @description 可一键复制代码的展示板
 *
 */

import React, { Component } from 'react';
import {Panel} from '../../src';

const code = "\n\nimport React, { Component } from 'react';\nimport Temp from '../../src/index';\n\n class Demo1 extends Component {\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <Temp >复制这段测试代码</Temp>\n            </div>\n        )\n    }\n}\n\n\n";

class Demo4 extends Component {
    constructor(props){
        super(props);
        this.state = {
            code : code
        }
    }
    render () {
        return (
            <div className="demoPadding">
                <Panel copyable>
                    <pre><code className="hljs javascript">{code}</code></pre>
                </Panel>
            </div>
        )
    }
}

export default Demo4;
