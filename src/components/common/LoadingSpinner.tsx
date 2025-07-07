import React from "react";

interface LoadingSpinnerProps {
	size?: string;
	color?: string;
	speed?: string;
	bgOpacity?: number;
	className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = "40px",
	color = "black",
	speed = "0.8s",
	bgOpacity = 0.1,
	className = "",
}) => {
	const containerStyle: React.CSSProperties = {
		height: size,
		width: size,
		transformOrigin: "center",
		animation: `rotate ${speed} linear infinite`,
		willChange: "transform",
		overflow: "visible",
	};

	const trackStyle: React.CSSProperties = {
		fill: "none",
		stroke: color,
		opacity: bgOpacity,
		transition: "stroke 0.5s ease",
	};

	const carStyle: React.CSSProperties = {
		fill: "none",
		stroke: color,
		strokeDasharray: "25, 75",
		strokeDashoffset: 0,
		strokeLinecap: "round",
		transition: "stroke 0.5s ease",
	};

	return (
		<>
			<style>
				{`
          @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
          }
        `}
			</style>
			<svg
				className={`loading-spinner ${className}`}
				viewBox='0 0 40 40'
				height='40'
				width='40'
				style={containerStyle}>
				<circle
					className='track'
					cx='20'
					cy='20'
					r='17.5'
					pathLength='100'
					strokeWidth='5px'
					style={trackStyle}
				/>
				<circle
					className='car'
					cx='20'
					cy='20'
					r='17.5'
					pathLength='100'
					strokeWidth='5px'
					style={carStyle}
				/>
			</svg>
		</>
	);
};

export default LoadingSpinner;
