import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Category from "./Category";
import styled from "styled-components";

const HomeStyling = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-tems: center;
    width: 100%;

    #welcome-message {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
    }

    #category-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .section-title {
        font-size: 20px;
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
            <p id="welcome-message">{user != undefined ? `Welcome back, ${user.username}` : 'Find rare game items (temp. message)'}</p>

            <div id="category-container">
                <Category path="/tags/1" name="Arms" source={false} />
                <Category path="/tags/2" name="Armor" source={false} />
                <Category path="/tags/3" name="Accessories" source={false} />
                <Category path="/tags/4" name="Mounts" source={false} />
                <Category path="/tags/5" name="Consumables" source={false}/>
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
                <p className="section-title">What is Loot Locker?</p>
                <p>Loot Locker is a global online marketplace, where gamers can buy and sell in-game items. (to be cont.)</p>
                <p>Have any questions?</p>
                <a href="https://github.com/justinrusso/loot-locker">Contact Us</a>
            </div>
        </HomeStyling>
    )
}

export default HomePage;
