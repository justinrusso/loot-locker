import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";

function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const items = useSelector((state) => state.items?.entities?.items) // remove optional chaining after store is set up

    return (
        <>
            <p>{user != undefined ? `Welcome back, ${user.username}` : 'Find rare game items (temp. message)'}</p>

        </>
    )
}

export default HomePage;
