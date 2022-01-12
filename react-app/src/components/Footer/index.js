import styled from "styled-components";

const FooterStyling = styled.div`
    background-color: #2F466C;
    color: white;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    padding-top: 36px;
    padding-bottom: 24px;

    .footer-title {
        font-size: 16px;
        line-height: 20px;
        font-weight: 700;
    }

    ul {
        padding: 0;
    }

    li {
        list-style: none;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        margin-bottom: 12px;
    }

    a {
        color: white;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`

function Footer() {
    return (
        <FooterStyling>
            <div>
                <p className="footer-title">Technologies</p>
                <ul>
                    <li>Docker</li>
                    <li>Flask</li>
                    <li>JavaScript</li>
                    <li>PostgreSQL</li>
                    <li>React</li>
                    <li>Redux</li>
                    <li>SQLAlchemy</li>
                    <li>Styled Components</li>
                </ul>
            </div>
            <div>
                <p className="footer-title">GitHub</p>
                <ul>
                    <li><a href="https://github.com/andyrose507">Andy Jones</a></li>
                    <li><a href="https://github.com/isaacsungpak">Isaac Pak</a></li>
                    <li><a href="https://github.com/jwily">John Lee</a></li>
                    <li><a href="https://github.com/justinrusso">Justin Russo</a></li>
                </ul>
            </div>
            <div>
                <p className="footer-title">LinkedIn</p>
                <ul>
                    <li><a href="https://www.linkedin.com/in/andy-jones-a2519b173/">Andy Jones</a></li>
                    <li><a href="https://www.linkedin.com/in/isaac-pak-b4324421b/">Isaac Pak</a></li>
                    <li><a href="https://www.linkedin.com/in/john-lee-31501a224/">John Lee</a></li>
                    <li><a href="https://www.linkedin.com/in/justin-k-russo/">Justin Russo</a></li>
                </ul>
            </div>
        </FooterStyling>
    )
}

export default Footer;
