import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Img from "gatsby-image"

const BackgroundSlider = ({images, duration, transition, initDelay, query, children, ...gatsbyImageProps}) => {	
	let nodes = [];
	let bgRefs = [];
	let subRefs = [];	
	let bgWrappers = [];
	let subWrappers = [];
	const {style, ...imageProps} = gatsbyImageProps;

	nodes.safePush = function(data){
		if(data){
			return this.push(data);
		}else{
			return this.length;
		}
	}
	
	if(images){
		for(let image of images){
			nodes.safePush(
				query.backgrounds.nodes.find(
					node => node.relativePath === image
				)
			)
		}
	}else{
		nodes = query.backgrounds.nodes;
	}
	
	const imgs = nodes.map(
		(data, index)=>{			
			const backgroundStyle = {
				position:"absolute", 
				zIndex: -10,
				width:"100%", 
				height: "100%", 
				margin:0, 
				padding:"none", 
				left:0, top:0, 
				backgroundSize:"cover", 
				opacity: index ? 0 : 1, 
				transition: `opacity ${transition}s`
			};

			const subStyle = {
				opacity: index ? 0 : 1, 
				transition: `opacity ${transition}s`, 
				pointerEvents: index ? "none" : "auto"
			}

			subRefs[index] = React.createRef();
			bgRefs[index] = React.createRef();

			return (
				<React.Fragment key={index}>
					<div ref={bgRefs[index]}><Img fluid={data.childImageSharp.fluid} style={{...backgroundStyle, ...style}} {...imageProps}/></div>
					<div ref={subRefs[index]} style={subStyle}>{React.Children.toArray(children)[index]}</div>
				</React.Fragment>
			);
		} 
	);
	
	const initEffect = () => {
		bgRefs.forEach((bgRef) => {
			bgWrappers.push(bgRef.current.firstElementChild);			
		});

		subRefs.forEach((subRef) =>{
			subWrappers.push(subRef.current);
		})
		
		const callback = function(index = 0){     
			const length = bgWrappers.length;
			
			bgWrappers[index].style.opacity = 0;
			bgWrappers[(index + 1) % length].style.opacity = 1;

			subWrappers[index].style.opacity = 0;
			subWrappers[index].style.pointerEvents = "none";
			
			subWrappers[(index + 1) % length].style.opacity = 1;
			subWrappers[(index + 1) % length].style.pointerEvents = "auto";					
			
			setTimeout(callback, duration * 1000, (index + 1) % length);
		}

		setTimeout(callback, initDelay * 1000, 0);	
	}
	 
	// Runs once after DOM is loaded; effectively `componentDidMount`	
	useEffect(initEffect, []);
	
	return <React.Fragment>{imgs}</React.Fragment>	
}

BackgroundSlider.defaultProps = {
	images: null,
	duration: 5,
	transition: 2,
	initDelay: 5,
}

BackgroundSlider.propTypes = {
	query: PropTypes.object.isRequired,
	images: PropTypes.arrayOf(PropTypes.string),
	duration: PropTypes.number,
	transition: PropTypes.number,
	initDelay: PropTypes.number,
}

export default BackgroundSlider
