import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { RoughNotation } from 'react-rough-notation'
import { ButtonPrimary } from '../components/ButtonPrimary'
import Pronunciation from '../components/Pronunciation'
import Toast from '../components/Toast'
import Toolbox from '../components/Toolbox'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import copyBioIcon from '../public/static/icons/copy-bio.json'
import downloadIcon from '../public/static/icons/download.json'
import { styled } from '../stitches.config'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export async function getStaticProps() {
  const meta = {
    title: 'About // Nirmit Khurana',
    description: `
      Nirmit Khurana is a Business Intelligence & Data Analytics Professional with 2+ years of experience optimizing retail and financial operations through scalable BI pipelines and automated workflows.
      By leveraging SQL, Power BI, and n8n, he has successfully improved kitchen forecast accuracy by 20%, reduced annual operational waste by CAD 120K (15%), and reclaimed over 25 hours of monthly coordination time.
      Nirmit excels at bridging the gap between technical execution and executive strategy, ensuring 100% data integrity and full compliance across complex, high-volume environments.
    `,
    tagline: 'Turn Data Into Impact.',
    image: '/static/images/about-bw.jpg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

function About(props) {
  const { title, description, image } = props
  const [toastTitle, setToastTitle] = React.useState('')
  const [toastDescription, setToastDescription] = React.useState('')
  const [showToast, setShowToast] = React.useState(false)
  const copyBioRef = React.useRef()
  const downloadRef = React.useRef()

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Nirmit"
            src="/static/images/avatar.png"
            width="336"
            height="336"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            <strong>Hey, I'm Nirmit Khurana</strong>
            <Pronunciation />It all started with a single blinking LED. I remember the rush of writing my first Arduino script and seeing that tiny light pulse for the first time—it was my first taste of controlling logic. Today, I've traded LEDs for massive datasets. I'm Nirmit, a Data Analyst who builds pipelines and dashboards to turn digital chaos into clear business strategies.
          </Paragraph>
          <Paragraph>
            I love{' '}
            <strong>
              <a href="https://nirmitkhurana.site/contact">
                connecting
              </a>
            </strong>{' '}
            with fellow data enthusiasts in <strong>Toronto</strong>
            . When I'm not deep in SQL, you'll find me on the{' '}
            <strong>football pitch</strong> or in the <strong>kitchen</strong>.
            I take my cooking seriously—I don't just follow recipes, I experiment with flavors the same way I experiment with data models.
          </Paragraph>
          <Paragraph>
            <strong>
              <RoughNotation
                animationDelay="1000"
                animationDuration="3000"
                type="highlight"
                iterations={2}
                strokeWidth={3}
                multiline={true}
                color="#1844e1c6"
                show={true}
              >
                Currently, you'll find me at IKEA.
              </RoughNotation>
            </strong>
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderBio = () => {
    const btnStyle = {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
    const iconStyle = { width: 24, height: 24, marginRight: 8 }

    return (
      <div>
        <p>
          This is my professional bio summarizing my strengths and fields of
          interests.
        </p>
        <blockquote>
          <p>{description}</p>
        </blockquote>
        <ButtonsContainer>
          <ButtonPrimary
            as="button"
            style={btnStyle}
            onClick={copyBio}
            onMouseEnter={() => copyBioRef.current?.play()}
            onMouseLeave={() => copyBioRef.current?.stop()}
          >
            <Lottie
              lottieRef={copyBioRef}
              style={iconStyle}
              animationData={copyBioIcon}
              loop={false}
              autoplay={false}
            />
            Copy Bio
          </ButtonPrimary>
          <span style={{ margin: '0 20px 0 10px' }}>•</span>
          <ButtonPrimary
            as="a"
            download
            role="button"
            href="https://drive.google.com/file/d/1DJoy-EstrHLPuiSeqLj6wV8e4f49iG9q/view?usp=share_link"
            target="_blank"
            style={btnStyle}
            onClick={downloadResume}
            onMouseEnter={() => downloadRef.current?.play()}
            onMouseLeave={() => downloadRef.current?.stop()}
          >
            <Lottie
              lottieRef={downloadRef}
              style={iconStyle}
              animationData={downloadIcon}
              loop={false}
              autoplay={false}
            />
            Download Resume
          </ButtonPrimary>
        </ButtonsContainer>
      </div>
    )
  }

  const downloadResume = () => {
    setToastTitle('Downloading...')
    setToastDescription('You can now hire me :)')
    setShowToast(true)
  }

  const copyBio = e => {
    e.preventDefault()
    navigator.clipboard.writeText(description)

    setToastTitle('Copied :D')
    setToastDescription('You can now paste it anywhere.')
    setShowToast(true)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://nirmitkhurana.com/about" property="og:url" />
        <meta content={`https://nirmitkhurana.com${image}`} property="og:image" />
      </Head>

      {renderIntro()}

      <h2>Bio</h2>
      {renderBio()}

      <Toast
        title={toastTitle}
        description={toastDescription}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />

      <Toolbox />
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const ButtonsContainer = styled('p', {
  display: 'flex',
  alignItems: 'center',
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

About.Layout = Base

export default About
