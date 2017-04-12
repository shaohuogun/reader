    var Message = React.createClass({

      render: function() {
        return (
            <div>
              <a href={this.props.message.url}>{this.props.message.title}</a>
              <br/>
              <span>{this.props.message.releaseDate}</span>
              <span>{this.props.message.pageview}</span>
              <span>{this.props.message.commentCount}</span>
            </div>
        );
      }

    });

    var MessageList = React.createClass({

      render: function() {
        var rows = [];
        this.props.messages.forEach(function(message) {
          rows.push(
            <Message message={message} key={message.id} />);
        });
        return (
          <div className="">{rows}</div>
        );
      }

    });

    var App = React.createClass({

      loadMessagesFromServer: function() {
    	  var self = this;
    	  $.ajax({
    	      url: "/channel/b6840c19-501d-49e7-a809-24fcd3015c78/message",
    	    }).then(function(data) {
    	      self.setState({ messages: data.objects });
    	    });
      },

      getInitialState: function() {
        return { messages: [] };
      },

      componentDidMount: function() {
        this.loadMessagesFromServer();
      },

      render: function() {
        return ( <MessageList messages={this.state.messages} /> );
      }

    });

    ReactDOM.render(<App />, document.getElementById('root') );