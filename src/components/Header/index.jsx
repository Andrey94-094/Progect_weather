import "./Header.scss"
import { PureComponent } from "react";
import { connect } from "react-redux";

class Header extends PureComponent {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <h3>Weather☼</h3>
                </div>
            </header>
        )
    }
}

const mapStateToProps = ({ companyName }) => ({
    companyName: companyName,
});
export default connect(mapStateToProps)(Header);