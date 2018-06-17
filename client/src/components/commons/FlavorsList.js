import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import { Link } from "react-router-dom";
import { Rating } from "material-ui-rating";

class FlavorsList extends Component {
  render() {
    if (!this.props.flavors) {
      return <div>..loading</div>;
    }
    let inventoryFlavors = this.props.flavors;

    let width = window.innerWidth;

    return (
      <div>
        <List>
          {inventoryFlavors.map(flavor => (
            <Link
              to={`/flavors/${flavor._id}`}
              key={flavor._id}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                leftAvatar={<Avatar src={flavor.iconUrl} />}
                primaryText={flavor.name}
                secondaryText={`${flavor.brand} - ${parseFloat(
                  flavor.qty
                ).toFixed(1)} ml`}
                rightIconButton={
                  width > 500 ? (
                    <Rating
                      value={flavor.rating}
                      max={5}
                      readOnly={true}
                      itemStyle={{
                        width: "20px",
                        height: "20px"
                      }}
                      itemIconStyle={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "-10px"
                      }}
                    />
                  ) : (
                    <div />
                  )
                }
              />
              <Divider />
            </Link>
          ))}
        </List>
      </div>
    );
  }
}

export default FlavorsList;
