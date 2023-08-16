import React from 'react';
import { authenticityHeader } from '@utils/fetchHelper';

const NewPropertyForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const newProperty = {
      title: formData.get('title'),
      description: formData.get('description'),
      city: formData.get('city'),
      country: formData.get('country'),
      property_type: formData.get('property_type'),
      price_per_night: formData.get('price_per_night'),
      max_guests: formData.get('max_guests'),
      bedrooms: formData.get('bedrooms'),
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      images: formData.getAll('images[]'),
    };

    const formDataToSend = new FormData();
    newProperty.images.forEach((image) => {
      formDataToSend.append('property[images][]', image);
    });
    formDataToSend.append('property[title]', newProperty.title);
    formDataToSend.append('property[description]', newProperty.description);
    formDataToSend.append('property[city]', newProperty.city);
    formDataToSend.append('property[country]', newProperty.country);
    formDataToSend.append('property[property_type]', newProperty.property_type);
    formDataToSend.append('property[price_per_night]', newProperty.price_per_night);
    formDataToSend.append('property[max_guests]', newProperty.max_guests);
    formDataToSend.append('property[bedrooms]', newProperty.bedrooms);
    formDataToSend.append('property[beds]', newProperty.beds);
    formDataToSend.append('property[baths]', newProperty.baths);

    fetch('/api/properties', {
      method: 'POST',
      headers: {
        ...authenticityHeader(),
      },
      body: formDataToSend,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((responseJSON) => {
        console.log(responseJSON);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation: ', error.message);
      });
  };

  return (
    <div className='container'>
        <form className='needs-validation' onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label className='form-label' htmlFor="title">Title</label> <br />
                <input type="text" name="title" className='form-control' id="title" />
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="description">Description</label> <br />
                <textarea className='form-control' name="description" id="description" cols="30" rows="10"></textarea>
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="city">City</label> <br />
                <input className='form-control' type="text" name="city" id="city" />
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="country">Country</label> <br />
                <input className='form-control' type="text" name="country" id="country" />
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="property_type">Property Type</label> <br />
                <select className='form-control' name="property_type" id="property_type">
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="bed_and_breakfast">Bed &amp; Breakfast</option>
                </select>
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="price_per_night">Price per night</label> <br />
                <input className='form-control' type="number" name="price_per_night" id="price_per_night" />
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="max_guests">Max guests</label> <br />
                <input className='form-control' type="number" name="max_guests" id="max_guests" />
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="bedrooms">Bedrooms</label> <br />
                <input className='form-control' type="number" name="bedrooms" id="bedrooms" />
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="beds">Beds</label> <br />
                <input className='form-control' type="number" name="beds" id="beds" />
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="baths">Baths</label> <br />
                <input className='form-control' type="number" name="baths" id="baths" />
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="images">Images</label>{' '} <br />
                <input className='form-control' type="file" name="images[]" id="images" multiple />
            </div>
            <div className='mb-3'>
                <input className='btn btn-primary' type="submit" value="Create Property" />
            </div>
        </form>
    </div>
  );
};

export default NewPropertyForm;
