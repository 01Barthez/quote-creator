import type { IFootersLinks } from '@/interface/interface';
import React from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

/**
 * Functional component for rendering a footer column with links.
 * @param {IFootersLinks} props - The properties for the footer column.
 * @returns JSX element representing the footer column with links.
 */

const FooterCol: React.FC<IFootersLinks> = (props) => {
    const FooterLinks = props.links;

    return (
        <div className='text-foreground text-nowrap flex flex-col gap-2 items-center md:items-start'>
            {/* links title */}
            <h4 className="capitalize font-medium cursor-default text-base">
                {props.title}
            </h4>

            {/* Differents links */}
            <ul className="space-y-2 md:space-y-4 text-foreground/80 text-sm text-center md:text-left">
                {
                    FooterLinks.map((link) => (
                        <li key={uuidv4()} className="">
                            <Link
                                to={link.url}
                                className='inline-block text-sm linkhover font-light'
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FooterCol
