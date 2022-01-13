import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Category from "./Category";
import styled from "styled-components";

const HomeStyling = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-tems: center;
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

function HomePage() {

    function randomize(arr) {
        const arrCopy = arr.slice(0);
        let currIndex = arr.length;

        while (currIndex > 0) {
          let randIndex = Math.floor(Math.random() * currIndex);
          currIndex--;

          [arrCopy[currIndex], arrCopy[randIndex]] = [arrCopy[randIndex], arrCopy[currIndex]];
        }
        return arrCopy;
    }

    const user = useSelector((state) => state.session.user)
    const items = useSelector((state) => Object.values(state.items.entities.items))

    const newItems = useMemo(() => items.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0,6), [items]);
    const randItems = useMemo(() => randomize(items).slice(0,7), [items]);



    return (
        <HomeStyling>
            <div id="home-top">
                <h1 id="header-1">{user != undefined ? `Welcome back, ${user.username}` : 'Find rare game items (temp. message)'}</h1>

                <div id="category-container">
                    <Category categoryNum="1" name="Arms" source={false} />
                    <Category categoryNum="2" name="Armor" source={false} />
                    <Category categoryNum="3" name="Accessories" source={false} />
                    <Category categoryNum="4" name="Mounts" source={false} />
                    <Category categoryNum="5" name="Consumables" source={false}/>
                </div>
            </div>


            <div>
                <p className="section-title">New!</p>
                {/* NOTE: SORT ITEMS BY DATE ADDED */}
                {newItems.map(item => (
                    <Link to={`items/${item.id}`}>
                        <div>
                            <img src={item.image} alt="item image" key={item.id} />
                        </div>
                    </Link>
                ))}
            </div>

            <div>
                <p className="section-title">Editors' Picks</p>
                {randItems.map(item => (
                    <Link to={`items/${item.id}`}>
                        <div>
                            <img src={item.image} alt="item image" key={item.id} />
                        </div>
                    </Link>
                ))}
            </div>


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
