import React from "react";
import FlipMove from "react-flip-move";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";
import LinksListItem from "./LinksListItem";
import { Links } from "../api/links";

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    console.log("component mounted");
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe("links");
      const links = Links.find({
        visible: Session.get("showVisible")
      }).fetch();

      this.setState({ links });
    });
  }
  componentWillMount() {
    console.log("componenetWillUnmount");
    //this.linksTracker.stop();
  }
  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No hidden links</p>
        </div>
      );
    }

    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
    });
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}
