// This can be expanded to utilise the useRef hook and then scroll to a target element based on vertical offset.
const ScrollVh = () => {
	window.scrollTo({ top:window.innerHeight, behavior:"smooth" });
};

export default ScrollVh;