import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";

function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const items = useSelector((state) => state.items.entities.items) // remove optional chaining after store is set up

    return (
        <>
            <p>{user != undefined ? `Welcome back, ${user.username}` : 'Find rare game items (temp. message)'}</p>

            <div>
                <p>New!</p>
                {/* NOTE: SORT BY DATE ADDED */}
                {items.length > 0 && items.map(item => (
                    <Link to={`items/${item.id}`}>
                        <div>
                            <img src={item.image} alt="item image" key={item.id} />
                        </div>
                    </Link>
                ))}
            </div>

            <div>
                <p>Editors' Picks</p>
                {/* NOTE: RANDOMIZE */}
                {items.length > 0 && items.map(item => (
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
