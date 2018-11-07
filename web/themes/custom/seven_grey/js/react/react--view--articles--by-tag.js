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
  pingAxios(tid)  {
     var th = this;
     var url = this.props.source;

     // if we have a default tag id, use it to form the URL
     if (this.props.defaultTag != "") {
      url = this.props.source + "/" + this.props.defaultTag;
     }

     // if a Term ID has been passed, use it to form the URL,
     // overriding the default URL
     if (tid != null)  {
      url = this.props.source + "/" + tid;
     }

     this.serverRequest = axios.get(url)
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
      //this.pingAxios();
    }, 1000);

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

        blob.push(
          <div className="view-row">
            <div className="field-title" dangerouslySetInnerHTML={{ __html: item.title }}></div>
            <div className="field-body" dangerouslySetInnerHTML={{ __html: item.body }}></div>
            <div className="field-term-list" dangerouslySetInnerHTML={{ __html: item.term_node_tid }}></div>
          </div>
        );
    })


     return (
        <div className="view view--articles--by-tag">
          <div className="view-header">
            <h2 className="title">Articles: By Tag</h2>
            <div className="view-filter">
              <div className="view-filter--title">
                <h3>Filter:</h3>
                <div className="active-tag"></div>
              </div>
              <div className="view-filter--tag-options">
                <ul>
                  <li className="active" onClick={() => this.pingAxios(1)}>Washington</li>
                  <li onClick={() => this.pingAxios(2)}>Baltimore</li>
                </ul>
              </div>
            </div>
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

  // this has a default so we see data to begin with.
  // The view API is expecting a Term ID as argument
  <ArticlesRandom source="http://localhost:8888/api/articles/by-tag" defaultTag="1" />,
  document.getElementById('react--view--articles--by-tag')

);
