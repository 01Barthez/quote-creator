import { BsWhatsapp } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { CgFacebook } from "react-icons/cg";
import { AiOutlineTwitter } from "react-icons/ai";
import type { IFootersLinks, ISocialLink } from "@/interface/interface";
import { v4 as uuidv4 } from 'uuid';

export const FootersLinks: IFootersLinks[] = [
    {
        id: uuidv4(),
        title: 'Navigations Links',
        links: [
            {
                url: '/',
                name: 'Home'
            },

            {
                url: '/products',
                name: 'Products'
            },

            {
                url: '/about-us',
                name: 'About Us'
            },

            {
                url: '/contact',
                name: 'Contact Us'
            },

            {
                url: '/blog',
                name: 'Blog'
            },

        ],
    },
]
// Social links configuration
export const SocialLink: ISocialLink[] = [
    {
        id: uuidv4(),
        icon: <BsWhatsapp />,
        url: "https://wa.me/237655646688?text=bonjour%20Iphone%20Cameroon%2C%20je%20voudrais%20discutter%20avec%20vous%20%C3%A0%20propos%20d%27un%20article%20que%20j%27ai%20vu%20sur%20votre%20site%20de%20vente%20en%20ligne%2C%20vous%20pouvez%20m%27accorder%20un%20instant%20%3F",
        name: 'Whatsapp',
    },

    {
        id: uuidv4(),
        icon: <AiOutlineTwitter />,
        url: 'https://x.com/login?&mx=2', // https://twitter.com/intent/tweet?text=bonjour%20Iphone%20cameroun%2C%20je%20voudrais%20discutter%20avec%20vous%20%C3%A0%20propos%20d%27un%20article%20que%20j%27ai%20vu%20sur%20votre%20site%20de%20vente%20en%20ligne%2C%20vous%20pouvez%20m%27accordez%20un%20instant%20%3F&url=https://example.com
        name: 'Twitter',
    },
    {
        id: uuidv4(),
        icon: <CgFacebook />,
        url: 'https://www.facebook.com/login.php/', // https://www.facebook.com/sharer/sharer.php?u=https://example.com&quote=bonjour%20Iphone%20cameroun%2C%20je%20voudrais%20discutter%20avec%20vous%20%C3%A0%20propos%20d%27un%20article%20que%20j%27ai%20vu%20sur%20votre%20site%20de%20vente%20en%20ligne%2C%20vous%20pouvez%20m%27accordez%20un%20instant%20%3F
        name: 'Facebook',
    },
    {
        id: uuidv4(),
        icon: <FaTiktok />,
        url: 'https://www.tiktok.com/login', // https://www.tiktok.com/@<nom_utilisateur>
        name: 'Tiktok',
    },
    {
        id: uuidv4(),
        icon: <AiFillInstagram />,
        url: 'https://www.instagram.com/accounts/login/', // https://instagram.com/<nom_utilisateur>
        name: 'Instagram',
    },
];

