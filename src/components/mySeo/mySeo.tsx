import { Helmet } from "react-helmet-async";

export const MySeo = (props: Props) => {
    return (
        <Helmet>
            <title>{props.title}</title>
            <meta name="description" content={props.description}/>
            <link rel="canonical" href={props.link} />
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <meta name="author" content="Ticketea" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />
            <meta property="og:url" content={props.link} />

            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.image} />
            <meta name="twitter:card" content="summary_large_image" />

            <meta name="theme-color" content="#002E39" />
        </Helmet>
    );
};

type Props = {
    title: string,
    description: string,
    link: string,
    image: string
};