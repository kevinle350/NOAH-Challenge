import React, { useState, useEffect } from 'react';
import './Rewards.css'
import Footer from './Footer';
import { Button, Card } from 'react-bootstrap';
import yellow from './images/Yellow.png';
import user from './images/User.png';
import {useQuery} from '@apollo/client';
import {USER_QUERY} from "../GraphQL/Queries" ;


function Rewards() {
    const [offset, setOffset] = useState(0)
    const [users, setUsers] = useState([])
    const [sorted, setSorted] = useState([])
    const [leaderboard, setLeaderboard] = useState(true)
    const [earn, setEarn] = useState(false)

    //States for time bar
    const [all, setAll] = useState(true)
    const [day, setDay] = useState(false)
    const [week, setWeek] = useState(false)
    const [month, setMonth] = useState(false)
    const [year, setYear] = useState(false)

    const {error, loading, data} = useQuery(USER_QUERY)

    const loadMoreUsers = () => {
        sortUsers()
        if (offset <= data?.users.length) {
            var newUsers = [];
            var slicedArr = sorted.slice(offset, offset + 10)
            slicedArr?.forEach((u) => newUsers.push(u));
            setUsers((oldUsers) => [...oldUsers, ...newUsers]);
            setOffset(offset+10)
        } 
    }

    //sort users
    //@TODO Optimize: esp with a large number of users
    const sortUsers = () => {
        if (sorted.length < data?.users.length)
        data?.users.forEach((u) => sorted.push(u));
        sorted.sort((a, b) => {return b.points - a.points})
        setSorted(sorted)
    }

    useEffect(() => {
        loadMoreUsers();
    }, [data]);

   
    return (
        <>
            <div className='rewards-bg'>
                <div className='center'>
                    <div className='page-wrapper'>
                        <div className='top-gradient'>
                            <div className='L0'>
                                <p className='rewards-title'>Rewards</p>
                                <img className='user-img' src={user} />
                            </div>
                            <div className='L1'>
                                <img src={yellow} />
                                <div>
                                    <p className='five-hundred-style'>500</p>
                                    <p className='lifetime-style'>LifeTime Noah Points</p>
                                    <p className='blue-style'>1500 more to Blue Level</p>
                                </div>
                            </div>
                            <div className='L2'>
                                <Button variant="link" size="lg" className='L2-btn'>Level Benefits</Button>
                                <Button variant="link" size="lg" className='L2-btn'>Earn Points</Button>
                            </div>
                            <div className='L3-card'>
                                <Card className='L3-card-wrapper'>
                                    <Card.Body>
                                        <Card.Title className='invite-title'>Invite friends & earn points</Card.Title>
                                        <Card.Text className='earn-style'>
                                            Earn 500 Noah points for every friend you refer,
                                        </Card.Text>
                                        <Card.Text className='your-style'>
                                            Your refferal will also get 250 Noah points.
                                        </Card.Text>
                                        <Button className='refer-btn' variant="primary">Refer a Friend</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className='L4-card'>
                                <Card className='L4-card-wrapper'>
                                    <div className='L4-card-data'>
                                        <p className='two-hundred-points'>200</p>
                                        <div className='L4-card-text'>
                                            <p className='avaliable-style'>Avaliable Noah</p>
                                            <p className='points-style'>Points</p>
                                        </div>
                                    </div>
                                    <Button className='redeem-btn' variant="outline-primary">Redeem your points</Button>
                                </Card>
                            </div>
                            <div className='leaderboard-earn-wrapper'>
                                <Button onClick={() => { setLeaderboard(true); setEarn(false) }} className={leaderboard ? 'leaderboard-earn-btn' : 'leaderboard-earn-btn unused'}>
                                    Leaderboard
                                </Button>
                                <Button onClick={() => { setLeaderboard(false); setEarn(true) }} className={earn ? 'leaderboard-earn-btn' : 'leaderboard-earn-btn unused'}>
                                    Earn
                                </Button>
                            </div>
                            <div className='time'>
                                <Card>
                                    <div className='time-wrapper'>
                                        <Button
                                            className={!all ? 'time-btn' : 'time-btn clicked'}
                                            onClick={() => { setAll(true); setDay(false); setWeek(false); setMonth(false); setYear(false); }}
                                        >
                                            All
                                        </Button>
                                        <Button
                                            className={!day ? 'time-btn' : 'time-btn clicked'}
                                            onClick={() => { setAll(false); setDay(true); setWeek(false); setMonth(false); setYear(false); }}
                                        >
                                            Day
                                        </Button>
                                        <Button
                                            className={!week ? 'time-btn' : 'time-btn clicked'}
                                            onClick={() => { setAll(false); setDay(false); setWeek(true); setMonth(false); setYear(false); }}
                                        >
                                            Week
                                        </Button>
                                        <Button
                                            className={!month ? 'time-btn' : 'time-btn clicked'}
                                            onClick={() => { setAll(false); setDay(false); setWeek(false); setMonth(true); setYear(false); }}
                                        >
                                            Month
                                        </Button>
                                        <Button
                                            className={!year ? 'time-btn' : 'time-btn clicked'}
                                            onClick={() => { setAll(false); setDay(false); setWeek(false); setMonth(false); setYear(true); }}
                                        >
                                            Year
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                            <div>
                                {users.map((u, i) => {
                                    return (
                                        <Card key={i} className='users-card'>
                                            <div className='users-card-data top'>
                                                <p className='rank'>{i + 1}. </p>
                                                <p>{u.name} </p> 
                                            </div>
                                            <div className='users-card-data'>
                                                {u.points}
                                            </div>
                                        </Card>
                                    )
                                })}
                            </div>
                            <Button className='show-more-btn' onClick={() => loadMoreUsers()}>Show More</Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Rewards;



    //Fetched data from random Pokemon API before transitioning to user data
    // const [pokemon, setPokemon] = useState([])
    // const loadMorePokemon = () => {
    //     axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
    //         .then(({ data }) => {
    //             console.log(data)
    //             const newPokemon = [];
    //             data.results.forEach((p) => newPokemon.push(p.name));
    //             setPokemon((oldPokemon) => [...oldPokemon, ...newPokemon]);
    //         });
    //     offset += 10;
    // }
    // useEffect(() => {
    //     if (offset == 10) {
    //         console.log("skip")
    //     } else {
    //         loadMorePokemon();
    //     }
    // }, [])
