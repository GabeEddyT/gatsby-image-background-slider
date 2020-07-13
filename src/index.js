import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Img from "gatsby-image"

/**
 * @param {object} props Component props
 * @param {object} props.callbacks interface for callback functions (pass this to Pagination, if used)
 * @param {(newIndex:number) => void} props.callbacks.atIndex sets background to specified index
 * @param {(prevIndex: number, newIndex: number) => void} props.callbacks.onChange user-provided callback fired when background image changes
 * @param {Function} props.callbacks.next sets background to the next one
 * @param {Function} props.callbacks.prev sets background to the previous one 
 * @param {string[]} props.images list of specified image file names to set order
 * @param {number} [props.duration=5] duration background is shown for
 * @param {number} [props.transition=2] length of transition
 * @param {object.isRequired} props.query result of GraphQL query for images
 * @param {JSXElement[]} props.children subtitles/captions in sync for respective background images;
 * (<React.Fragment/> to skip over one)
 * @param {Array} props.gatsbyImageProps remaining props spread onto Img elements
 * @param {number} [props.initDelay=5] initial delay before first transition
 */
const BackgroundSlider = ({callbacks, images, duration, transition, initDelay, query, children, ...gatsbyImageProps}) => {	
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
		
		const [timeoutHandle, setTimeoutHandle] = useState(0);
		const timeoutHandleRef = useRef(timeoutHandle);
		timeoutHandleRef.current = timeoutHandle;
		const [index, setIndex] = useState(0);
		const indexRef = useRef(index);
	indexRef.current = index;
	
	if (callbacks) callbacks.getCount = () => imgs.length;

	const clearAndSetTimeoutHandle = (newTimeoutHandle) => {
		clearTimeout(timeoutHandleRef.current);
		setTimeoutHandle(newTimeoutHandle);
	}

	const initEffect = () => {
		bgRefs.forEach((bgRef) => {
			bgWrappers.push(bgRef.current.firstElementChild);			
		});

		subRefs.forEach((subRef) =>{
			subWrappers.push(subRef.current);
		})
		
				const length = bgWrappers.length;
		const callback = function(){     
						const index = indexRef.current;
			
			bgWrappers[index].style.opacity = 0;
			bgWrappers[(index + 1) % length].style.opacity = 1;

			subWrappers[index].style.opacity = 0;
			subWrappers[index].style.pointerEvents = "none";
			
			subWrappers[(index + 1) % length].style.opacity = 1;
			subWrappers[(index + 1) % length].style.pointerEvents = "auto";					
			
			if(callbacks && callbacks.onChange) 
			{
				callbacks.onChange(index, (index + 1) % length);
			}
						setIndex(prevIndex => (prevIndex + 1) % length);
						clearAndSetTimeoutHandle(setTimeout(callback, duration * 1000));
		}

				clearAndSetTimeoutHandle(setTimeout(callback, initDelay * 1000));
 
				if (callbacks){     
						callbacks.atIndex = function (newIndex) {
								const index = indexRef.current;
								clearTimeout(timeoutHandleRef.current);
										
								bgWrappers[index].style.opacity = 0;
								bgWrappers[(newIndex) % length].style.opacity = 1;
				
								subWrappers[index].style.opacity = 0;
								subWrappers[index].style.pointerEvents = "none";
								
								subWrappers[(newIndex) % length].style.opacity = 1;
								subWrappers[(newIndex) % length].style.pointerEvents = "auto";					
				
				
				if(callbacks.onChange) 
				{
					callbacks.onChange(index, newIndex % length);
				}
								setIndex((newIndex) % length);
								clearAndSetTimeoutHandle(setTimeout(callback, duration * 1000));        
						}

						callbacks.next = () => callbacks.atIndex((indexRef.current + 1) % length);
			callbacks.prev = () => callbacks.atIndex((indexRef.current + length - 1) % length);
				}
		
		return () => {
			clearTimeout(timeoutHandleRef.current);
		}
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

export const Pagination = ({callbacks}) => {
	let buttonRefs = [];

	useEffect(()=>{
		callbacks.onChange = (prevIndex, newIndex) => { 
			buttonRefs[prevIndex].current.style.color = 'silver'; 
			buttonRefs[prevIndex].current.style.transform = 'scale(1.0,1.0)'; 
			buttonRefs[newIndex].current.style.color = 'white'; 
			buttonRefs[newIndex].current.style.transform="scale(1.2, 1.2)";
		};	
	},[]);

	return(
		<React.Fragment>
			{Array.from(Array(callbacks.getCount()).keys()).map ((index) =>
				<span role='button' ref={buttonRefs[index] = React.createRef()} 
				key={index}
				style={{
					userSelect: 'none', 
					color: index === 0 ? 'white' : 'silver', 
					fontSize: '4em', 
					cursor: 'pointer', 
					display: 'inline-block', 
					transform: index === 0 ? 'scale(1.2,1.2)' : 'scale(1.0)'
				}} 
				onClick={() => callbacks.atIndex(index)}>&middot;</span>
			)}
		</React.Fragment>
	)
}
