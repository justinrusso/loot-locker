import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Category from "./Category";
import styled from "styled-components";
import { getHomepageItems } from "../../store/items";
import NewItem from "./NewItem";
import PickedItem from "./PickedItem";
import arm from "./images/sword.jpg";
import armor from "./images/armor.jpg";
import accessory from "./images/ring.png";
import mount from "./images/mount.jpg";
import consumable from "./images/fairy-bottle.jpg";

const HomeStyling = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    #home-top {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 30px 30px 2fr 2fr;
    }

    #home-top-color {
        background-color: #faecd5;
        width: 100%;
        height: 100%;
        grid-column: 1;
        grid-row: 1 / 4;
        z-index: 1;
    }

    #wb-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: 1;
        grid-row: 2;
        z-index: 2;
    }

    #category-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        grid-column: 1;
        grid-row: 3 / 5;
        z-index: 3;
    }

    h1 {
        text-align: center;
        font-size: 52px;
        line-height: 56px;
    }

    h2 {
        text-align: center;
        font-size: 44px;
        line-height: 48px;
    }

    .section-title {
        font-size: 28px;
        line-height: 32px;
        font-weight: bold;
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

    #breaker {
        height: 80px;
    }
`

const NewContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto 1fr 1fr 1fr;
    gap: 24px;
    @media (min-width: 1100px) {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: auto 1fr 1fr;
    }

    #new-header {
        grid-column: 1 / 5;
        grid-row: 1;
        padding-left: 20px;
        @media (min-width: 1100px) {
            grid-column: 1 / 7;
        }
    }

    > *:nth-child(2) {
        grid-column: 1 / 3;
        grid-row: 2 / 4;
    }

    > *:nth-child(3) {
        grid-column: 3 / 5;
        grid-row: 3 / 5;
        @media (min-width: 1100px) {
            grid-column: 4 / 6;
            grid-row: 2 / 4;
        }
    }

    > *:nth-child(4) {
        grid-column: 1;
        grid-row: 4;
        @media (min-width: 1100px) {
            grid-column: 3;
            grid-row: 2;
        }
    }

    > *:nth-child(5) {
        grid-column: 2;
        grid-row: 4;
        @media (min-width: 1100px) {
            grid-column: 3;
            grid-row: 3;
        }
    }

    > *:nth-child(6) {
        grid-column: 3;
        grid-row: 2;
        @media (min-width: 1100px) {
            grid-column: 6;
            grid-row: 2;
        }
    }

    > *:nth-child(7) {
        grid-column: 4;
        grid-row: 2;
        @media (min-width: 1100px) {
            grid-column: 6;
            grid-row: 3;
        }
    }
`

const PickedContainer = styled.div`
    width: 100%;
    display: grid;
    margin: 0px;
    padding: 16px;
    border: 1px solid rgba(100, 100, 100, 0.3);
    border-radius: 7px;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    @media (min-width: 1000px) and (max-width: 1299px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 1300px) {
        grid-template-columns: repeat(5, 1fr);
    }

    #picks-header {
        margin: 20px;
        padding: 10px;
        height: auto;
        width: auto;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: 1;
        grid-row: 1;
    }

    > *:nth-child(2) {
        grid-column: 2 / 4;
        grid-row: 1 / 3;
        @media (min-width: 1000px) and (max-width: 1299px) {
            grid-column: 3 / 5;
            grid-row: 1 / 3;
        }
        @media (min-width: 1300px) {
            grid-column: 4 / 6;
            grid-row: 1 / 3;
        }
    }

    > *:nth-child(3) {
        @media (max-width: 999px) {
            grid-column: 3;
            grid-row: 3;
        }
        @media (min-width: 1000px) and (max-width: 1299px) {
            grid-column: 1 / 3;
            grid-row: 2 / 4;
        }
        @media (min-width: 1300px) {
            grid-column: 3;
            grid-row: 2;
        }
    }

    > *:nth-child(7) {
            visibility: hidden;
            height: 0px;
            width: 0px;
            grid-column: 1;
            grid-row: 1;
            @media (min-width: 1300px) {
                visibility: visible;
                height: 100%;
                width: 100%;
                grid-column: 2;
                grid-row: 2;
            }
    }
`

const AboutSection = styled.div`
    background-color: #faecd5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    padding-top: 36px;
    padding-bottom: 36px;
    width: 100%;

    #about-text {
        text-align: center;
        font-size: 20px;
        font-weight: 300;
        line-height: 38px;
        margin: 30px;
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
                <div id="home-top-color" />
                <div id="wb-container"><h1 id="header-1">{user ? `Welcome back, ${user.username}!` : 'Find items to aid your next raid'}</h1></div>
                <div id="category-container">
                    <Category categoryNum="1" name="Arms" altText="arms" source={arm}/>
                    <Category categoryNum="2" name="Armor" altText="armor" source={armor}/>
                    <Category categoryNum="3" name="Accessories" altText="accessories" source={accessory}/>
                    <Category categoryNum="4" name="Mounts" altText="mounts" source={mount}/>
                    <Category categoryNum="5" name="Consumables" altText="consumables" source={consumable}/>
                </div>
            </div>


            {isLoaded &&
                <Content>
                    <NewContainer>
                        <div className="section-title" id="new-header">New!</div>
                        {newIds.map(id => (
                            <NewItem item={items[id]} key={`n:${id}}`}/>
                        ))}
                    </NewContainer>

                    <div id="breaker" />

                    <PickedContainer>
                        <div className="section-title" id="picks-header"><p>Editors' Picks</p></div>
                        {pickedIds.map((id) => (
                            <PickedItem item={items[id]} key={`p:${id}}`}/>
                        ))}
                    </PickedContainer>
                </Content>
            }

            <AboutSection>
                <h2>What is Loot Locker?</h2>
                <p id="about-text">Loot Locker is a global online marketplace, where users can buy and sell game items.</p>
                <p id="questions">Have any questions?</p>
                <a href="https://github.com/justinrusso/loot-locker" id="contact-button">Contact Us</a>
            </AboutSection>
        </HomeStyling>
    )
}

export default HomePage;
