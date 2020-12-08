const landingPage = async({render}) => {
	console.log('landed');
	render('landing.ejs');
}

export { landingPage };