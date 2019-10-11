import React, { Component } from "react";
import './Project.css';

class Project extends Component {
  render() {
    return (
        <div className="container-box"> 
            <h1>Orange Tee</h1>
            <h2>Project description</h2>
            <p className="info">Over the past years, Colliers has
                witnessed developers saturate the
                supply stock with upscale offerings.
                This, in turn, has led the high-tier
                spectrum of the market reach an
                oversupply state. While we recognise
                the presence of capable buyers, the
                demand for such offerings remains
                niche. This has resonated in the
                relatively sluggish sales velocity
                observed in majority of projects
                under these segments.
                In lieu of the current market
                characteristics, developers are
                advised to shift their focus on
                delivering more affordable and mid
                units. These segments are likely to
                appeal to the majority, especially to
                the low and middle income buyers,
                as the difference in terms of pricing
                with high-end properties remains
                either double or triple the current
                prices of mid-tier offerings. This
                should be reinforced by bank
                partnership allowing more flexible
                mortgage terms.
            </p>
            <h2>Timeline</h2>
            <p className="info">
                4 months
            </p>
            <h2>Skills</h2>
            <div className="info">
                <p>- Python, using of ML models</p>
                <p>- R, for statistics</p>
                <p>- English and Burmes (perfered)</p>
            </div>
            <h2>Hours/pay</h2>
            <p className="info">
                $20/hr, 10hr/week 
            </p>
            <button className="button button-primary button-improve">
                <i className="fa fa-chevron-right"></i> Accept Project
            </button>
        </div>
    );
  }
}

export default Project;