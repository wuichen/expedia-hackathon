var React = require('react');

var TodoPoint = React.createClass({
    displayName: 'TodoPoint',

    render() {
        var style = {
            position: 'absolute',
            width: 40,
            height: 40,
            left: -40 / 2,
            top: -40 / 2,
            border: '5px solid #f44336',
            backgroundColor: 'white',
            textAlign: 'center',
            color: '#3f51b5',
            fontSize: 12,
            fontWeight: 'bold',
            padding: 4,
            cursor: 'pointer'
        }
        return (
            <div style={style}>
                {this.props.todoName}
            </div>
        );
    }
});

export default TodoPoint;