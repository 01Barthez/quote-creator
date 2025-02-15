import type { ISEOProps } from '@/interface/interface'
import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEO: React.FC<ISEOProps> = ({
	title,
	description,

	// Default value for each pages
	keywords = defaultSEO.keywords,
	image = defaultSEO.image,
	url = defaultSEO.url,
	type = defaultSEO.type,
}) => {
	return (
		<Helmet>
			<title>{title}</title>

			<meta name='description' content={description} />
			<meta name='keywords' content={keywords.join(', ')} />

			<meta property='og:site_name' content='React-Projet-Starter' />

			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:type' content={type} />
			<meta property='og:url' content={url} />
			{image && <meta property='og:image' content={image} />}

			<meta name='twitter:card' content='summary_large_image' />
			{image && <meta name='twitter:image' content={image} />}
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />

			<link rel='canonical' href={url} />
		</Helmet>
	)
}

export default SEO


// Default SEO for each page
const defaultSEO = {
	"keywords": [
		"devis",
		"estimation",
		"gestion de projet",
		"automatic calcul",
		"cost calculation",
		"project workflow",
		"materials management"
	],
	image: '/images/preview-image.png',
	url: typeof window !== 'undefined' ? window.location.href : '',
	type: 'website',
};    
