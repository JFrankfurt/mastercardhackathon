/**
 * Created by Jordan on 11/8/2015.
 */

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
    <results url="/search" />,
    document.getElementById('searchContent')
);