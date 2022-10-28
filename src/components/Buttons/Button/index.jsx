import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, secondary, outline, text, fluid, children, className, onClick, ...passProps }) {
    // Variables
    let Component = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    const classes = cx('wrapper', {
        [className]: className,
        secondary,
        outline,
        text,
        fluid,
    });

    if (href) {
        props.href = href;
        Component = 'a';
    }
    if (to) {
        props.to = to;
        Component = Link;
    }

    return (
        <Component className={classes} {...props}>
            <span>{children}</span>
        </Component>
    );
}

export default Button;
