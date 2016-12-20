/**
 *
 * @title 默认的展示板
 * @description 使用<Row>组件和<Col>组件进行页面栅格切分
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
