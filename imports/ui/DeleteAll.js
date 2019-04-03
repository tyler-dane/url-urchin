import React from "react";

export default class DeleteAll extends React.Component {
  render() {
    return (
      <div>
        <button
          className="button button--secondary"
          title="Delete all URLs. Cannot be undone."
          onClick={() => {
            Meteor.call("links.deleteAll");
          }}
        >
          Delete All
        </button>
      </div>
    );
  }
}
