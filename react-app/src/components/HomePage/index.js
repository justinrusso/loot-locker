import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";

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

    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const items = useSelector((state) => Object.values(state.items.entities.items))

    const newItems = useMemo(() => items.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0,6), [items]);
    const randItems = useMemo(() => randomize(items).slice(0,7), [items]);

    return (
        <>
            <p>{user != undefined ? `Welcome back, ${user.username}` : 'Find rare game items (temp. message)'}</p>

            <div>
                <Link to="/categories/1">Item Choice 1</Link>
                <Link to="/categories/2">Item Choice 2</Link>
                <Link to="/categories/3">Item Choice 3</Link>
                <Link to="/categories/4">Item Choice 4</Link>
                <Link to="/categories/5">Item Choice 5</Link>
            </div>

            <div>
                <p>New!</p>
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
                <p>Editors' Picks</p>
                {randItems.map(item => (
                    <Link to={`items/${item.id}`}>
                        <div>
                            <img src={item.image} alt="item image" key={item.id} />
                        </div>
                    </Link>
                ))}
            </div>

            <div>
                <p>What is Loot Locker?</p>
                <p>Loot Locker is a global online marketplace, where gamers can buy and sell in-game items. (to be cont.)</p>
                <p>Have any questions?</p>
                <a href="https://github.com/justinrusso/loot-locker">Contact Us</a>
            </div>
        </>
    )
}

export default HomePage;
