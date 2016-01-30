var React = require('react');

var HotelPoint = React.createClass({
    displayName: 'HotelPoint',

    render() {
        var style = {
            position: 'absolute',
            width: 40,
            height: 40,
            left: -40 / 2,
            top: -40 / 2,
            border: '5px solid green',
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
                {this.props.hotelName}
            </div>
        );
    }
});

export default HotelPoint;