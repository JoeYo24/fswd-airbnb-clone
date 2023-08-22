import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';

import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
  };

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          property: data.property,
          loading: false,
        });
      });
  }

  handleEditClick = () => {
    const { id } = this.state.property;
    window.location.href = `/my_properties/${id}/edit`;
  };

  render() {
    const { property, loading } = this.state;
    console.log(property);
    if (loading) {
      return <p>loading...</p>;
    }

    const {
      title,
      description,
      city,
      property_type,
      max_guests,
      bedrooms,
      beds,
      baths,
      images,
      user,
      price_per_night,
    } = property;

    return (
      <Layout>
        <div className="property-image mb-3" style={{ backgroundImage: `url(${images[0].image_url})` }} />

        <div className="container">
          <div className="row">
            <div className="info col-12 col-lg-7">
              <div className="mb-3">
                <h3 className="mb-0">{title}</h3>
                <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{user.username}</b></small></p>
              </div>
              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>
                  <span className="me-3">{max_guests} guests</span>
                  <span className="me-3">{bedrooms} bedroom</span>
                  <span className="me-3">{beds} bed</span>
                  <span className="me-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
              <button className="btn btn-primary" onClick={this.handleEditClick}>Edit Property</button>
            </div>
            <div className="col-12 col-lg-5">
              <BookingWidget property_id={property.id} price_per_night={price_per_night}/>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Property;
