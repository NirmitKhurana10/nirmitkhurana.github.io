import { AnimateSharedLayout, motion } from 'framer-motion'
import Head from 'next/head'
import React, { useState } from 'react'
import ConnectionCard from '../components/connections/ConnectionCard'
import ConnectionModal from '../components/connections/ConnectionModal'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { styled } from '../stitches.config'

export async function getStaticProps() {
    const meta = {
        title: 'Certifications // Nirmit Khurana',
        description:
            'Professional certifications and credentials in Data Analytics and Business Intelligence.',
        tagline: 'Certifications & Credentials',
        image: '/static/images/certifications-bw.jpg',
        primaryColor: 'purple',
        secondaryColor: 'blue',
    }

    return { props: meta }
}

// Certification data with the structure you requested
const certifications = [
    {
        name: 'Microsoft Certified: Data Analyst Associate',
        title: 'Data Analytics',
        company: 'Microsoft',
        status: 'Met', // Use 'Met' for completed/closed certifications
        tags: ['Power BI', 'DAX', 'Data Modeling'],
        location: 'Online',
        metOn: '2024-01-15',
        certLink: 'https://learn.microsoft.com/en-us/certifications/data-analyst-associate/',
        linkedInLink: 'https://www.linkedin.com/feed/update/your-cert-post',
    },
    {
        name: 'Google Data Analytics Professional Certificate',
        title: 'Data Analytics',
        company: 'Google (Coursera)',
        status: 'Met', // Completed/Done
        tags: ['R', 'SQL', 'Tableau', 'Data Visualization'],
        location: 'Online',
        metOn: '2023-12-10',
        certLink: 'https://www.coursera.org/professional-certificates/google-data-analytics',
        linkedInLink: 'https://www.linkedin.com/feed/update/your-cert-post',
    },
    {
        name: 'AWS Certified Data Analytics',
        title: 'Cloud Data Analytics',
        company: 'Amazon Web Services',
        status: 'Want to Meet', // Use 'Want to Meet' for needed/open certifications
        tags: ['AWS', 'Big Data', 'Cloud'],
        location: 'Online',
        metOn: null,
        certLink: 'https://aws.amazon.com/certification/certified-data-analytics-specialty/',
        linkedInLink: null,
    },
    {
        name: 'Tableau Desktop Specialist',
        title: 'Data Visualization',
        company: 'Tableau',
        status: 'Want to Meet', // Needed/Open
        tags: ['Tableau', 'Visualization', 'Dashboard'],
        location: 'Online',
        metOn: null,
        certLink: 'https://www.tableau.com/learn/certification/desktop-specialist',
        linkedInLink: null,
    },
]

function Certifications() {
    const [selectedCert, setSelectedCert] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCertifications = certifications.filter(
        cert =>
            cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleCardClick = cert => {
        setSelectedCert(cert)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedCert(null)
    }

    const description = `My professional certifications that validate my expertise in <strong>Data Analytics</strong>, <strong>Business Intelligence</strong>, and related technologies. Completed certifications are marked as "Met" while certifications I'm working towards are marked as "Want to Meet".`

    return (
        <>
            <Head>
                <title>Certifications // Nirmit Khurana</title>
                <meta content="Certifications // Nirmit Khurana" property="og:title" />
                <meta
                    content="Professional certifications and credentials in Data Analytics and Business Intelligence."
                    name="description"
                />
                <meta
                    content="Professional certifications and credentials in Data Analytics and Business Intelligence."
                    property="og:description"
                />
                <meta content="https://nirmitkhurana.com/certifications" property="og:url" />
                <meta
                    content="https://nirmitkhurana.com/static/images/certifications-bw.jpg"
                    property="og:image"
                />
            </Head>

            <AnimateSharedLayout>
                <p dangerouslySetInnerHTML={{ __html: description }} />

                <h2>Certifications</h2>
                <SearchInput
                    type="text"
                    placeholder="Search by name, issuer, or category..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <CertificationsGrid>
                    {filteredCertifications.length > 0 ? (
                        filteredCertifications.map((cert, idx) => (
                            <motion.div
                                key={cert.name + idx}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: idx * 0.08,
                                    duration: 0.5,
                                    type: 'spring',
                                    stiffness: 60,
                                }}
                            >
                                <ConnectionCard
                                    person={cert}
                                    onClick={() => handleCardClick(cert)}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <NoResults>No certifications found.</NoResults>
                    )}
                </CertificationsGrid>
            </AnimateSharedLayout>
            <ConnectionModal
                person={selectedCert}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    )
}

const CertificationsGrid = styled('div', {
    display: 'grid',
    margin: '10px 0 0 -20px',
    gridTemplateColumns: 'repeat(4, 1fr)',

    '@media (max-width: 600px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        margin: '10px 0 0 0',
    },
})

const SearchInput = styled('input', {
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    padding: '12px 16px',
    margin: '20px 0',
    border: '1px solid $secondary',
    borderRadius: '$borderRadius',
    backgroundColor: '$background',
    color: '$primary',
    fontSize: '16px',
    '&::placeholder': {
        color: '$secondary',
    },
    '&:focus': {
        outline: 'none',
        borderColor: '$cyan',
    },
    '@media (max-width: 600px)': {
        fontSize: '15px',
        padding: '10px 8px',
    },
})

const NoResults = styled('div', {
    color: '$secondary',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '40px',
})

Certifications.Layout = Base

export default Certifications
