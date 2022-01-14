import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Category from "./Category";
import styled from "styled-components";
import { getHomepageItems } from "../../store/items";
import NewItem from "./NewItem";

const HomeStyling = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    #home-top {
        postion: absolute;
    }

    h1 {
        text-align: center;
        font-size: 52px;
        line-height: 56px;
        font-weight: bold;
    }

    h2 {
        text-align: center;
        font-size: 44px;
        line-height: 48px;
        font-weight: bold;
    }

    #category-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .section-title {
        font-size: 24px;
        font-weight: bold;
    }

    #about {
        background-color: #faecd5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 36px;
        padding-bottom: 36px;
    }

    #about-text {
        font-size: 20px;
        font-weight: 300;
        line-height: 38px;
        margin: 30px;
    }

    #questions {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    #contact-button {
        padding: 10px 18px;
        background-color: #faecd5;
        border-radius: 25px;
        border: 2px solid black;
        text-decoration: none;
        color: black;
        font-size: 16px;
        font-weight: bold;
        line-height: 1.5;
        transition: all 0.1s ease-in-out;
    }

    #contact-button:hover {
        transform: scale(1.01);
        filter: drop-shadow(0 3px 3px rgba(0,0,0,0.2))
    }
`

const Content = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NewContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    #header {
        width: 100%;
        text-align: left;
        padding-left: 30px;
    }
`

function HomePage() {

    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHomepageItems()).then(() => setIsLoaded(true))
    }, [dispatch])

    const user = useSelector((state) => state.session.user)
    const items = useSelector((state) => state.items.entities.items)
    const newIds = useSelector((state) => state.items.new);
    const pickedIds = useSelector((state) => state.items.picks);

    return (
        <HomeStyling>
            <div id="home-top">
                <h1 id="header-1">{user ? `Welcome back, ${user.username}` : 'Find rare game items (temp. message)'}</h1>

                <div id="category-container">
                    <Category categoryNum="1" name="Arms" source='https://images.mapletip.com/maplestory-monsters/01302020.png' />
                    <Category categoryNum="2" name="Armor" source={false} />
                    <Category categoryNum="3" name="Accessories" source={false} />
                    <Category categoryNum="4" name="Mounts" source={false} />
                    <Category categoryNum="5" name="Consumables" source={false}/>
                </div>
            </div>


            {isLoaded &&
                <Content>
                    <NewContainer>
                        <p className="section-title" id="header">New!</p>
                        {newIds.map(id => (
                            <NewItem item={items[id]} key={`n:${id}}`}/>
                        ))}
                    </NewContainer>

                    <div>
                        {/* NOTE: CREATE NEW COMPONENT FOR PICKED ITEM */}
                        <p className="section-title">Editors' Picks</p>
                        {pickedIds.map(id => (
                            <NewItem item={items[id]} key={`p:${id}}`} />
                        ))}
                    </div>
                </Content>
            }


            <div id="about">
                <h2>What is Loot Locker?</h2>
                <p id="about-text">Loot Locker is a global online marketplace, where gamers can buy and sell in-game items. (to be cont.)</p>
                <p id="questions">Have any questions?</p>
                <a href="https://github.com/justinrusso/loot-locker" id="contact-button">Contact Us</a>
            </div>
        </HomeStyling>
    )
}

export default HomePage;
