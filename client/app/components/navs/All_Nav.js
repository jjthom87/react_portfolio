import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class HomeNav extends Component {
  render() {
  	var url = window.location.href;
  	var page = url.substring(url.lastIndexOf('/'), url.length);
    return (
      <div className="row">
        <div style={{display: 'inline-flex'}} className="col-md-4 col-md-offset-4">
        	<div className="nav-widths">
	          	{
	          		page === "/" ? 
	          			<span style={{margin: '10px', cursor: 'default'}}>
	          				<h5 style={{color: 'red'}}>Home</h5>
	          			</span> : 
	          			<Link style={{margin: '10px'}} to="/">
	          				<h5 style={{}}>Home</h5>
	          			</Link>
	          	}
	        </div>
	        <div className="nav-widths">
		        {
		        	page === "/projects" ?
		        	    <span style={{margin: '10px', cursor: 'default'}}>
	          				<h5 style={{color: 'red'}}>Projects</h5>
	          			</span> : 
	          			<Link style={{margin: '10px'}} to="/projects">
	          				<h5 style={{}}>Projects</h5>
	          			</Link>
		        }
		    </div>
		    <div className="nav-widths">
				{
					page === "/blog" ?
		        	    <span style={{margin: '10px', cursor: 'default'}}>
	          				<h5 style={{color: 'red'}}>Blog</h5>
	          			</span> : 
	          			<Link style={{margin: '10px'}} to="/blog">
	          				<h5 style={{}}>Blog</h5>
	          			</Link>
				}
			</div>
			<div className="nav-widths">
	            {
	            	page === "/about" ?
		        	    <span style={{margin: '10px', cursor: 'default'}}>
	          				<h5 style={{color: 'red'}}>About</h5>
	          			</span> : 
	          			<Link style={{margin: '10px'}} to="/about">
	          				<h5 style={{}}>About</h5>
	          			</Link>
	            }
	        </div>
	        <div className="nav-widths">
	            {
	            	page === "/email" ?
		        	    <span style={{margin: '10px', cursor: 'default'}}>
	          				<h5 style={{color: 'red'}}>Email</h5>
	          			</span> : 
	          			<Link style={{margin: '10px'}} to="/email">
	          				<h5 style={{}}>Email</h5>
	          			</Link>
	            }
	        </div>
        </div>
      </div>
    );
  }
};