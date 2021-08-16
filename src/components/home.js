import React, { useEffect, useState, } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [renderDetail, setRenderDetail] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.github.com/users?per_page=5');
                const json = await response.json();
                console.log('json', json);
                setUsers(json);
            } catch (error) {
                console.log('error')
            }
        }

        fetchData();
    }, [])

    const callUser = async (user) => {
        try {
            const response = await fetch(user.url);
            const json = await response.json();
            setUserData(json);
        } catch (error) {
            console.log('error')
        }
    }

    const renderUsers = () => {
        return users.map((user) => {
            return (
                <Button className="user-button" variant="primary" key={Date.now() + user.id} onClick={() => {
                    // setSelectedUser(user);
                    callUser(user);
                    setRenderDetail(true);
                }}>{user.login}</Button>
            )
        })
    }

    const renderUserDetail = () => {
        return (
            <div className="user-detail">
                <img src={userData.avatar_url} loading="lazy" ></img>
                <div className="data-container">
                    <p className="username">{userData.name}</p>
                    <p>{userData.location}</p>

                </div>

            </div>
        )
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    {renderDetail && <Button className="back-button" onClick={() => {
                        setRenderDetail(false)
                        setUserData({})
                    }}>{`< Back`}</Button>}
                    <Navbar.Brand>
                        Home
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className='git-container'>

                {!renderDetail && <>
                    <h3>Top 5 Github Usernames</h3>
                    <p>Tap the username to see more information</p>
                    {renderUsers()}
                </>}
                {renderDetail && renderUserDetail()}
            </div>
        </>
    )
}

export default Home;