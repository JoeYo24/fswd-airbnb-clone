import React from "react";
import { handleErrors, safeCredentials } from "@utils/fetchHelper";
import PropertyBookings from "./propertyBookings";

class UserProperties extends React.Component {
  state = {
    properties: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchProperties();
  }

  fetchProperties = () => {
    fetch(`/api/${this.props.user_id}/properties`, safeCredentials())
      .then(handleErrors)
      .then((res) => {
        this.setState({
          properties: res.properties,
          loading: false,
          next_page: res.next_page,
          total_pages: res.total_pages,
        });
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { properties, loading } = this.state;
    console.log(properties)

    return (
      <div className="container pt-4">
        <div className="row">
          {properties.map((property) => (
            <div key={property.id} className="col-6 col-lg-4 mb-4 property">
              <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                <img src={property.images.url} className="w-100 mb-2 property-image rounded" />
                <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                <h6 className="mb-0">{property.title}</h6>
                <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
              </a>
              <PropertyBookings propertyId={property.id} />
            </div>
          ))}
        </div>
        {loading && <p>loading...</p>}
      </div>
    );
  }
}

export default UserProperties;
