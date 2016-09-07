import React from 'react'
import NavLink from 'components/NavLink'

export default React.createClass({
    render() {
        return (
            <div>
                <div className="row">
                    <div className="one column">
                        <NavLink to="/" onlyActiveOnIndex>
                            <img className="navLogoImage" src="/img/logo-small.png"/>
                        </NavLink>
                    </div>
                    <div className="eleven columns">
                        <h1>Kalibri Technical Evaluation</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="three columns">
                        <ul>
                            <li>
                                <NavLink to="/" onlyActiveOnIndex>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/example">Save</NavLink>
                            </li>
 <li>
                                <NavLink to="/find">Find</NavLink>
                            </li>
                 
                        </ul>
                    </div>
                    <div className="nine columns">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
})
