import React from 'react'
import ReactDOM from 'react-dom'
import Layout from '@src/layout'
import EditPropertyForm from './editPropertyForm'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <EditPropertyForm />
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
});
