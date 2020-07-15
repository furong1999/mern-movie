import React, { useEffect, useState } from 'react'
import { Typography,  Button } from 'antd';
import axios from 'axios';
import './favourite.css';
import { useSelector } from 'react-redux';


const { Title } = Typography;

function FavouritePage() {
    const user = useSelector(state => state.user)

    const [Favourites, setFavourites] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchFavouritedMovie()
    }, [])

    const fetchFavouritedMovie = () => {
        axios.post('/api/favourite/getFavouritedMovie', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favourites)
                    setFavourites(response.data.favourites)
                    setLoading(false)
                } else {
                    alert('Failed to get favourited movie')
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }

        axios.post('/api/favourite/removeFromFavourite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavouritedMovie()
                } else {
                    alert('Failed to Remove From Favourite')
                }
            })
    }


    const renderCards = Favourites.map((favourite, index) => {
        

        return <tr key={index}>
            <td>{favourite.movieTitle}</td>
            <td>{favourite.movieRunTime} mins</td>
            <td><Button onClick={() => onClickDelete(favourite.movieId, favourite.userFrom)}> Remove </Button></td>
        </tr>
    })

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <Title level={2} > My Favourite Movie </Title>
            <hr />
            {user.userData && !user.userData.isAuth ?
                <div style={{ width: '85%', fontSize: '2rem', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>No data available</p>
                    <a href="/login">Click here to add movie to favourite now!</a>
                </div>
                :
                !Loading &&
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favourites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default FavouritePage
