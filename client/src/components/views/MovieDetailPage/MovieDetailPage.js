import React,{useEffect, useState} from 'react'
import {API_URL,API_KEY,IMAGE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import {Descriptions, Button, Row} from 'antd';
import GridCard from '../LandingPage/Sections/GridCard'
import Favourite from './Sections/Favourite';



function MovieDetailPage(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] =useState([])
    const [Crews, setCrews] =useState([])
    const [ActorToggle, SetActorToggle] =useState([false])


    useEffect(() => {

       

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&`)
                .then(response => response.json())
                .then(response => {
                    setMovie(response)

                    fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                        .then(response=> response.json())
                        .then(response => {
                            console.log(response)
                            setCrews(response.cast)
                        })
                })
    }, [])

    const handleClick= ( )=>{
        SetActorToggle(!ActorToggle)

    }

    return (
        <div>
            
            {/*Movie Main Image */}
            {Movie &&
                <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`} 
                title={Movie.original_title} text={Movie.overview} crews={Movie.tagline}/>
            }

            {/* Body */}
            <div style={{width:'85%', margin:'1rem auto'}}>
                <div style={{display:'flex',position:'absolute '}}>
                    <Favourite userFrom={localStorage.getItem('userId')}movieId={movieId} movieInfo={Movie}/>
                </div>


                {/* Movie Info Table */}
                <Descriptions title="Movie Info" bordered >
                <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                <Descriptions.Item label="Release Date">{Movie.release_date}</Descriptions.Item>
                <Descriptions.Item label="Total Revenue">{Movie.revenue}</Descriptions.Item>
                <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
                <Descriptions.Item label="Average_vote" >{Movie.vote_average}</Descriptions.Item>
                <Descriptions.Item label="Vote_count">{Movie.vote_count}</Descriptions.Item>
                <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
                <Descriptions.Item label="Popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

            <br />
            <div style={{display:'flex',justifyContent:'center', margin:'2rem'}}>
                    <Button onClick={handleClick}>Click to View Actor</Button>
                </div>
                <br />
                


               
                {ActorToggle &&
                        <Row gutter={[16,16]}>
                        {Crews && Crews.map((crew,index) => (
                            <React.Fragment key={index}>
                                {crew.profile_path && 
                                <GridCard
                                actor image={`${IMAGE_URL}w500${crew.profile_path }`}
                                character ={crew.character}        
                            />
                                }                                     
                            </React.Fragment>
                    ))}

            </Row>



                }


                


                </div>


        </div>
    )
}

export default MovieDetailPage
