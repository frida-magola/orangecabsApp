const calculateFare = (baseFare, timeRate, time,  distanceRate, distance, surge)=>{
	const distanceInKm = distance * 0.001; //convert distance perkm
	const timeInMin = time * 0.0166667; // convert time in munites
	const pricePerKm = timeRate * timeInMin;
	const pricePerMinute = distanceRate * distanceInKm;
	const totalFare = (baseFare + pricePerKm + pricePerMinute) * surge;
	return Math.round(totalFare);
};

export default calculateFare;