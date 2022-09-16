import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Button({ to, href, secondary, outline, text, fluid, children, onClick, ...passProps }) {
    let Component = 'button';
    const props = {
        onClick,
        ...passProps
    };
    if (href) {
        props.href = href;
        Component = 'a';
    }
    if (to) {
        props.to = to;
        Component = Link;
    }
    const classes = cx('wrapper', {
        secondary,
        outline,
        text,
        fluid
    });
    return (
        <Component className={classes} {...props}>
            <span>{children}</span>
        </Component>
    );
}

export default Button;