import React, { useState } from 'react';
import { authenticityHeader } from '@utils/fetchHelper';

const NewPropertyForm = () => {
  const [images, setImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form submitted');

    const form = document.getElementById('propertyForm');
    console.log('form element: ', form);

    if (!form) {
      console.error('Form not found');
      return;
    }
    const fileInputElement = document.querySelector('#image');

    const formData = new FormData();
    formData.append('property[title]', form.title.value);
    formData.append('property[description]', form.description.value);
    formData.append('property[city]', form.city.value);
    formData.append('property[country]', form.country.value);
    formData.append('property[property_type]', form.property_type.value);
    formData.append('property[price_per_night]', form.price_per_night.value);
    formData.append('property[max_guests]', form.max_guests.value);
    formData.append('property[bedrooms]', form.bedrooms.value);
    formData.append('property[beds]', form.beds.value);
    formData.append('property[baths]', form.baths.value);
    formData.append('property[image]', fileInputElement.files[0]);

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          ...authenticityHeader(),
        },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setImages([]);
        const responseJSON = await response.json();
        console.log(responseJSON);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation: ', error.message);
      console.log('Response: ', error.response);
    }
  };

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);
    setImages(newImages);
  };

  return (
    <div className='container'>
        <form className='needs-validation' id='propertyForm'>
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
              <label className='form-label' htmlFor='images'>
                Images
              </label>{' '}
              <br />
              <input
                className='form-control'
                type='file'
                name='image'
                id='image'
                accept='image/*'
                multiple
                onChange={handleImageChange}
              />
            </div>
            <div className='mb-3'>
                <input className='btn btn-primary' type="submit" value="Create Property" onClick={handleSubmit} />
            </div>
        </form>
    </div>
  );
};

export default NewPropertyForm;