import React from 'react'

function Popup({ selected, closePopup }) {
	return (
		<section className="popup">
			<div className="content">
			<br></br>
				<br></br>
				<br></br>
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>
				<div>
				<p className="genre">Genre: {selected.Genre}</p>
				<p className="rating">IMDB Rating: {selected.imdbRating}</p>
				<div>
					<a
                href={'https://www.imdb.com/title/' + selected.imdbID}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View on IMDB
              </a>
			  </div>
				
				<div className="plot">
					<img src={selected.Poster} />
					<p>{selected.Plot}</p>
					
			  </div>
				</div>
				<button className="close" onClick={closePopup}>Close</button>
			</div>
		</section>
	)
}

export default Popup