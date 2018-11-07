class ArticlesRandom extends React.Component {


  // Using ES6 class syntax
  constructor() {
     super();
     // Setting up initial state
     this.state = {
        data: []
     }
  }



  // get the data, bind it to 'data'
  pingAxios()  {
     var th = this;
     this.serverRequest = axios.get(this.props.source)
     .then(function(response) {
         th.setState({
             data: response.data
         });
     })
  }



  // calling the componentDidMount() method after a component is rendered for the first time
  componentDidMount() {

    this.pingAxios(); // initial page load

    // update page every 10 seconds
    this.interval = setInterval(() => {
      this.pingAxios(); // comment this function if you don't need the interval
    }, 10000);

  }



  // calling the componentWillUnMount() method immediately before a component is unmounted from the DOM
  componentWillUnmount() {

    // aborting/clearing to avoid memory overflows
    this.serverRequest.abort();
    clearInterval(this.interval);

  }



  render() {

    var titles = []
    var blob = []
    var i = 0

    this.state.data.forEach(item => {
      if(i<3) { // just showing 3 items. you should control this in the View instead
        var summary = item.body[0].summary.substring(0,125); // truncating summary
        var path = "/node/" + item.nid[0].value; // creating a path to node
        blob.push(
          <div className="view-row">
            <h2 className="events"><a href={path}>{item.title[0].value}</a></h2>
            <div className="field-body-summary">{summary}</div>
          </div>
        );
      }
      else {
        /*
        blob.push(
          <div className="view-row">
            <h2 className="events">{item.title[0].value}</h2>
          </div>
        );
        */
      }
      i++;
    })


     return (
        <div className="view view--articles--random">
          <div className="view-header">
            <h2 className="title">Articles: Random (10s)</h2>
          </div>
          <div className="view-content">
            {blob}
          </div>
        </div>
      );

   }

}

// rendering into the DOM
ReactDOM.render(

  <ArticlesRandom source="http://localhost:8888/api/articles/random" />,
  document.getElementById('react--view--articles--random')

);
