import { Meteor } from "meteor/meteor";
import React from "react";
import Clipboard from "clipboard";
import moment from "moment";

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false,
      googleUrl: "https://domains.google.com/m/registrar/search?searchTerm=" + this.props.url
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard
      .on("success", () => {
        this.setState({ justCopied: true });
        setTimeout(() => this.setState({ justCopied: false }), 500);
      })
      .on("error", () => {
        alert("Something went wrong. Please manually copy link.");
      });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? "visit" : "visits";
    let visitedMessage = null;

    if (typeof this.props.lastVisitedAt === "number") {
      visitedMessage = `(visited ${moment(
        this.props.lastVisitedAt
      ).fromNow()})`;
    }

    return (
      <p className="item__message">
        {this.props.visitedCount} {visitMessage} {visitedMessage}
      </p>
    );
  }

  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a
          className="button button--pill button--link"
          title="Open URL in new tab"
          href={this.props.shortUrl}
          target="_blank"
        >
          Visit
        </a>
        <a
          className="button button--pill button--link" 
          title="Check if URL is available in new tab"
          target="_blank"
          href={this.state.googleUrl}
          >Register</a>
        <button
          className="button button--pill"
          title="Copies URL to clipboard"
          ref="copy"
          data-clipboard-text={this.props.shortUrl}
        >
          {this.state.justCopied ? "Copied" : "Copy"}
        </button>
        <button
          className="button button--pill"
          title="Hide URL. Click 'Show hidden links' to reveal"
          onClick={() => {
            Meteor.call(
              "links.setVisibility",
              this.props._id,
              !this.props.visible
            );
          }}
        >
          {this.props.visible ? "Hide" : "Unhide"}
        </button>
        <button
          className="button button--pill"
          title="Remove URL from list"
          onClick={() => {
            console.log("deleting url");
            Meteor.call("links.deleteOne", this.props._id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number
};
