import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Profile extends Component {

    render() {
        return (
            <div>
                <p>Profil go her</p>
                <Link to="/">Link</Link>
            </div>
        )
    }
}