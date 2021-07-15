import React from 'react'
import rightArrow from '../../assets/right-arrow.svg'

const PINField: React.FC = () => {
	return (
		<div id="pin-field">
			<form className="enter-pin-field">
				<input type="text" placeholder="Enter PIN to join"></input>
			</form>
			<button className="enter-arrow-btn">
				<img src={ rightArrow } className="right-arrow"/>
			</button>
		</div>
	)
}

export default PINField
