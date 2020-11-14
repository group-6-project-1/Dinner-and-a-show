
//Zomato api key
//b9560497b1bfd6207f3bcdd820336297

// create zomato clas, and pull API with 
class Zomato {
	constructor() {

		// adding in API to javascipt, new object for the page
		this.api = "b9560497b1bfd6207f3bcdd820336297";
		//pulling headers from API page to gather data from API.
		this.header = {
			method: 'GET',
			headers: {
				'user-key': this.api,
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin'
		}
	}


	// search api for city and city to be able to return resturants
	async searchAPI(city) {

		const cityURL = `https://developers.zomato.com/api/v2.1/cities?q=${city}
		`

		//search city
		const cityInfo = await fetch(cityURL, this.header);
			console.log(cityInfo);
		const cityJSON = await cityInfo.json()

					// goes through API to locate city suggestion based of search
		const cityLocation = await cityJSON.location_suggestions;
		 
		// loop to grab cityid with city search
		let cityID = 0
		if(cityLocation.length !== 0) {
			cityID = await cityLocation[0].id
		}

		//search restaurant in zomato API to find results
		const restaurantURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city
		`
		const restaurantInfo = await fetch(restaurantURL, this.header)
		const restaurantJSON = await restaurantInfo.json()
		const restaurants = await restaurantJSON.restaurants
		console.log("checking response",restaurants)
		//return matched city with cityID & resturants.
		return {
			cityID,
				// console.log(cityID);
			restaurants
		}
	}
}
class Tvmaze{
    constructor (){
     

    }

    searchAPI(restaurant){
		  console.log("restaurant ",restaurant)
		// var show = restaurant.restaurant.cuisines.split(', ')[0] 
		// console.log( restaurant.restaurant.cuisines.split(', '))       
        $.ajax({
            url: 'https://api.tvmaze.com/singlesearch/shows?q='+ restaurant, 
            type: "GET",
             
		}).then(this.TVSuccess)
		
	}


     TVSuccess(data){
			console.log("show data:",data);

		const div = document.createElement('div');
 		div.setAttribute('class','col s3');
// // insert dive to the page where resturant page will be loaded
		div.innerHTML = `
			
			 
					<img src="${data.image.medium }" class="is-fullwidth" alt="">
		 
					<h6 class="text-uppercase pt-2 redText">${data.name}</h6>
					<p>${data.summary.substring(0,150)+"...<a href="+data.url+">read more</a>"}</p>
				 
			  
			 
		`
 	    document.getElementById("show-info").appendChild(div)

		
            // $("#show-info").append('<h3>' + data.name + '</h3>');
            // $("#show-info").append('<p>' + data.summary + '</p>');
            // $("#show-info").append('<img src= " '+ data.image.medium + ' " />')
        };
        
    
}

// creating the user interface for the entire div and feedback 
class UI {
	constructor() {
		this.restaurantList = document.querySelector('#restaurant-list')
	}

// creating results on if a city was found or if not found in the data base
	showFeedback(text) {
		const feedback = document.querySelector('.feedback');
		feedback.classList.add('showItem')
		feedback.innerHTML =`
			<p>${text}</p>
		`;
		
	}

// get resturants from the api, llok up their menu, zomato site, address

	getRestaurants(restaurants) {
		const tv = new Tvmaze()
		$("#show-info").empty();
		// results if no ciy exist exsist
		if(restaurants.length === 0) {
			this.showFeedback('no city/check spelling')

			// if city does exist, insert the innerhtml doc that includes, img, name, address, menu_url
		} else {
			 var i = 0 
			this.restaurantList.innerHTML = '';
			restaurants.forEach(restaurant => {

				const { thumb:img, name, location:{address},menu_url,url , cuisines} = restaurant.restaurant;

				if(img !== '' && i++<4) {
					this.showRestaurant(img, name, address,menu_url,url )
					//commas in the cuisine list caused error. use split to remove comma
					tv.searchAPI(cuisines.split(",")[0])     
				}
			})
		}
	}


	//display the resturant on the screen by creating a div to insert through the web api
	showRestaurant(img, name, address, menu_url,url) {
		const div = document.createElement('div');
		div.setAttribute('class','col s3');
// insert dive to the page where resturant page will be loaded
		div.innerHTML = `
			
			 
					<img src="${img}" class="is-fullwidth" alt="">
		 
					<h6 class="text-uppercase pt-2 redText">${name}</h6>
					<p>${address}</p>
				 
			 
					<a href="${menu_url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i>Menu</a>
			 
					<a href="${url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i>Zomato Page</a>
			 
		 
			 
		`
		this.restaurantList.appendChild(div)
	}
	
}


// function to return element on the page and feeback receieved if the no city exisit. 
(function(){
	const searchForm = document.getElementById('searchForm')
	const searchCity = document.getElementById('searchCity')
	const zomato = new Zomato()
	const ui = new UI()
	const tv = new Tvmaze()

	//using the submit button to gather city
	searchForm.addEventListener('submit', e => {
		e.preventDefault()

// construct cityValue and also return city serached to lower case
		const cityValue = searchCity.value.toLowerCase()

		if(cityValue != '') {
			//logic goes if populated value is true
	   	zomato.searchAPI(cityValue)
			.then(data => {
				if(data.cityID !== 0) {
					// console.log(data.cityID)
					zomato.searchAPI(cityValue)
					.then(data => {
						ui.getRestaurants(data.restaurants)

					//	tv.searchAPI(data.restaurants[0])
					})
				} else {
					ui.showFeedback('Please enter a valid city')
				}
			})
		} else {
			ui.showFeedback('please enter a city')
		}
	})


})()