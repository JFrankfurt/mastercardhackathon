/**
 * Created by Jordan on 11/8/2015.
 */
var Result = React.createClass({
    render: function() {
        return (
            <div className="result">
                <h3 className="merchName">
                    {this.props.merchName}
                </h3>
                <p className="postalCode">
                    {this.props.postalCode}
                </p>
            </div>
        );
    }
});

var ResultBox = React.createClass({
    loadResultsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleSearch: function(data) {
        var results = this.state.data;
        this.setState({data: data});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadResultsFromServer();
    },
    render: function() {
        return (
            <div className="resultBox">
                <h1>Results</h1>
                <ResultList data={this.state.data} />
                <ResultForm onSearch={this.handleSearch} />
            </div>
        );
    }
});

var ResultList = React.createClass({
    render: function() {
        var resultNodes = this.props.data.map(function(result, index) {
            return (
                <Result merchName={result.merchName} key={index}>
                    {result.postalCode}
                </Result>
            );
        });
        return (
            <div className="resultList">
                {resultNodes}
            </div>
        );
    }
});

var SearchForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var merchName = this.refs.merchName.value.trim();
        var postalCode = this.refs.postalCode.value.trim();
        if (!postalCode || !merchName) {
            return;
        }
        this.props.onSearchSubmit({merchName: merchName, postalCode: postalCode});
        this.refs.merchName.value = '';
        this.refs.postalCode.value = '';
    },
    render: function() {
        return (
            <form className="searchBox" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Search" ref="merchName" />
                <input type="text" placeholder="Postal Code" ref="postalCode" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});


ReactDOM.render(
    <ResultBox url="/search" />,
    document.getElementById('searchContent')
);