var React = require('react');
var Reflux = require('reflux');
var Store = require('./stores/store');
var Actions = require('./actions/actions');
var $ = require('jquery');
var GoogleMap = require('google-map-react');
var TodoPoint = require('./components/TodoPoint');
var HotelPoint = require('./components/hotelPoint');
var App = React.createClass({
    mixins: [Reflux.connect(Store)],
    getInitialState(){
        return({
            hoveringActivity: null
        })
    },
    handleClick() {
        // trigger dummy action
        Actions.testAction();
        $('#shit').hide();
    },
    setAndSuggestDestination(e) {

        if(e.target.value.length > 2) {
            Actions.findSuggestDestination(e.target.value);
        }
    },
    submitDestination(suggestion) {
        Actions.submitDestination(suggestion);
    },
    checkTodo(i) {
        Actions.checkTodo(i);
    },
    submitTodo(){
        Actions.submitTodo();
    },
    showActivityInfo(todo) {
        this.setState({
            hoveringActivity: todo
        })
    },

    render() {
        return (
            <div>
                <p id="shit">shit</p>
                <button onClick={this.handleClick}>{this.state.msg}</button>

                <input type="text" onChange={this.setAndSuggestDestination}/>
                

                <div>
                    <h2>Destination Suggestions</h2>
                    {this.state.destinationSuggestion.map(function(suggestion) {
                      return <p key={suggestion.i} onClick={this.submitDestination.bind(this,suggestion)}>{suggestion.s}</p>
                    },this)}
                </div>

                <div style={{width:'100vw', height: '85vh'}}>
                    <div style={{width:'50%',height:'100%',display:'inline-block'}}>
                        <GoogleMap center={this.state.selectedDestination ? [parseFloat(this.state.selectedDestination.ll.lat),parseFloat(this.state.selectedDestination.ll.lng)]:[47.445340,-122.291810]} zoom={9}>
                            {this.state.thingsToDo.map(function(todo,i) {
                                var lat = parseFloat(todo.latLng.split(",")[0]);
                                var lng = parseFloat(todo.latLng.split(",")[1]);
                                return (
                                    <TodoPoint lat={lat} lng={lng} todoName={todo.title} />
                                );
                              
                            },this)}
                        </GoogleMap>
                    </div>
                    <div style={{width:'50%',height:'100%', display:'inline-block'}}>
                        <div style={{width:'100%',height:'30%'}}>
                        <div onClick={this.submitTodo}>submit todo</div>
                            {this.state.hoveringActivity ? (
                                <div>
                                    <div>
                                        {this.state.hoveringActivity.title}
                                        {this.state.hoveringActivity.duration}
                                    </div>
                                    <img src={"http:" + this.state.hoveringActivity.imageUrl} />
                                    
                                </div>
                            ) : (
                                <p>hover on activities to see descriptions</p>
                            )}
                            
                        </div>
                        <div style={{width:'100%',height:'70%', overflow:'scroll'}}>
                            {this.state.thingsToDo.map(function(todo,i) {
                                return (
                                    <div onClick={this.checkTodo.bind(this,i)} 
                                    onMouseEnter={this.showActivityInfo.bind(this,todo)} 
                                    onMouseLeave={this.showActivityInfo.bind(this,null)} 
                                    style={todo.selected ? {border:'2px blue solid', margin:'5px',width:'150px',height:'150px',position:'relative',overflow:'hidden',display:'inline-block'} : {margin:'5px',width:'150px',height:'150px',position:'relative',overflow:'hidden',display:'inline-block',border:'2px white solid'}}>
                                        
                                        <img style={{position:'absolute', left:'-100%',right:'-100%',top:'-100%',bottom:'-100%',margin:'auto',minHeight:'100%',minWidth:'100%'}} src={"http:" + todo.imageUrl}/>
                                        
                                    </div>
                                );
                              
                            },this)}
                        </div>
                    </div>
                </div>

                <div style={{width:'100vw',height:'70vh'}}>
                    <div style={{width:'50%',height:'100%',display:'inline-block',overflow:'scroll'}}>
                        {this.state.nearByHotel.map(function(hotel,i) {
                                var lat = parseFloat(hotel.Location.GeoLocation.Latitude);
                                var lng = parseFloat(hotel.Location.GeoLocation.Longitude);
                                return (
                                    <div>
                                        <p>{hotel.Name}</p>
                                        <p>{hotel.StarRating}</p>
                                    </div>
                                );
                              
                            },this)}
                    </div>
                    <div style={{width:'50%',height:'100%',display:'inline-block'}}>
                        <GoogleMap center={this.state.selectedDestination ? [parseFloat(this.state.selectedDestination.ll.lat),parseFloat(this.state.selectedDestination.ll.lng)]:[47.445340,-122.291810]} zoom={9}>
                            {this.state.nearByHotel.map(function(hotel,i) {
                                var lat = parseFloat(hotel.Location.GeoLocation.Latitude);
                                var lng = parseFloat(hotel.Location.GeoLocation.Longitude);
                                return (
                                    <HotelPoint lat={lat} lng={lng} hotelName={hotel.Name} />
                                );
                              
                            },this)}
                            {this.state.selectedTodo.map(function(todo,i) {
                                var lat = parseFloat(todo.latLng.split(",")[0]);
                                var lng = parseFloat(todo.latLng.split(",")[1]);
                                return (
                                    <TodoPoint lat={lat} lng={lng} todoName={todo.title} />
                                );
                              
                            },this)}
                        </GoogleMap>
                    </div>
                </div>
                

            </div>
        )
    }
});

React.render( <App />,  document.getElementById('app'));

